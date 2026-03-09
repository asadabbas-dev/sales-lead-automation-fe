"use client";

import PropTypes from "prop-types";

export function StatsBadge({
  label,
  value,
  valueClassName = "text-white",
  labelClassName = "text-yellow-300",
  className = "",
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-lg border border-white/10 bg-black/40 p-4 ${className}`}
    >
      <span
        className={`text-[11px] font-semibold uppercase tracking-wider ${labelClassName}`}
      >
        {label}
      </span>
      <p className={`text-xl font-bold ${valueClassName}`}>{value}</p>
    </div>
  );
}

StatsBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
  valueClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  className: PropTypes.string,
};

export default StatsBadge;
