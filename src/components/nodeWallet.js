import { useState, useEffect } from "react";
import {
  merge,
  formatDate,
  formatMoney,
  useGlobalState,
  midgardRequest,
  thornodeRequest,
} from "../utils";
import { stableByNetwork } from "../constants";
import Box from "./box";
import Icon from "./icon";
import Table from "./table";

export default function NodeWallet({ data, path, updateWorkspace }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [pools] = useGlobalState("pools", []);
  const [addressPools, setAddressPools] = useState([]);
  const [addressBalances, setAddressBalances] = useState([]);

  function onDataChange(key, value) {
    const updateFn = (n) => merge(n, { data: merge(n.data, { [key]: value }) });
    updateWorkspace(updateFn, path);
  }
  function onColumnChange(headerId, e) {
    const columns = (data.hiddenColumns || []).filter((c) => c !== headerId);
    if (!e.target.checked) columns.push(headerId);
    onDataChange("hiddenColumns", columns);
  }
  function onToggleSettings() {
    setIsSettingsOpen(!isSettingsOpen);
  }

  useEffect(() => {
    if (!wallet?.address) return;
    function update() {
      midgardRequest(wallet.network, "/member/" + wallet.address).then(
        (result) => setAddressPools(result.pools),
        () => {}
      );
      thornodeRequest(
        wallet.network,
        "/cosmos/bank/v1beta1/balances/" + wallet.address
      ).then(
        (result) => setAddressBalances(result.balances),
        () => {}
      );
    }
    setAddressPools([]);
    update();
    const handle = setInterval(update, 5 * 1000);
    return () => clearInterval(handle);
  }, [wallet]);

  const headers = [
    { id: "asset", filter: true },
    { id: "value", class: "text-right" },
    { id: "assetAmount", name: "asset", class: "text-right" },
    { id: "assetRemoved", name: "-asset", class: "text-right" },
    { id: "runeAmount", name: "rune", class: "text-right" },
    { id: "runeRemoved", name: "-rune", class: "text-right" },
    { id: "start", name: "first added", class: "text-right" },
  ];
  const rows = [];
  addressBalances.forEach((b) => {
    let assetName = b.denom.toUpperCase().replace("/", ".");
    const assetPool = pools.find((p) => p.asset === assetName);
    const stablePool = pools.find(
      (p) => p.asset === stableByNetwork[wallet ? wallet.network : "mainnet"]
    );
    let price = 0;
    if (b.denom === "rune" && stablePool) {
      price = stablePool.depthAsset / stablePool.depthRune;
    } else if (assetPool) {
      price = assetPool.price;
    }
    const amount = parseInt(b.amount) / Math.pow(10, 8);
    rows.push({
      asset: b.denom.toUpperCase(),
      value: formatMoney(amount * price, 2),
      valueValue: amount * price,
      assetAmount: formatMoney(amount, 2),
      assetAmountValue: amount,
      assetRemoved: "",
      runeAmount: "",
      runeRemoved: "",
      start: "",
    });
  });
  addressPools.forEach((p) => {
    const pool = pools.find((pp) => pp.asset === p.pool);
    if (!pool) return;
    const amountAsset =
      (parseInt(p.assetAdded) - parseInt(p.assetWithdrawn)) / Math.pow(10, 8);
    const amountRune =
      (parseInt(p.runeAdded) - parseInt(p.runeWithdrawn)) / Math.pow(10, 8);
    const value =
      (parseInt(p.liquidityUnits) / pool.units) *
      ((pool.depthAsset * 2) / Math.pow(10, 8)) *
      pool.price;
    rows.push({
      asset: p.pool + " Pool",
      value: formatMoney(value, 2),
      valueValue: value,
      assetAmount: formatMoney(amountAsset, 2),
      assetAmountValue: amountAsset,
      assetRemoved: formatMoney(
        parseInt(p.assetWithdrawn) / Math.pow(10, 8),
        2
      ),
      assetRemovedValue: parseInt(p.assetWithdrawn),
      runeAmount: formatMoney(amountRune, 1),
      runeAmountValue: parseInt(amountRune),
      runeRemoved: formatMoney(parseInt(p.runeWithdrawn) / Math.pow(10, 8), 1),
      runeRemovedValue: parseInt(p.assetWithdrawn),
      start: formatDate(parseInt(p.dateFirstAdded) * 1000),
    });
  });

  return (
    <Box
      title="Wallet"
      path={path}
      updateWorkspace={updateWorkspace}
      right={
        <div
          className="box-header-icon"
          title="Settings"
          onClick={onToggleSettings}
        >
          <Icon name="cog" />
        </div>
      }
    >
      {!isSettingsOpen ? (
        <Table
          headers={headers.filter(
            (h) => !(data.hiddenColumns || []).includes(h.id)
          )}
          rows={rows}
          filters={data.filters}
          onFilterChange={onDataChange.bind(null, "filters")}
          defaultSort={data.sort}
          onSortChange={onDataChange.bind(null, "sort")}
        />
      ) : (
        <div className="p-2">
          <div className="row mb-4">
            <div className="text-lg text-bold">panel settings</div>
            <div className="text-right">
              <a onClick={onToggleSettings}>close</a>
            </div>
          </div>
          <div className="mb-2 text-bold">columns</div>
          {headers.map((h) => (
            <div className="" key={h.id}>
              <input
                type="checkbox"
                className="mr-2"
                checked={!(data.hiddenColumns || []).includes(h.id)}
                onChange={onColumnChange.bind(null, h.id)}
              />
              {h.name || h.id}
            </div>
          ))}
        </div>
      )}
    </Box>
  );
}
