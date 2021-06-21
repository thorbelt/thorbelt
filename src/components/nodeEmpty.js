import { merge, useGlobalState } from "../utils";
import Box from "./box";

export default function NodeEmpty({ path, updateWorkspace }) {
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const network = wallet ? wallet.network : "mainnet";

  function onSelectType(type, e) {
    e.preventDefault();
    let update = (node) => merge(node, { data: { type: type } });
    updateWorkspace(update, path);
  }

  return (
    <Box title="Empty" path={path} updateWorkspace={updateWorkspace}>
      <div>
        <br />
        <p className="text-center">select a panel type:</p>
        <div className="node-empty">
          <button className="button" onClick={onSelectType.bind(null, "stats")}>
            <strong>stats.</strong>
            <span>global thorchain stats.</span>
          </button>
          <button className="button" onClick={onSelectType.bind(null, "pools")}>
            <strong>pools.</strong>
            <span>list of thorchain pools.</span>
          </button>
          <button
            className="button"
            onClick={onSelectType.bind(null, "wallet")}
          >
            <strong>wallet.</strong>
            <span>your rune, synth and lp balances.</span>
          </button>
          <button className="button" onClick={onSelectType.bind(null, "chart")}>
            <strong>chart.</strong>
            <span>price chart for a pool.</span>
          </button>
          <button
            className="button"
            onClick={onSelectType.bind(null, "history")}
          >
            <strong>history.</strong>
            <span>action history for current address.</span>
          </button>
          <button
            className="button"
            onClick={onSelectType.bind(null, "manualTransaction")}
          >
            <strong>manual transaction.</strong>
            <span>send in a manual thorchain transaction.</span>
          </button>
          {network === "testnet" ? (
            <button
              className="button"
              onClick={onSelectType.bind(null, "trade")}
            >
              <strong>trade.</strong>
              <span>buy/sell assets using synthetics.</span>
            </button>
          ) : null}
        </div>
      </div>
    </Box>
  );
}
