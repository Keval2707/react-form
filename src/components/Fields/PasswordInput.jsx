import { useState } from "react";
import { useController } from "react-hook-form";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export const PasswordInput = ({ name, control, label }) => {
  const [show, setShow] = useState(false);

  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>

        <div className="flex gap-3">
          <input
            {...field}
            type={show ? "text" : "password"}
            id={name}
            placeholder={`Enter your ${name}`}
          />

          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="cursor-pointer"
          >
            {show ? <VscEye /> : <VscEyeClosed />}
          </button>
        </div>

        {error && <p className="error">{error.message}</p>}
      </div>
    </>
  );
};
