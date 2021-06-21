import { useState, useEffect } from "react";
import {
  merge,
  formatDate,
  formatTime,
  formatMoney,
  useGlobalState,
  midgardRequest,
  explorerTransactionUrl,
} from "../utils";
import Box from "./box";
import Icon from "./icon";
import Table from "./table";

export default function NodeHistory({ data, path, updateWorkspace }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [addressActions, setAddressActions] = useState([]);

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
    setAddressActions([]);
    midgardRequest(
      wallet.network,
      "/actions?limit=50&offset=0&address=" + wallet.address
    ).then(
      (result) => setAddressActions(result.actions),
      () => {}
    );
  }, [wallet]);

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
    let transactionId = "";
    if (a.out.length > 0) {
      transactionId = a.out[0].txID;
    }
    if (a.in.length > 0) {
      transactionId = a.in[0].txID;
    }
    rows.push({
      time: (
        <a
          target="_blank"
          href={explorerTransactionUrl(wallet.network, transactionId)}
        >
          {formatDate(parseInt(a.date) / 1000000).slice(2) +
            " " +
            formatTime(parseInt(a.date) / 1000000)}
        </a>
      ),
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
    <Box
      title="History"
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
          defaultSort={data.sort || "-time"}
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
