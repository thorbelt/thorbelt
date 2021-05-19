import { formatMoney, useGlobalState } from "../utils";
import Box from "./box";

export default function NodeStats({ path, updateWorkspace }) {
  const [stats] = useGlobalState("stats");
  return (
    <Box title="Stats" path={path} updateWorkspace={updateWorkspace}>
      {stats ? (
        <div className="node-empty">
          <button className="button">
            <strong className="text-primary">
              $
              {formatMoney(
                ((parseInt(stats.runeDepth) * 2) / Math.pow(10, 8)) *
                  parseFloat(stats.runePriceUSD)
              )}
            </strong>
            <span>total liquidity</span>
          </button>
          <button className="button">
            <strong>
              $
              {formatMoney(
                (parseInt(stats.swapVolume) / Math.pow(10, 8)) *
                  parseFloat(stats.runePriceUSD)
              )}
            </strong>
            <span>total swap volume</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.swapCount24h)}</strong>
            <span>24h swap count</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.dailyActiveUsers)}</strong>
            <span>24h active users</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.swapCount30d)}</strong>
            <span>30d swap count</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.monthlyActiveUsers)}</strong>
            <span>30d active users</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.swapCount)}</strong>
            <span>total swap count</span>
          </button>
          <button className="button">
            <strong>{formatMoney(stats.uniqueSwapperCount)}</strong>
            <span>unique users</span>
          </button>
          <button className="button">
            <strong>${formatMoney(stats.runePriceUSD, 2)}</strong>
            <span>rune price</span>
          </button>
          <button className="button">
            <strong>
              $
              {formatMoney(
                (parseFloat(stats.impermanentLossProtectionPaid) /
                  Math.pow(10, 8)) *
                  parseFloat(stats.runePriceUSD)
              )}
            </strong>
            <span>il paid</span>
          </button>
        </div>
      ) : (
        "loading..."
      )}
    </Box>
  );
}
