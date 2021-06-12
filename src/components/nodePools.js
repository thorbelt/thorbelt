import { useState } from "react";
import { merge, formatMoney, useGlobalState, explorerPoolUrl } from "../utils";
import Box from "./box";
import Icon from "./icon";
import Table from "./table";

export default function NodePools({ data, path, updateWorkspace }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [pools] = useGlobalState("pools", []);
  const network = wallet ? wallet.network : "mainnet";

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

  const headers = [
    { id: "asset", filter: true },
    { id: "status", filter: true },
    { id: "price", class: "text-right" },
    { id: "apy", class: "text-right" },
    { id: "depth", class: "text-right" },
    { id: "volume", name: "volume (24h)", class: "text-right" },
  ];
  const rows = pools.map((p) => {
    return {
      asset: (
        <a target="_blank" href={explorerPoolUrl(network, p.asset)}>
          {p.asset}
        </a>
      ),
      assetValue: p.asset,
      status: p.status,
      price: formatMoney(p.price, 2),
      priceValue: p.price,
      apy: formatMoney(p.apy * 100, 2),
      apyValue: p.apy,
      depth: formatMoney(p.depth),
      depthValue: p.depth,
      volume: formatMoney(p.volume),
      volumeValue: p.volume,
    };
  });

  return (
    <Box
      title="Pools"
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
