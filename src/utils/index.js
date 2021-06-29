import { useState, useEffect } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import stringify from "json-stable-stringify";

const state = {};
const stateListeners = [];
window.globalState = state;

export function useGlobalState(key, alt) {
  const [value, setValue] = useState(state[key] || alt);
  useEffect(() => {
    const onChange = () => {
      if (value !== state[key] || alt) {
        setValue(state[key] || alt);
      }
    };
    stateListeners.push(onChange);
    return () => stateListeners.splice(stateListeners.indexOf(onChange), 1);
  }, []);
  const onSet = (value) => {
    state[key] = value;
    stateListeners.forEach((fn) => fn());
  };
  return [value, onSet];
}

export function midgardRequest(network, path) {
  return apiRequest("midgard", network, "/v2" + path);
}

export function thornodeRequest(network, path) {
  return apiRequest("thornode", network, path);
}

export function apiRequest(api, network, path) {
  return fetch(
    `https://${
      network === "testnet" ? "testnet." : ""
    }${api}.thorchain.info${path}`
  ).then(async (res) => {
    if (res.status !== 200) {
      throw new Error(
        "Non 2xx response code: " + res.status + ": " + (await res.text())
      );
    }
    return res.json();
  });
}

export function merge(o1, o2) {
  return Object.assign(Object.assign({}, o1), o2);
}

export function sortBy(fn, vs) {
  return vs.sort((a, b) => {
    const v1 = fn(a);
    const v2 = fn(b);
    return typeof v1 === "number" ? v1 - v2 : v1 > v2;
  });
}

export function padLeft(num, len, ch) {
  var numText = num.toString();
  for (var i = numText.length; i < len; i++) {
    numText = ch + numText;
  }
  return numText;
}

export function formatAddress(address) {
  return address.slice(0, 8) + "…" + address.slice(-4);
}

export function formatDecimal(val, precision) {
  if (val === "n/a" || val === "-") return val;
  val = parseFloat(val);
  if (Number.isNaN(val)) val = 0;
  return val.toFixed(precision);
}

export function formatMoney(value, n = 0) {
  value = parseFloat(value);
  const intp = Math.floor(value)
    .toFixed(0)
    .replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  const decp = n > 0 ? "." + value.toFixed(n).split(".")[1] : "";
  return intp + decp;
}

export function formatDate(dateString) {
  const d = new Date(dateString);
  return [
    d.getFullYear(),
    padLeft(d.getMonth() - 1, 2, "0"),
    padLeft(d.getDate(), 2, "0"),
  ].join("-");
}

export function formatTime(dateString) {
  const d = new Date(dateString);
  return [
    padLeft(d.getHours(), 2, "0"),
    padLeft(d.getMinutes(), 2, "0"),
    padLeft(d.getSeconds(), 2, "0"),
  ].join(":");
}

export function formatDatetime(dateString) {
  const d = new Date(dateString);
  return formatDate(d) + " " + formatTime(d);
}

export function classForNumber(n) {
  return n < 0 ? "text-red" : n > 0 ? "text-green" : "";
}

export function isValidThorAddress(address) {
  if (address.indexOf("thor") === 0) {
    return address.length === 43 && address.match(/^thor[a-z0-9]{39}$/);
  } else if (address.indexOf("tthor") === 0) {
    return address.length === 44 && address.match(/^tthor[a-z0-9]{39}$/);
  } else {
    return false;
  }
}

export function explorerTransactionUrl(network, txId) {
  if (!txId) return "#";
  return `https://${
    network === "testnet" ? "testnet." : ""
  }thorchain.net/#/txs/${txId}`;
}

export function explorerPoolUrl(network, pool) {
  if (!pool) return "#";
  return `https://${
    network === "testnet" ? "testnet." : ""
  }thorchain.net/#/pools/${pool}`;
}

export function thorchainTransaction(wallet, action, params) {
  if (wallet.type === "xdefi") {
    return thorchainTransactionXdefi(wallet, action, params);
  }
  if (wallet.type === "walletconnect") {
    return thorchainTransactionWalletConnect(wallet, action, params);
  }
  throw new Error(
    "Connected wallet can't send transactions, try connecting XDefi or WalletConnect"
  );
}

function thorchainTransactionXdefi(
  wallet,
  action,
  { memo, asset, recipient, amount }
) {
  return new Promise((resolve, reject) => {
    if (!window.xfi || !window.xfi.thorchain || !wallet.address) {
      return reject(new Error("xdefi wallet not connected"));
    }
    /*
    const handle = setTimeout(() => {
      reject(new Error("transaction timeout"));
    }, 60000);
    */
    window.xfi.thorchain.request(
      {
        method: action,
        params: [
          {
            from: wallet.address,
            memo,
            asset,
            recipient,
            amount: { amount: amount, decimals: 8 },
          },
        ],
      },
      (err, result) => {
        // clearTimeout(handle);
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

function thorchainTransactionWalletConnect(
  wallet,
  action,
  { memo, asset, recipient, amount }
) {
  return new Promise((resolve, reject) => {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });
    async function send() {
      try {
        // Build message
        let message = {
          type: "thorchain/MsgSend",
          value: {
            amount: [
              {
                denom: (asset || "rune").toLowerCase(),
                amount: String(amount),
              },
            ],
            from_address: wallet.address,
            to_address: recipient,
          },
        };
        if (action === "deposit") {
          message = {
            type: "thorchain/MsgDeposit",
            value: {
              coins: [{ asset: asset || "THOR.RUNE", amount: String(amount) }],
              memo: memo,
              signer: wallet.address,
            },
          };
        }

        // Get account info for tx building
        const result = await fetch(
          "https://thornode.thorchain.info/auth/accounts/" + wallet.address
        ).then((r) => r.json());
        const account = result.result.value;

        // Sign transaction
        const tx = {
          messages: [
            {
              rawJsonMessage: {
                type: message.type,
                value: stringify(message.value),
              },
            },
          ],
          fee: { gas: "20000000", amounts: [] },
          memo: "",
          chainId: "thorchain",
          sequence: account.sequence,
          accountNumber: account.account_number,
        };
        const signedTx = await connector.sendCustomRequest({
          jsonrpc: "2.0",
          method: "trust_signTransaction",
          params: [{ network: 931, transaction: stringify(tx) }],
        });

        const submitResult = await fetch(
          "https://thornode.thorchain.info/txs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: signedTx,
          }
        ).then((r) => r.json());
        if (!submitResult.logs) {
          return reject(
            new Error("Transaction failed: " + submitResult.raw_log)
          );
        }
        resolve(submitResult.txhash);
      } catch (err) {
        reject(err);
      }
    }
    if (connector.connected) {
      send();
    } else {
      connector.createSession();
      connector.on("connect", async (error, payload) => {
        if (error) return reject(error);
        send();
      });
    }
  });
}
