"use client";

import { useState, useMemo, useCallback } from "react";

export function useFilterBar({
  statusFilter,
  qualifiedFilter,
  sourceFilter,
  searchQuery,
  onStatusChange,
  onQualifiedChange,
  onSourceChange,
  onSearchChange,
  onClearFilters,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const hasActiveFilters = useMemo(
    () =>
      statusFilter ||
      qualifiedFilter !== "" ||
      sourceFilter ||
      searchQuery,
    [statusFilter, qualifiedFilter, sourceFilter, searchQuery]
  );

  const toggleAdvanced = useCallback(() => {
    setShowAdvanced((prev) => !prev);
  }, []);

  const handleStatusToggle = useCallback(() => {
    onStatusChange?.(statusFilter === "failed" ? "" : "failed");
  }, [statusFilter, onStatusChange]);

  const handleQualifiedToggle = useCallback(() => {
    onQualifiedChange?.(qualifiedFilter === true ? "" : true);
  }, [qualifiedFilter, onQualifiedChange]);

  return {
    showAdvanced,
    hasActiveFilters,
    toggleAdvanced,
    handleStatusToggle,
    handleQualifiedToggle,
  };
}
