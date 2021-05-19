import React, { Component } from "react";

import Icon from "./icon";

export default function Box({ title, path, updateWorkspace, children }) {
  function onSelectType() {
    updateWorkspace(
      (node) => Object.assign(node, { data: { type: "empty" } }),
      path
    );
  }

  function onClose() {
    if (path.length === 0) {
      onSelectType();
      return;
    }
    updateWorkspace(() => null, path);
  }

  function onSplit(direction) {
    updateWorkspace((node) => {
      if (direction === "vertically") {
        return {
          type: "vsplit",
          size: node.size,
          top: Object.assign(node, { size: 50 }),
          bottom: { type: "node", size: 50, data: { type: "empty" } },
        };
      } else {
        return {
          type: "hsplit",
          size: node.size,
          left: Object.assign(node, { size: 50 }),
          right: { type: "node", size: 50, data: { type: "empty" } },
        };
      }
    }, path);
  }

  return (
    <div className="box">
      <div className="box-header">
        <span
          className="box-header-title"
          title="Change panel type"
          onClick={onSelectType}
        >
          {title}
        </span>
        <div className="box-header-icon" title="Close" onClick={onClose}>
          <Icon name="times" />
        </div>
        <div
          className="box-header-icon"
          title="Split Horizontally"
          onClick={onSplit.bind(null, "horizontally")}
        >
          <Icon name="arrows-alt-h" />
        </div>
        <div
          className="box-header-icon"
          title="Split Vertically"
          onClick={onSplit.bind(null, "vertically")}
        >
          <Icon name="arrows-alt-v" />
        </div>
      </div>
      <div className="box-contents">{children}</div>
    </div>
  );
}
