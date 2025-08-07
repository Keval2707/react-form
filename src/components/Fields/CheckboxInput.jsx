import { useController } from "react-hook-form";

export const CheckboxInput = ({
  label,
  control,
  arrayName,
  name = "hobbies",
  ...rest
}) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control, defaultValue: [] });

  const handleCheckboxChange = (item) => {
    const updatedValue = value.includes(item)
      ? value.filter((item) => item !== item)
      : [...value, item];
    onChange(updatedValue);
  };

  return (
    <div className="form-group">
      <p>{label}</p>

      <div className="flex pt-3 ml-4">
        <ul>
          {arrayName.map(({ name: hobbyName }, index) => (
            <li key={index} className="items-center gap-2 flex mb-2">
              <input
                type="checkbox"
                id={`${hobbyName}-${index}`}
                checked={value.includes(hobbyName)}
                onChange={() => handleCheckboxChange(hobbyName)}
                className="cursor-pointer"
                {...rest}
              />

              <label
                htmlFor={`${hobbyName}-${index}`}
                className="cursor-pointer text-sm"
              >
                {hobbyName}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
