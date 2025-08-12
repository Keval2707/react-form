import { useController } from "react-hook-form";

export const NameInput = ({ name, control, label, type = "text", ...rest }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>

        <input id={name} type={type} {...field} {...rest} autoComplete="off" />

        {error && <p className="error">{error.message}</p>}
      </div>
    </>
  );
};
