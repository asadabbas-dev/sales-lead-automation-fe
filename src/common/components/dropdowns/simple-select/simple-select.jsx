import PropTypes from "prop-types";
import { forwardRef } from "react";
import useSimpleSelect from "./use-simple-select";
import CustomInput from "../../custom-input/custom-input.component";
import FieldLabel from "../../field-label/field-label.component";
import FieldError from "../../field-error/field-error.component";

const SimpleSelect = forwardRef(function SimpleSelect(
  {
    label,
    placeholder = "Select an option...",
    options = [],
    isMulti = false,
    isSearchable = false,
    onChange,
    defaultValue,
    value,
    className = "",
    disabled = false,
    isRequired = false,
    errors = null,
    name,
    size = "md",
    variant = "default",
    helperText = null,
    inlineLabel = false,
    labelClassName = "",
    maxHeight = "15rem",
    clearable = false,
    loading = false,
    noOptionsMessage = "No options found",
  },
  _ref,
) {
  const {
    inputRef, // ← this is now wrapperRef from the hook
    handleInputClick,
    getDisplay,
    showMenu,
    onSearch,
    searchValue,
    searchRef,
    getOptions,
    onItemClick,
    isSelected,
    clearSelection,
  } = useSimpleSelect({
    placeholder,
    options,
    isMulti,
    isSearchable,
    onChange,
    defaultValue,
    value,
    disabled,
  });

  const hasError = errors && name && errors[name];
  const errorMessage = hasError ? errors[name].message : null;

  const sizeClasses = {
    sm: "text-sm py-2 px-3 h-9",
    md: "text-sm py-3 px-4 h-11",
    lg: "text-base py-4 px-4 h-12",
  };

  const variantClasses = {
    default: "",
    bordered: "border-2",
    minimal: "border-0 border-b-2 rounded-none bg-transparent",
  };

  const triggerClasses = [
    "form-select",
    sizeClasses[size] ?? sizeClasses.md,
    variantClasses[variant] ?? "",
    hasError ? "form-input-error" : "",
    disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const containerClasses = inlineLabel
    ? "grid w-full grid-cols-[130px_1fr] items-start gap-4"
    : "form-group";

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleInputClick();
    } else if (e.key === "Escape" && showMenu) {
      handleInputClick();
    }
  };

  const displayValue = getDisplay();
  const isPlaceholder =
    !displayValue ||
    displayValue === placeholder ||
    displayValue === "Select an option...";

  return (
    <div className={containerClasses}>
      {label && (
        <FieldLabel
          label={label}
          isRequired={isRequired}
          className={`${inlineLabel ? "mt-2" : ""} ${labelClassName}`}
        />
      )}

      {/*
        FIX: inputRef (which is wrapperRef in the hook) is placed HERE on the
        outer wrapper that contains BOTH the trigger button and the dropdown
        menu. This means clicks on menu options are inside the ref boundary,
        so the outside-click handler in the hook does NOT fire when the user
        selects an option — the menu stays open long enough for onItemClick
        to run, then closes normally.

        Previously inputRef was on the trigger <div> only. The dropdown is a
        sibling of the trigger, so clicking an option was "outside" inputRef
        and the menu closed before the click could register.
      -->
      */}
      <div ref={inputRef} className="relative w-full">
        {/* Trigger */}
        <div
          onClick={disabled ? undefined : handleInputClick}
          onKeyDown={handleKeyDown}
          className={triggerClasses}
          role="combobox"
          aria-expanded={showMenu}
          aria-haspopup="listbox"
          aria-required={isRequired}
          aria-invalid={!!hasError}
          tabIndex={disabled ? -1 : 0}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex-1 truncate pr-2">
              {loading ? (
                <span className="flex items-center text-white">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                <span className="text-white">{displayValue}</span>
              )}
            </div>

            {/* Clear button — only shown when clearable + something selected */}
            {clearable && !isPlaceholder && !disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className="p-1 hover:bg-white/10 rounded text-white transition-colors"
                aria-label="Clear selection"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}

            {/*
              FIX: No DropdownIcon here.
              The "form-select" CSS class already renders a native chevron via
              CSS (background-image SVG arrow). Adding a second icon here was
              causing the double-chevron. Removed entirely.
            */}
          </div>
        </div>

        {/* Dropdown menu */}
        {showMenu && !disabled && (
          <div
            className="absolute top-full left-0 mt-1 w-full bg-black border border-white/10 rounded-sm shadow-2xl overflow-hidden"
            style={{ zIndex: 9999 }}
          >
            {isSearchable && (
              <div className="p-3 border-b border-white/10 bg-black">
                <CustomInput
                  ref={searchRef}
                  name="search"
                  onChange={onSearch}
                  value={searchValue}
                  placeholder="Search options..."
                  size="sm"
                  className="border-white/10"
                />
              </div>
            )}

            <div
              className="overflow-auto"
              style={{ maxHeight }}
              role="listbox"
              aria-multiselectable={isMulti}
            >
              {getOptions()?.length > 0 ? (
                getOptions().map((option, index) => (
                  <div
                    key={`${option.value}-${index}`}
                    onClick={() => onItemClick(option)}
                    className={`cursor-pointer px-4 py-3 text-sm transition-colors hover:bg-white/10 ${
                      isSelected(option)
                        ? "bg-white/10 text-white font-medium"
                        : "text-white"
                    }`}
                    role="option"
                    aria-selected={isSelected(option)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{option.label}</span>
                      {isMulti && isSelected(option) && (
                        <svg
                          className="w-4 h-4 text-white ml-2 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-sm text-white text-center">
                  {isSearchable && searchValue
                    ? `No results for "${searchValue}"`
                    : noOptionsMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {(helperText || errorMessage) && (
          <div className="mt-1">
            {errorMessage ? (
              <FieldError className="normal-case" error={errorMessage} />
            ) : (
              helperText && <p className="text-xs text-white">{helperText}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

SimpleSelect.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    ),
  ]),
  disabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  errors: PropTypes.object,
  name: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  variant: PropTypes.oneOf(["default", "bordered", "minimal"]),
  helperText: PropTypes.string,
  inlineLabel: PropTypes.bool,
  labelClassName: PropTypes.string,
  maxHeight: PropTypes.string,
  clearable: PropTypes.bool,
  loading: PropTypes.bool,
  noOptionsMessage: PropTypes.string,
};

export const SELECT_SIZES = { SMALL: "sm", MEDIUM: "md", LARGE: "lg" };
export const SELECT_VARIANTS = {
  DEFAULT: "default",
  BORDERED: "bordered",
  MINIMAL: "minimal",
};

export default SimpleSelect;
