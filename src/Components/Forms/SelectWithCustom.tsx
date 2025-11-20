type TSelectWithCustomProps = {
  label: string;
  id: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  allowCustom?: boolean;
  customOption?: string;
  customLabel?: string;
  customValue?: string;
  onCustomChange?: (value: string) => void;
};

export function SelectWithCustom({
  label,
  id,
  options,
  value,
  onChange,
  allowCustom = false,
  customOption = "custom",
  customLabel = "Custom...",
  customValue = "",
  onCustomChange,
}: TSelectWithCustomProps) {
  const showCustom = value === customOption;

  return (
    <div className="select-with-custom">
      <label htmlFor={id}>
        {label}
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
          {allowCustom && <option value={customOption}>{customLabel}</option>}
        </select>
      </label>
      {showCustom && onCustomChange && (
        <input
          type="text"
          value={customValue}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="Enter custom value"
          className="custom-input"
        />
      )}
    </div>
  );
}
