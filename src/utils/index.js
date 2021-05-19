import { useState, useEffect } from "react";

const state = {};
const stateListeners = [];
window.globalState = state;

export function useGlobalState(key, alt) {
  const [value, setValue] = useState(state[key] || alt);
  useEffect(() => {
    const onChange = () => {
      if (value !== state[key] || alt) {
        setValue(state[key] || alt);
      }
    };
    stateListeners.push(onChange);
    return () => stateListeners.splice(stateListeners.indexOf(onChange), 1);
  }, []);
  const onSet = (value) => {
    state[key] = value;
    stateListeners.forEach((fn) => fn());
  };
  return [value, onSet];
}

export function midgardRequest(network, path) {
  return apiRequest("midgard", network, "/v2" + path);
}

export function thornodeRequest(network, path) {
  return apiRequest("thornode", network, path);
}

export function apiRequest(api, network, path) {
  return fetch(
    `https://${
      network === "testnet" ? "testnet." : ""
    }${api}.thorchain.info${path}`
  ).then(async (res) => {
    if (res.status !== 200) {
      throw new Error(
        "Non 2xx response code: " + res.status + ": " + (await res.text())
      );
    }
    return res.json();
  });
}

export function merge(o1, o2) {
  return Object.assign(Object.assign({}, o1), o2);
}

export function sortBy(fn, vs) {
  return vs.sort((a, b) => {
    const v1 = fn(a);
    const v2 = fn(b);
    return typeof v1 === "number" ? v1 - v2 : v1 > v2;
  });
}

export function padLeft(num, len, ch) {
  var numText = num.toString();
  for (var i = numText.length; i < len; i++) {
    numText = ch + numText;
  }
  return numText;
}

export function formatAddress(address) {
  return address.slice(0, 8) + "…" + address.slice(-4);
}

export function formatDecimal(val, precision) {
  if (val === "n/a" || val === "-") return val;
  val = parseFloat(val);
  if (Number.isNaN(val)) val = 0;
  return val.toFixed(precision);
}

export function formatMoney(value, n = 0) {
  value = parseFloat(value);
  var intp = value.toFixed(0).replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
  var decp = n > 0 ? "." + value.toFixed(n).split(".")[1] : "";
  return intp + decp;
}

export function formatDate(dateString) {
  const d = new Date(dateString);
  return [
    d.getFullYear(),
    padLeft(d.getMonth() - 1, 2, "0"),
    padLeft(d.getDate(), 2, "0"),
  ].join("-");
}

export function formatTime(dateString) {
  const d = new Date(dateString);
  return [
    padLeft(d.getHours(), 2, "0"),
    padLeft(d.getMinutes(), 2, "0"),
    padLeft(d.getSeconds(), 2, "0"),
  ].join(":");
}

export function formatDatetime(dateString) {
  const d = new Date(dateString);
  return formatDate(d) + " " + formatTime(d);
}

export function classForNumber(n) {
  return n < 0 ? "text-red" : n > 0 ? "text-green" : "";
}
