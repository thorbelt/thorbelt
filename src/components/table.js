import { useState } from "react";
import { merge, sortBy } from "../utils";

export default function Table({
  headers,
  rows,
  defaultSort,
  onSortChange,
  filters: propsFilters,
  onFilterChange: propsOnFilterChange,
}) {
  const [filters, setFilters] = useState(propsFilters || {});
  const [sort, setSort] = useState(defaultSort || "+" + headers[0].id);

  function onFilterChange(headerId, e) {
    let newValue = null;
    if (e.target.value !== "all") {
      newValue = e.target.value;
    }
    const newFilters = merge(filters, { [headerId]: newValue });
    setFilters(newFilters);
    if (propsOnFilterChange) {
      propsOnFilterChange(newFilters);
    }
  }

  function onSort(headerId) {
    let newSort;
    if (sort && sort.slice(1) === headerId) {
      newSort = (sort[0] === "+" ? "-" : "+") + sort.slice(1);
    } else {
      newSort = "+" + headerId;
    }
    setSort(newSort);
    if (onSortChange) onSortChange(newSort);
  }

  let filteredRows = rows.filter((r) => {
    for (let i in filters) {
      if (filters[i]) {
        if (r[i] !== filters[i]) {
          return false;
        }
      }
    }
    return true;
  });
  let sortProp = sort.slice(1);
  filteredRows = sortBy(
    (r) => (sortProp + "Value" in r ? r[sortProp + "Value"] : r[sortProp]),
    filteredRows
  );
  if (sort[0] === "-") filteredRows = filteredRows.reverse();

  const valuesForFilter = (key) => {
    const uniq = (e, i, a) => a.indexOf(e) === i;
    return rows
      .map((r) => r[key + "Value"] || r[key])
      .filter(uniq)
      .sort();
  };

  return (
    <table className="trading-table">
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h.id} className={h.class} style={h.style || {}}>
              {h.filter ? (
                <select
                  onChange={onFilterChange.bind(null, h.id)}
                  value={filters[h.id] || "all"}
                >
                  <option value="all">all</option>
                  {valuesForFilter(h.id).map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              ) : null}
            </th>
          ))}
        </tr>
        <tr>
          {headers.map((h) => (
            <th
              key={h.id}
              className={h.class}
              style={h.style || {}}
              onClick={onSort.bind(null, h.id)}
            >
              {sort.slice(1) === h.id ? sort[0] : ""}
              {h.name || h.id}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredRows.map((r, i) => (
          <tr key={i}>
            {headers.map((h) => (
              <td
                key={h.id}
                className={h.class + " " + r[h.id + "Class"] || ""}
                style={h.style || {}}
                title={r[h.id + "Title"] || ""}
              >
                {r[h.id]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
