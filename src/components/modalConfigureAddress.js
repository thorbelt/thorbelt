import { useEffect, useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { merge, formatAddress, useGlobalState } from "../utils";
import { defaultWallets } from "../constants";

let walletconnectAttempt = 0;

export default function ModalConfigureAddress({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [wallets, setWallets] = useGlobalState("wallets", defaultWallets);
  const [newWatchedAddress, setNewWatchedAddress] = useState("");
  const [newWatchedLabel, setNewWatchedLabel] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (onClose && e.key === "Escape") onClose();
    };
    window.addEventListener("keyup", handler);
    return () => window.removeEventListener("keyup", handler);
  }, []);

  function onConnectXdefi() {
    if (!window.xfi || !window.xfi.thorchain) {
      return alert("XDEFI is not installed!");
    }
    window.xfi.thorchain.request(
      { method: "request_accounts", params: [] },
      (err, accounts) => {
        if (err) {
          console.log(err);
          return alert("Error connecting to XDEFI: " + err.message);
        }
        const newWallet = {
          type: "xdefi",
          address: accounts[0],
          network: window.xfi.thorchain.network,
        };
        setWallets(
          merge(wallets, { connected: newWallet, selected: newWallet })
        );
      }
    );
  }

  async function onConnectWalletConnect() {
    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    async function setup() {
      try {
        const result = await connector.sendCustomRequest({
          jsonrpc: "2.0",
          method: "get_accounts",
        });
        const thorchain = result.find((w) => w.network === 931);
        if (!thorchain) return alert("Thorchain wallet not available");
        const newWallet = {
          type: "walletconnect",
          address: thorchain.address,
          network: "mainnet",
        };
        setWallets(
          merge(wallets, { connected: newWallet, selected: newWallet })
        );
      } catch (err) {
        console.error(err);
        alert("Error: " + err.toString());
      }
      setIsLoading(false);
    }

    connector.on("connect", async (error, payload) => {
      if (error) {
        alert("Error connecting: " + error.message);
        return console.error(error);
      }
      setup();
    });
    connector.on("session_update", (error, payload) => {
      if (error) {
        return console.error(error);
      }
    });
    connector.on("disconnect", (error, payload) => {
      if (error) {
        return console.error(error);
      }
      setWallets(merge(wallets, { connected: null, selected: null }));
    });

    if (walletconnectAttempt >= 3) {
      await connector.killSession();
      walletconnectAttempt = 0;
    }
    walletconnectAttempt++;

    if (!connector.connected) {
      connector.createSession();
    } else {
      setup();
    }
  }

  function onSelect(w) {
    setWallets(merge(wallets, { selected: w }));
    onClose();
  }

  function onCopy(w, e) {
    e.stopPropagation();
    navigator.clipboard.writeText(w.address);
  }

  function onRemove(index, e) {
    e.stopPropagation();
    setWallets(
      merge(wallets, {
        watched: wallets.watched.filter((_, i) => i !== index),
      })
    );
  }

  function onRemoveConnected(e) {
    e.stopPropagation();
    let selected = wallets.selected;
    if (selected.address === wallets.connected.address) selected = null;
    setWallets(merge(wallets, { connected: null, selected }));
  }

  function onWatchedSubmit(e) {
    e.preventDefault();
    const newWallet = {
      type: "watched",
      address: newWatchedAddress,
      network: newWatchedAddress.startsWith("thor") ? "mainnet" : "testnet",
      label: newWatchedLabel,
    };
    setNewWatchedAddress("");
    setNewWatchedLabel("");
    setWallets(
      merge(wallets, { watched: wallets.watched.concat([newWallet]) })
    );
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-overlay" />
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h1>Wallets</h1>

        <div className="text-bold mb-2 mt-4">Connected</div>

        {wallets.connected ? (
          <div
            className="row p-2 bg-gray-800 rounded pointer hover:opacity-75"
            onClick={onSelect.bind(null, wallets.connected)}
          >
            <div>
              {formatAddress(wallets.connected.address)} (
              {wallets.connected.network})
            </div>
            <div className="flex-shrink text-right">
              <a
                className="ml-2"
                onClick={onCopy.bind(null, wallets.connected)}
              >
                Copy
              </a>
              <a className="ml-2" onClick={onRemoveConnected}>
                Remove
              </a>
            </div>
          </div>
        ) : (
          <div className="row">
            <button className="btn w-full mr-2" onClick={onConnectXdefi}>
              Connect XDEFI
            </button>
            <button className="btn w-full" onClick={onConnectWalletConnect}>
              Connect WalletConnect
            </button>
          </div>
        )}

        <div className="text-bold mb-2 mt-4">Watched</div>

        {wallets.watched.map((w, i) => (
          <div
            className="row p-2 mb-2 bg-gray-800 rounded pointer hover:opacity-75"
            key={w.address}
            onClick={onSelect.bind(null, w)}
          >
            <div>
              {formatAddress(w.address)} {w.label ? `(${w.label})` : ""} (
              {w.network})
            </div>
            <div className="flex-shrink text-right">
              <a className="ml-2" onClick={onCopy.bind(null, w)}>
                Copy
              </a>
              <a className="ml-2" onClick={onRemove.bind(null, i)}>
                Remove
              </a>
            </div>
          </div>
        ))}

        <form className="row" onSubmit={onWatchedSubmit}>
          <div style={{ flex: "1" }}>
            <label>Address</label>
            <input
              type="text"
              value={newWatchedAddress}
              onChange={(e) => setNewWatchedAddress(e.target.value)}
            />
          </div>
          <div style={{ flex: "0 0 150px" }}>
            <label>Label (opt)</label>
            <input
              type="text"
              value={newWatchedLabel}
              onChange={(e) => setNewWatchedLabel(e.target.value)}
            />
          </div>
          <div style={{ flex: "0 0 60px" }}>
            <label>&nbsp;</label>
            <button type="submit" className="btn w-full">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
