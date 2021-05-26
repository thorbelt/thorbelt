import { merge, formatMoney, useGlobalState } from "../utils";
import Box from "./box";
import Table from "./table";

export default function NodePools({ data, path, updateWorkspace }) {
  const [pools, setPools] = useGlobalState("pools", []);

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
    const price = parseFloat(p.assetPriceUSD);
    const depth =
      (parseInt(p.assetDepth) / Math.pow(10, 8)) *
      parseFloat(p.assetPriceUSD) *
      2;
    const volume =
      ((parseFloat(p.volume24h) / Math.pow(10, 8)) *
        parseFloat(p.assetPriceUSD)) /
        parseFloat(p.assetPrice) || 0;
    return {
      asset: p.asset,
      status: p.status,
      price: formatMoney(price, 2),
      priceValue: price,
      apy: formatMoney(parseFloat(p.poolAPY) * 100, 2),
      apyValue: parseFloat(p.poolAPY),
      depth: formatMoney(depth),
      depthValue: depth,
      volume: formatMoney(volume),
      volumeValue: volume,
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
