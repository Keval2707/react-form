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
            id={name}
            {...field}
            type={show ? "text" : "password"}
            placeholder={`Enter your ${name}`}
          />

          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setShow((s) => !s)}
          >
            {show ? <VscEye /> : <VscEyeClosed />}
          </button>
        </div>

        {error && <p className="error">{error.message}</p>}
      </div>
    </>
  );
};
