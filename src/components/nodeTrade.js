import { useState } from "react";
import {
  merge,
  explorerTransactionUrl,
  useGlobalState,
  thorchainTransaction,
} from "../utils";
import Box from "./box";

export default function NodeTrade({ data, path, updateWorkspace }) {
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [pools] = useGlobalState("pools", []);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionId, setTransactionId] = useState();
  const [options, setOptions] = useState(merge({}, data.options || {}));
  const assetPool = pools.find((p) => p.asset === options.asset);

  function onOptionChange(key, value) {
    const newOptions = merge(options, { [key]: value });
    setOptions(newOptions);
    const updateFn = (n) =>
      merge(n, { data: merge(n.data, { options: newOptions }) });
    updateWorkspace(updateFn, path);
  }

  async function onSubmit(buyOrSell, e) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!wallet?.address) {
      return setError("no wallet connected");
    }
    let amount = parseInt(parseFloat(options.amount) * Math.pow(10, 8));
    if (Number.isNaN(amount)) {
      return setError("amount is not a valid number");
    }
    if (!assetPool) {
      return setError("selected asset is not valid");
    }
    try {
      setIsLoading(false);
      if (buyOrSell === "buy") {
        amount = parseInt(
          amount * (assetPool.depthRune / assetPool.depthAsset)
        );
      }
      const assetSynthName = options.asset.replace(".", "/");
      const txId = await thorchainTransaction(wallet, "deposit", {
        from: wallet.address,
        amount: amount,
        memo: "SWAP:" + (buyOrSell === "buy" ? assetSynthName : "THOR.RUNE"),
        asset:
          buyOrSell === "buy"
            ? undefined
            : {
                chain: "THOR",
                symbol: assetSynthName.toUpperCase(),
                ticker: assetSynthName.toUpperCase(),
              },
      });
      setTransactionId(txId);

      // clear some options to avoid mistakingly leaving as is in next transaction
      onOptionChange("amount", "");
    } catch (err) {
      console.error(err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Box title="Trade" path={path} updateWorkspace={updateWorkspace}>
      <form className="p-2" onSubmit={(e) => e.preventDefault()}>
        <div className="row mb-2">
          <div className="">
            <label>asset</label>
            <select
              value={options.asset || ""}
              onChange={(e) => onOptionChange("asset", e.target.value)}
            >
              <option value="">Select an asset</option>
              {pools.map((p) => (
                <option value={p.asset} key={p.asset}>
                  {p.asset}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label>amount</label>
            <input
              type="text"
              value={options.amount || ""}
              onChange={(e) => onOptionChange("amount", e.target.value)}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="row mb-2">
          <div className="truncate">
            {assetPool ? "price: $" + assetPool.price.toFixed(3) : ""}
          </div>
          <div className="truncate">
            {assetPool
              ? " value: $" +
                ((parseFloat(options.amount) || 0) * assetPool.price).toFixed(2)
              : ""}
          </div>
        </div>

        {error ? <div className="text-red mb-2">{error}</div> : null}

        <div className="row mb-2">
          <button
            type="submit"
            className="btn w-full mb-2 mr-2"
            disabled={isLoading}
            onClick={onSubmit.bind(null, "sell")}
          >
            {isLoading ? "loading..." : "sell"}
          </button>
          <button
            type="submit"
            className="btn w-full mb-2"
            disabled={isLoading}
            onClick={onSubmit.bind(null, "buy")}
          >
            {isLoading ? "loading..." : "buy"}
          </button>
        </div>

        {transactionId ? (
          <div className="truncate">
            tx:{" "}
            <a
              href={explorerTransactionUrl(wallet.network, transactionId)}
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
