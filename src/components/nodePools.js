import { merge, formatMoney, useGlobalState } from "../utils";
import Box from "./box";
import Table from "./table";

export default function NodePools({ data, path, updateWorkspace }) {
  const [pools] = useGlobalState("pools", []);

  function onDataChange(key, value) {
    const updateFn = (n) => merge(n, { data: merge(n.data, { [key]: value }) });
    updateWorkspace(updateFn, path);
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
      asset: p.asset,
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
    <Box title="Pools" path={path} updateWorkspace={updateWorkspace}>
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
