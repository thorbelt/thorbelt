import { useState, useEffect } from "react";
import {
  merge,
  formatDate,
  formatMoney,
  useGlobalState,
  midgardRequest,
  thornodeRequest,
} from "../utils";
import Box from "./box";
import Table from "./table";

export default function NodeWallet({ data, path, updateWorkspace }) {
  const [network] = useGlobalState("network");
  const [address] = useGlobalState("address");
  const [stats] = useGlobalState("stats");
  const [pools] = useGlobalState("pools");
  const [addressPools, setAddressPools] = useState([]);
  const [addressBalances, setAddressBalances] = useState([]);

  const onFilterChange = (filters) => {
    const updateFn = (n) => merge(n, { data: merge(n.data, { filters }) });
    updateWorkspace(updateFn, path);
  };

  useEffect(() => {
    if (!address) return;
    midgardRequest(network, "/member/" + address).then(
      (result) => setAddressPools(result.pools),
      () => {}
    );
    thornodeRequest(network, "/cosmos/bank/v1beta1/balances/" + address).then(
      (result) => setAddressBalances(result.balances),
      () => {}
    );
  }, [network, address]);

  const headers = [
    { id: "asset", filter: true },
    { id: "value", class: "text-right" },
    { id: "assetAmount", name: "asset", class: "text-right" },
    { id: "assetRemoved", name: "-asset", class: "text-right" },
    { id: "runeAdded", name: "rune", class: "text-right" },
    { id: "runeRemoved", name: "-rune", class: "text-right" },
    { id: "start", name: "first added", class: "text-right" },
  ];
  const rows = [];
  addressBalances.forEach((b) => {
    if (!stats) return;
    const price = b.denom === "rune" ? parseFloat(stats.runePriceUSD) : 0;
    const amount = parseInt(b.amount) / Math.pow(10, 8);
    rows.push({
      asset: b.denom,
      value: formatMoney(amount * price),
      valueValue: amount * price,
      assetAmount: formatMoney(amount, 2),
      assetAmountValue: amount,
      assetRemoved: "",
      runeAdded: "",
      runeRemoved: "",
      start: "",
    });
  });
  addressPools.forEach((p) => {
    const pool = pools.find((pp) => pp.asset === p.pool);
    if (!pool) return;
    const amountRune =
      (parseInt(p.runeAdded) - parseInt(p.runeWithdrawn)) / Math.pow(10, 8);
    const amountAsset =
      (parseInt(p.assetAdded) - parseInt(p.assetWithdrawn)) / Math.pow(10, 8);
    const runePrice =
      parseFloat(pool.assetPriceUSD) / parseFloat(pool.assetPrice);
    const value =
      amountRune * runePrice + amountAsset * parseFloat(pool.assetPrice);
    rows.push({
      asset: p.pool + " Pool",
      value: formatMoney(value),
      valueValue: value,
      assetAmount: formatMoney(amountAsset, 2),
      assetAmountValue: amountAsset,
      assetRemoved: formatMoney(
        parseInt(p.assetWithdrawn) / Math.pow(10, 8),
        2
      ),
      assetRemovedValue: parseInt(p.assetWithdrawn),
      runeAdded: formatMoney(parseInt(p.runeAdded) / Math.pow(10, 8), 1),
      runeAddedValue: parseInt(p.runeAdded),
      runeRemoved: formatMoney(parseInt(p.assetWithdrawn) / Math.pow(10, 8), 1),
      runeRemovedValue: parseInt(p.assetWithdrawn),
      start: formatDate(parseInt(p.dateFirstAdded) * 1000),
    });
  });
  return (
    <Box title="Wallet" path={path} updateWorkspace={updateWorkspace}>
      <Table
        headers={headers}
        rows={rows}
        filters={data.filters}
        onFilterChange={onFilterChange}
      />
    </Box>
  );
}
