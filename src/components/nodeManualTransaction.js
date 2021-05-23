import { useState } from "react";
import {
  merge,
  explorerTransactionUrl,
  isValidThorAddress,
  useGlobalState,
} from "../utils";
import Box from "./box";

function thorchainTransaction(
  action,
  { from, memo, asset, recipient, amount }
) {
  return new Promise((resolve, reject) => {
    if (!window.xfi || !window.xfi.thorchain || !from) {
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
            from,
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

export default function NodeManualTransaction({ data, path, updateWorkspace }) {
  const [network] = useGlobalState("network");
  const [userAddress] = useGlobalState("address");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [options, setOptions] = useState(
    merge(
      {
        type: "transfer",
        action: "swap",
        percent: "100",
      },
      data.options || {}
    )
  );

  function computeMemo() {
    const { asset = "", address = "", limit = "", percent = "" } = options;
    const p = parseInt(parseFloat(percent) * 100);
    let memo = options.action.toUpperCase();
    if (options.action === "swap") {
      memo += `:${asset}:${address}:${limit}`;
    } else if (options.action === "add") {
      memo += `:${asset}:${address}`;
    } else if (options.action === "withdraw") {
      memo += `:${asset}:${p}${options.assym ? ":" + options.assym : ""}`;
    } else if (options.action === "bond" || options.action === "leave") {
      memo += `:${address}`;
    } else if (options.action === "unbond") {
      memo += `:${address}:${p}`;
    }
    return memo;
  }
  function onOptionChange(key, value) {
    const newOptions = merge(options, { [key]: value });
    setOptions(newOptions);
    const updateFn = (n) =>
      merge(n, { data: merge(n.data, { options: newOptions }) });
    updateWorkspace(updateFn, path);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const amount = parseInt(parseFloat(options.amount) * Math.pow(10, 8));
    if (Number.isNaN(amount)) {
      return setError("amount is not a valid number");
    }
    if (options.type === "transfer") {
      if (!isValidThorAddress(options.address)) {
        return setError("recipient address is not valid");
      }
    } else if (options.type === "deposit") {
      if (["swap"].includes(options.action)) {
      }
    }
    try {
      setIsLoading(false);
      if (options.type === "transfer") {
        const txId = await thorchainTransaction("transfer", {
          from: userAddress,
          //asset: { chain: "THOR", symbol: "RUNE", ticker: "RUNE" },
          amount: amount,
          recipient: options.address,
          //memo: "",
        });
        setTransactionId(txId);
      } else if (options.type === "deposit") {
        const memo = computeMemo();
        const txId = await thorchainTransaction("deposit", {
          from: userAddress,
          amount: amount,
          memo: memo,
        });
        setTransactionId(txId);
      }
    } catch (err) {
      console.error(err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box
      title="Manual Transaction"
      path={path}
      updateWorkspace={updateWorkspace}
    >
      <form className="p-2" onSubmit={onSubmit}>
        <div className="row mb-2">
          <div className="">
            <label>type</label>
            <select
              value={options.type}
              onChange={(e) => onOptionChange("type", e.target.value)}
            >
              <option value="transfer">transfer</option>
              <option value="deposit">deposit</option>
            </select>
          </div>
          <div className="">
            <label>input amount</label>
            <input
              type="text"
              value={options.amount || ""}
              onChange={(e) => onOptionChange("amount", e.target.value)}
              placeholder="0.0"
            />
          </div>
        </div>
        {options.type === "deposit" ? (
          <div>
            <div className="row mb-2">
              <div className="">
                <label>action</label>
                <select
                  value={options.action}
                  onChange={(e) => onOptionChange("action", e.target.value)}
                >
                  <option value="swap">swap</option>
                  <option value="add">add</option>
                  <option value="withdraw">withdraw</option>
                  <option value="bond">bond</option>
                  <option value="unbond">unbond</option>
                  <option value="leave">leave</option>
                </select>
              </div>
              {["swap", "add", "withdraw"].includes(options.action) ? (
                <div>
                  <label>asset</label>
                  <input
                    type="text"
                    value={options.asset || ""}
                    onChange={(e) => onOptionChange("asset", e.target.value)}
                    placeholder="e.g. BTC.BTC"
                  />
                </div>
              ) : null}
              {["bond", "unbond", "leave"].includes(options.action) ? (
                <div className="">
                  <label>address</label>
                  <input
                    type="text"
                    value={options.address || ""}
                    onChange={(e) => onOptionChange("address", e.target.value)}
                    placeholder="e.g. thor1a2b3c..."
                  />
                </div>
              ) : null}
            </div>
            <div className="row mb-2">
              {["swap", "add"].includes(options.action) ? (
                <div className="">
                  <label>address (optional)</label>
                  <input
                    type="text"
                    value={options.address || ""}
                    onChange={(e) => onOptionChange("address", e.target.value)}
                    placeholder="e.g. thor1a2b3c..."
                  />
                </div>
              ) : null}
              {options.action === "swap" ? (
                <div className="">
                  <label>limit</label>
                  <input
                    type="text"
                    value={options.limit || ""}
                    onChange={(e) => onOptionChange("limit", e.target.value)}
                  />
                </div>
              ) : null}
              {["withdraw", "unbond"].includes(options.action) ? (
                <div className="">
                  <label>percentage</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={options.percent || ""}
                    onChange={(e) => onOptionChange("percent", e.target.value)}
                  />
                </div>
              ) : null}
              {["withdraw"].includes(options.action) ? (
                <div>
                  <label>assym. asset (optional)</label>
                  <input
                    type="text"
                    value={options.assym || ""}
                    onChange={(e) => onOptionChange("assym", e.target.value)}
                    placeholder="e.g. THOR.RUNE"
                  />
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mb-2">
            <label>recipient address</label>
            <input
              type="text"
              value={options.address || ""}
              onChange={(e) => onOptionChange("address", e.target.value)}
              placeholder="e.g. thor1a2b3c..."
            />
          </div>
        )}

        {options.type === "deposit" ? (
          <div className="truncate mb-2">memo: {computeMemo()}</div>
        ) : null}
        {error ? <div className="text-red mb-2">{error}</div> : null}
        <button type="submit" className="btn w-full mb-2" disabled={isLoading}>
          {isLoading ? "loading..." : "submit"}
        </button>
        {transactionId ? (
          <div className="truncate">
            tx:{" "}
            <a
              href={explorerTransactionUrl(network, transactionId)}
              target="_blank"
            >
              {transactionId}
            </a>
          </div>
        ) : null}
      </form>
    </Box>
  );
}
