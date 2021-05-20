import { useRef, useState, useEffect } from "react";
import { createChart } from "lightweight-charts";
import { merge, formatMoney, midgardRequest, useGlobalState } from "../utils";
import Box from "./box";

export default function NodeChart({ data, path, updateWorkspace }) {
  const chartRef = useRef();
  const [network] = useGlobalState("network", "mainnet");
  const [pools] = useGlobalState("pools", []);
  const [asset, setAsset] = useState(data.asset || "BTC.BTC");
  const [range, setRange] = useState(data.range || "1d");
  const [prices, setPrices] = useState();

  function loadData(asset, range) {
    const queryMap = {
      "1d": "interval=5min&count=288",
      "1w": "interval=hour&count=168",
      "3m": "interval=day&count=90",
      "1y": "interval=day&count=365",
    };
    if (asset === "THOR.RUNE") {
      const usdAsset = network === "mainnet" ? "BNB.BUSD-BD1" : "BNB.BUSD-74E";
      midgardRequest(
        network,
        "/history/depths/" + usdAsset + "?" + queryMap[range]
      ).then(
        (result) =>
          setPrices(
            result.intervals.map((i) =>
              merge(i, {
                assetPriceUSD: 1 / parseFloat(i.assetPrice),
              })
            )
          ),
        () => {}
      );
    } else {
      midgardRequest(
        network,
        "/history/depths/" + asset + "?" + queryMap[range]
      ).then(
        (result) => setPrices(result.intervals),
        () => {}
      );
    }
  }

  function onAssetChange(e) {
    const newAsset = e.target.value;
    setAsset(newAsset);
    const updateFn = (n) =>
      merge(n, { data: merge(n.data, { asset: newAsset }) });
    updateWorkspace(updateFn, path);
  }
  function onRangeChange(e) {
    const newRange = e.target.value;
    setRange(newRange);
    const updateFn = (n) =>
      merge(n, { data: merge(n.data, { range: newRange }) });
    updateWorkspace(updateFn, path);
  }

  useEffect(() => {
    loadData(asset, range);
    const handle = setInterval(() => loadData(asset, range), 15000);
    return () => clearInterval(handle);
  }, [asset, range]);
  useEffect(() => {
    const el = chartRef.current;
    if (!el || !prices) return;
    while (el.lastChild) {
      el.removeChild(el.lastChild);
    }
    const rect = el.getBoundingClientRect();
    const chart = createChart(el, {
      width: rect.width,
      height: rect.height,
      layout: {
        backgroundColor: "#111827",
        textColor: "#ffffff",
        fontSize: 12,
        fontFamily: "IBM Plex Mono",
      },
      vertLines: {
        color: "rgba(40,40,40,0.2)",
        style: 1,
        visible: true,
      },
      horzLines: {
        color: "rgba(40,40,40,0.2)",
        style: 1,
        visible: true,
      },
      timeScale: {
        fixLeftEdge: true,
        timeVisible: true,
      },
    });
    const series = chart.addAreaSeries({
      bottomColor: "rgba(35, 220, 200, 0.5)",
      lineColor: "rgba(35, 220, 200, 1)",
    });
    series.setData(
      prices.map((p) => ({
        time: parseInt(p.startTime),
        value: parseFloat(p.assetPriceUSD),
      }))
    );
    chart.timeScale().setVisibleLogicalRange({
      from: 0,
      to: prices.length,
    });
  }, [chartRef.current, prices]);

  return (
    <Box title="Chart" path={path} updateWorkspace={updateWorkspace}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", padding: "4px" }}>
          <select
            value={asset}
            onChange={onAssetChange}
            style={{ padding: "4px 8px", width: "100px", marginRight: "8px" }}
          >
            <option value="THOR.RUNE">THOR.RUNE</option>
            {pools
              .sort((a, b) => parseInt(b.runeDepth) - parseInt(a.runeDepth))
              .map((p) => (
                <option value={p.asset} key={p.asset}>
                  {p.asset.slice(0, 12)}
                </option>
              ))}
          </select>
          <select
            value={range}
            onChange={onRangeChange}
            style={{ padding: "4px 8px", width: "100px" }}
          >
            <option value="1d">past day</option>
            <option value="1w">past week</option>
            <option value="3m">past 3 months</option>
            <option value="1y">past year</option>
          </select>
          <div style={{ flex: "1" }} />
          <div>
            {prices
              ? formatMoney(prices[prices.length - 1].assetPriceUSD, 2)
              : ""}
          </div>
        </div>
        <div style={{ flex: "1" }} ref={chartRef} />
      </div>
    </Box>
  );
}
