export const NODE_TYPES = {
  empty: { id: "empty", name: "empty" },
  stats: { id: "stats", name: "stats" },
  pools: { id: "pools", name: "pools" },
  chart: { id: "chart", name: "chart" },
  wallet: { id: "wallet", name: "wallet" },
  history: { id: "history", name: "history" },
  manualTransaction: { id: "manualTransaction", name: "manual transaction" },
};

export const defaultWorksapces = JSON.stringify([
  {
    name: "default",
    root: { type: "node", size: 100, data: { type: "empty" } },
  },
]);
