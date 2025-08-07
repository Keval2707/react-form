import { useController } from "react-hook-form";

export const DropdownInput = ({ name, label, control, arrayName, ...rest }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <select id={name} className="dropdown" {...field} {...rest}>
        {arrayName.map((item, i) => {
          return (
            <option value={item} className="dropdown" key={i}>
              {item}
            </option>
          );
        })}
      </select>

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
