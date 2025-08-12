import * as Fields from "../Fields";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import {
  schema,
  formFields,
  defaultValues,
  updateUserList,
} from "./components";

export const RHFUserForm = ({
  formData,
  editingUser,
  setFormData,
  setEditingUser,
}) => {
  const { watch, reset, control, setValue, handleSubmit } = useForm({
    mode: "all",
    defaultValues: editingUser,
    resolver: zodResolver(schema),
  });

  const values = watch();
  const isEditing = !!editingUser?.id;

  useEffect(() => {
    if (editingUser) {
      Object.keys(editingUser).forEach((key) => {
        setValue(key, editingUser[key]);
      });
    }
  }, [editingUser, setValue]);

  const onSubmit = (data) => {
    const updatedList = isEditing
      ? formData.map((u) =>
          u.id === editingUser.id ? { ...data, id: editingUser.id } : u
        )
      : [
          ...formData,
          { ...data, id: Math.random().toString().substring(2, 6) },
        ];

    setFormData(updatedList);
    updateUserList(updatedList);
    setEditingUser(defaultValues);
    reset();
  };

  const handleCancel = () => {
    reset();
    setEditingUser(defaultValues);
  };

  return (
    <>
      {formFields.map(({ component, maxField, minField, ...field }) => {
        const FieldComponent = Fields[component];
        return (
          <FieldComponent
            key={field.name}
            control={control}
            {...field}
            {...(maxField && { max: values[maxField] })}
            {...(minField && { min: values[minField] })}
          />
        );
      })}

      <Fields.ButtonInput
        onClick={handleSubmit(onSubmit)}
        label={isEditing ? "Update" : "Submit"}
        className="btn btn-primary flex justify-center gap-2 items-center"
      />

      {isEditing && (
        <Fields.ButtonInput
          label="Cancel"
          type="button"
          onClick={handleCancel}
          className="btn btn-primary flex justify-center gap-2 items-center"
        />
      )}
    </>
  );
};
