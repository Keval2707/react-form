import { useController } from "react-hook-form";

export const RadioInput = ({
  control,
  arrayName,
  type = "radio",
  name = "gender",
  ...rest
}) => {
  const {
    fieldState: { error },
    field: { value, onChange },
  } = useController({ name, control });

  return (
    <div className="form-group">
      <p>Select your Gender</p>

      <div className="flex gap-4 items-center pt-3">
        {Object.keys(arrayName).map((gender) => (
          <div key={gender} className="items-center flex gap-2">
            <input
              {...rest}
              type={type}
              name={name}
              value={gender}
              id={arrayName[gender]}
              checked={value === gender}
              onChange={(e) => onChange(e.target.value)}
            />

            <label
              htmlFor={arrayName[gender]}
              className="text-sm cursor-pointer"
            >
              {gender}
            </label>
          </div>
        ))}
      </div>

      {error && <p className="error">{error.message}</p>}
    </div>
  );
};
