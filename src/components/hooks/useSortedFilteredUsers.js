import { useMemo } from "react";

export const useSortedFilteredUsers = (users, activeTab, sortConfig) => {
  return useMemo(() => {
    let filtered =
      activeTab === "ActiveUsers"
        ? users.filter((u) => u.active !== false)
        : activeTab === "InactiveUsers"
        ? users.filter((u) => u.active === false)
        : [...users];

    if (sortConfig.direction === "default" || !sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      let aVal = Array.isArray(a[sortConfig.key])
        ? a[sortConfig.key].join(", ")
        : String(a[sortConfig.key] || "");
        
      let bVal = Array.isArray(b[sortConfig.key])
        ? b[sortConfig.key].join(", ")
        : String(b[sortConfig.key] || "");

      if (sortConfig.key === "id") {
        return sortConfig.direction === "asc"
          ? (parseInt(aVal) || 0) - (parseInt(bVal) || 0)
          : (parseInt(bVal) || 0) - (parseInt(aVal) || 0);
      }

      return sortConfig.direction === "asc"
        ? aVal.localeCompare(bVal, undefined, {
            numeric: true,
            sensitivity: "base",
          })
        : bVal.localeCompare(aVal, undefined, {
            numeric: true,
            sensitivity: "base",
          });
    });
  }, [users, activeTab, sortConfig]);
};
