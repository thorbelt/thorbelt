import { useEffect, useState } from "react";
import {
  merge,
  formatAddress,
  useGlobalState,
  thornodeRequest,
  midgardRequest,
} from "./utils";
import { stableByNetwork, defaultWorksapces } from "./constants";

import Icon from "./components/icon";
import Node from "./components/node";
import ModalConfigureAddress from "./components/modalConfigureAddress";

let gotPoolsFromMidgard = false;

const nodeSiblingNameMap = {
  left: "right",
  right: "left",
  top: "bottom",
  bottom: "top",
};

function App() {
  const [modal, setModal] = useState({});
  const [{ selected: wallet }] = useGlobalState("wallets", {});
  const [pools, setPools] = useGlobalState("pools", []);
  const [stats, setStats] = useGlobalState("stats", null);
  const [wallets, setWallets] = useGlobalState("wallets");
  const [workspaces, setWorkspaces] = useState(
    JSON.parse(localStorage.workspaces || defaultWorksapces)
  );
  const [selectedWorkspaceIndex, setSelectedWorkspaceIndex] = useState(0);
  const selectedWorkspace = workspaces[selectedWorkspaceIndex];

  useEffect(() => {
    if (!localStorage.wallets || localStorage.wallets === "undefined") return;
    setWallets(JSON.parse(localStorage.wallets));
  }, []);
  useEffect(() => {
    const updated = JSON.stringify(wallets);
    if (localStorage.wallets !== updated) localStorage.wallets = updated;
  }, [wallets]);
  useEffect(() => {
    const refresh = () => {
      const n = wallet?.network || "mainnet";
      thornodeRequest(n, "/thorchain/pools").then((thornodePools) => {
        const stablePool = thornodePools.find(
          (p) => p.asset === stableByNetwork[n]
        );
        const runePrice =
          parseInt(stablePool.balance_asset) /
          parseInt(stablePool.balance_rune);
        const pools = thornodePools.reduce((ps, p) => {
          const price =
            runePrice * (parseInt(p.balance_rune) / parseInt(p.balance_asset));
          const depth =
            (parseInt(p.balance_rune) / Math.pow(10, 8)) * runePrice * 2;
          ps[p.asset] = {
            asset: p.asset,
            status: p.status.toLowerCase(),
            price: price,
            depth: depth,
            depthAsset: parseInt(p.balance_asset),
            depthRune: parseInt(p.balance_rune),
            units: parseInt(p.pool_units),
            apy: 0,
            volume: 0,
          };
          return ps;
        }, {});

        if (!gotPoolsFromMidgard) {
          setPools(Object.values(pools).sort((a, b) => a.asset > b.asset));
        }

        midgardRequest(n, "/pools")
          .then((midgardPools) => {
            gotPoolsFromMidgard = true;
            midgardPools.forEach((p) => {
              if (!pools[p.asset]) return;
              const volume =
                ((parseFloat(p.volume24h) / Math.pow(10, 8)) *
                  parseFloat(p.assetPriceUSD)) /
                  parseFloat(p.assetPrice) || 0;
              pools[p.asset].apy = parseFloat(p.poolAPY);
              pools[p.asset].volume = volume;
            });
            setPools(Object.values(pools).sort((a, b) => a.asset > b.asset));
          })
          .catch(() => {
            setPools(Object.values(pools).sort((a, b) => a.asset > b.asset));
          });
      });
      midgardRequest(n, "/stats").then(setStats);
    };
    refresh();
    const handle = setInterval(refresh, 15000);
    return () => clearInterval(handle);
  }, [wallet?.network]);

  function onConfigureAddress() {
    setModal({ type: "configureAddress" });
  }

  function onUpdateWorkspace(update, path) {
    if (path.length === 0) {
      selectedWorkspace.root = update(selectedWorkspace.root);
    } else {
      const parent = path.slice(0, -1).reduce((parent, leaf) => {
        return parent[leaf];
      }, selectedWorkspace.root);
      const tail = path[path.length - 1];
      let node = parent ? parent[tail] : selectedWorkspace.root;
      node = update(node);
      if (!node) {
        Object.assign(
          parent,
          merge(parent[nodeSiblingNameMap[tail]], { size: parent.size })
        );
      } else {
        parent[tail] = node;
      }
    }

    workspaces[selectedWorkspaceIndex] = merge({}, selectedWorkspace);
    setWorkspaces(workspaces.slice());
    // debugging
    window.globalWorkspaces = workspaces;
  }

  return (
    <div>
      <header className="header">
        <a className="header-brand" href="/">
          thorbelt
        </a>
        <div className="header-workspaces">
          <WorkspacesNav
            workspaces={workspaces}
            setWorkspaces={setWorkspaces}
            selectedWorkspaceIndex={selectedWorkspaceIndex}
            setSelectedWorkspaceIndex={setSelectedWorkspaceIndex}
          />
        </div>
        <div className="nav nav-right">
          <a className="nav-text text-primary" onClick={onConfigureAddress}>
            {wallet
              ? formatAddress(wallet.address) + " (" + wallet.network + ")"
              : "(no wallet connected)"}
          </a>
        </div>
      </header>
      <div className="workspace">
        <Node
          {...selectedWorkspace.root}
          path={[]}
          updateWorkspace={onUpdateWorkspace}
        />
      </div>
      {modal.type === "configureAddress" ? (
        <ModalConfigureAddress onClose={() => setModal({})} />
      ) : null}
    </div>
  );
}

function WorkspacesNav({
  workspaces,
  setWorkspaces,
  selectedWorkspaceIndex,
  setSelectedWorkspaceIndex,
}) {
  function onAdd(e) {
    e.preventDefault();
    setWorkspaces((workspaces) => {
      workspaces = workspaces.concat({
        name: "new workspace",
        root: { type: "node", size: 100, data: { type: "empty" } },
      });
      return workspaces;
    });
  }
  function onRemove(e) {
    e.preventDefault();
    setWorkspaces((workspaces) => {
      workspaces.splice(selectedWorkspaceIndex, 1);
      return workspaces.splice();
    });
  }
  function onRename(e) {
    e.preventDefault();
    const newName = prompt("New Name", workspaces[selectedWorkspaceIndex].name);
    if (!newName) return;
    setWorkspaces((workspaces) => {
      const i = selectedWorkspaceIndex;
      workspaces[i] = { ...workspaces[i], name: newName };
      return workspaces.slice();
    });
  }
  function onSave(e) {
    e.preventDefault();
    localStorage.workspaces = JSON.stringify(workspaces);
  }

  return (
    <div className="workspaces-nav">
      <div className="workspaces-nav-current">
        {workspaces[selectedWorkspaceIndex].name}
      </div>
      <div className="workspaces-nav-dropdown">
        {workspaces.map((w, i) => (
          <a
            key={i}
            onClick={() => setSelectedWorkspaceIndex(i)}
            className={selectedWorkspaceIndex === i ? "is-active" : ""}
          >
            {w.name}
          </a>
        ))}
        <a onClick={onAdd} title="add">
          <Icon name="plus" /> add
        </a>
        <a onClick={onRemove} title="delete">
          <Icon name="trash" /> delete
        </a>
        <a onClick={onRename} title="rename">
          <Icon name="edit" /> rename
        </a>
        <a onClick={onSave} title="save">
          <Icon name="save" /> save
        </a>
      </div>
    </div>
  );
}

export default App;
