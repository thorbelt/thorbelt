import React, { useRef, useState, useEffect } from "react";
import { merge } from "../utils";
import NodeEmpty from "./nodeEmpty";
import NodeStats from "./nodeStats";
import NodePools from "./nodePools";
import NodeWallet from "./nodeWallet";
import NodeChart from "./nodeChart";
import NodeHistory from "./nodeHistory";
import NodeManualTransaction from "./nodeManualTransaction";

export default function Node({
  type,
  size,
  data,
  path,
  updateWorkspace,
  top,
  bottom,
  left,
  right,
}) {
  const nodeRef = useRef();
  const [isDragging, setIsDragging] = useState(false);

  const onMouseMove = (e) => {
    let el = nodeRef.current;
    let nodes = el.querySelectorAll(".workspace-node");
    let rect = el.getBoundingClientRect();

    let pos = type === "hsplit" ? e.clientX : e.clientY;
    let edge = type === "hsplit" ? rect.left : rect.top;
    let size = type === "hsplit" ? rect.width : rect.height;
    let percentWidth = ((pos - edge) / size) * 100;
    percentWidth = Math.min(85, Math.max(15, percentWidth));
    percentWidth = Math.round(percentWidth / 5) * 5;
    nodes[0].style.flexBasis = percentWidth + "%";
    nodes[1].style.flexBasis = 100 - percentWidth + "%";

    if (type === "hsplit") {
      updateWorkspace(
        (node) =>
          merge(node, {
            size: percentWidth,
          }),
        path.concat(["left"])
      );
      updateWorkspace(
        (node) =>
          merge(node, {
            size: 100 - percentWidth,
          }),
        path.concat(["right"])
      );
    } else {
      updateWorkspace(
        (node) =>
          merge(node, {
            size: percentWidth,
          }),
        path.concat(["top"])
      );
      updateWorkspace(
        (node) =>
          merge(node, {
            size: 100 - percentWidth,
          }),
        path.concat(["bottom"])
      );
    }
  };
  function onMouseDown() {
    setIsDragging(true);
  }
  function onMouseUp() {
    setIsDragging(false);
    window.removeEventListener("mousemove", onMouseMove);
  }

  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isDragging]);

  const renderNode = () => {
    switch (data.type) {
      case "empty":
        return (
          <NodeEmpty
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "stats":
        return (
          <NodeStats
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "pools":
        return (
          <NodePools
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "wallet":
        return (
          <NodeWallet
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "chart":
        return (
          <NodeChart
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "history":
        return (
          <NodeHistory
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      case "manualTransaction":
        return (
          <NodeManualTransaction
            data={data}
            path={path}
            updateWorkspace={updateWorkspace}
          />
        );
      default:
        throw new Error("Unknown terminal node type: " + data.type);
    }
  };
  switch (type) {
    case "vsplit":
      return (
        <div
          ref={nodeRef}
          className={
            "workspace-node workspace-vsplit " +
            (isDragging ? "is-dragging" : "")
          }
          style={{ flexBasis: size + "%" }}
        >
          <Node
            {...top}
            path={path.concat(["top"])}
            updateWorkspace={updateWorkspace}
          />
          <div
            className={
              "workspace-resize-handle " + (isDragging ? "is-dragging" : "")
            }
            onMouseDown={onMouseDown}
          />
          <Node
            {...bottom}
            path={path.concat(["bottom"])}
            updateWorkspace={updateWorkspace}
          />
        </div>
      );
    case "hsplit":
      return (
        <div
          ref={nodeRef}
          className={
            "workspace-node workspace-hsplit " +
            (isDragging ? "is-dragging" : "")
          }
          style={{ flexBasis: size + "%" }}
        >
          <Node
            {...left}
            path={path.concat(["left"])}
            updateWorkspace={updateWorkspace}
          />
          <div
            className={
              "workspace-resize-handle " + (isDragging ? "is-dragging" : "")
            }
            onMouseDown={onMouseDown}
          />
          <Node
            {...right}
            path={path.concat(["right"])}
            updateWorkspace={updateWorkspace}
          />
        </div>
      );
    case "node":
      return (
        <div
          ref={nodeRef}
          className="workspace-node"
          style={{ flexBasis: size + "%" }}
        >
          {renderNode()}
        </div>
      );
    default:
      throw new Error("Unknown node type: " + type);
  }
}
