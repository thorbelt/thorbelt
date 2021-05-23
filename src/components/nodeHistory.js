import { useState, useEffect } from "react";
import {
  merge,
  formatDate,
  formatTime,
  formatMoney,
  useGlobalState,
  midgardRequest,
} from "../utils";
import Box from "./box";
import Table from "./table";

export default function NodeHistory({ data, path, updateWorkspace }) {
  const [network] = useGlobalState("network");
  const [address] = useGlobalState("address");
  const [pools] = useGlobalState("pools");
  const [addressActions, setAddressActions] = useState([]);

  const onFilterChange = (filters) => {
    const updateFn = (n) => merge(n, { data: merge(n.data, { filters }) });
    updateWorkspace(updateFn, path);
  };

  useEffect(() => {
    if (!address) return;
    midgardRequest(
      network,
      "/actions?limit=50&offset=0&address=" + address
    ).then(
      (result) => setAddressActions(result.actions),
      () => {}
    );
  }, [network, address]);

  const headers = [
    { id: "time", class: "w-datetime" },
    { id: "type", filter: true },
    { id: "status", filter: true },
    { id: "asset", filter: true },
    { id: "asset2", filter: true },
    { id: "amount", class: "text-right" },
  ];
  const rows = [];
  addressActions.forEach((a) => {
    let asset = "";
    let asset2 = "";
    let amount = 0;
    if (a.type === "switch") {
      asset = a.in[0].coins[0].asset;
      asset2 = a.out[0].coins[0].asset;
      amount = parseInt(a.out[0].coins[0].amount) / Math.pow(10, 8);
    }
    if (a.type === "addLiquidity") {
      asset = a.pools[0];
      asset2 = a.in[0].coins[0].asset;
      amount = parseInt(a.in[0].coins[0].amount) / Math.pow(10, 8);
    }
    if (a.type === "withdraw") {
      asset = a.pools[0];
      asset2 = a.out[0].coins[0].asset;
      amount = parseInt(a.out[0].coins[0].amount) / Math.pow(10, 8);
    }
    if (a.type === "swap") {
      asset = a.in[0].coins[0].asset;
      if (a.out.length > 0) {
        asset2 = a.out[0].coins[0].asset;
        amount = parseInt(a.out[0].coins[0].amount) / Math.pow(10, 8);
      }
    }
    rows.push({
      time:
        formatDate(parseInt(a.date) / 1000000).slice(2) +
        " " +
        formatTime(parseInt(a.date) / 1000000),
      timeValue: parseInt(a.date),
      type: a.type,
      status: a.status,
      asset: asset,
      asset2: asset2,
      amount: formatMoney(amount, 2),
      amountValue: amount,
    });
  });
  return (
    <Box title="History" path={path} updateWorkspace={updateWorkspace}>
      <Table
        defaultSort={"-time"}
        headers={headers}
        rows={rows}
        filters={data.filters}
        onFilterChange={onFilterChange}
      />
    </Box>
  );
}
