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
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [stats] = useGlobalState("stats");
  const [pools] = useGlobalState("pools", []);
  const [addressPools, setAddressPools] = useState([]);
  const [addressBalances, setAddressBalances] = useState([]);

  function onDataChange(key, value) {
    const updateFn = (n) => merge(n, { data: merge(n.data, { [key]: value }) });
    updateWorkspace(updateFn, path);
  }

  useEffect(() => {
    if (!wallet?.address) return;
    function update() {
      midgardRequest(wallet.network, "/member/" + wallet.address).then(
        (result) => setAddressPools(result.pools),
        () => {}
      );
      thornodeRequest(wallet.network, "/cosmos/bank/v1beta1/balances/" + wallet.address).then(
        (result) => setAddressBalances(result.balances),
        () => {}
      );
    }
    setAddressPools([]);
    update();
    const handle = setInterval(update, 5*1000);
    return () => clearInterval(handle);
  }, [wallet]);

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
    const amountAsset =
      (parseInt(p.assetAdded) - parseInt(p.assetWithdrawn)) / Math.pow(10, 8);
    const value =
      amountAsset * pool.price * 2;
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
        onFilterChange={onDataChange.bind(null, 'filters')}
        defaultSort={data.sort}
        onSortChange={onDataChange.bind(null, 'sort')}
      />
    </Box>
  );
}
