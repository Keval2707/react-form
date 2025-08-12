import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { TextInput } from "../Fields/NameInput";
import { RadioInput } from "../Fields/RadioInput";
import { zodResolver } from "@hookform/resolvers/zod/src/zod";
import { ButtonInput } from "../Fields/ButtonInput";
import { PasswordInput } from "../Fields/PasswordInput";
import { DropdownInput } from "../Fields/DropdownInput";
import { CheckboxInput } from "../Fields/CheckboxInput";
import {
  schema,
  options,
  genders,
  hobbiesList,
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

  const dod = watch("dod");
  const dob = watch("dob");
  const isEditing = editingUser && editingUser.id;

  useEffect(() => {
    if (editingUser) {
      Object.keys(editingUser).forEach((key) => {
        setValue(key, editingUser[key]);
      });
    }
  }, [editingUser, setValue]);

  const onSubmit = (data) => {
    if (isEditing) {
      const updatedUsers = formData.map((user) =>
        user.id === editingUser.id ? { ...data, id: editingUser.id } : user
      );
      setFormData(updatedUsers);
      updateUserList(updatedUsers);
      setEditingUser(defaultValues);
    } else {
      const newUser = {
        ...data,
        id: Math.random().toString().substring(2, 6),
      };
      const updatedList = [...formData, newUser];
      setFormData(updatedList);
      updateUserList(updatedList);
    }

    reset();
  };

  const handleCancel = () => {
    reset();
    setEditingUser(defaultValues);
  };

  return (
    <>
      <TextInput
        name="name"
        label="Username"
        control={control}
        placeholder="Enter your username"
      />

      <TextInput
        name="email"
        type="email"
        label="Email"
        control={control}
        placeholder="Enter your email"
      />

      <TextInput
        max={dod}
        name="dob"
        type="date"
        control={control}
        label="Date of Birth"
      />

      <TextInput
        min={dob}
        name="dod"
        type="date"
        control={control}
        label="Date of Death"
      />

      <RadioInput
        type="radio"
        name="gender"
        control={control}
        arrayName={genders}
      />

      <CheckboxInput
        name="hobbies"
        label="Hobbies"
        control={control}
        arrayName={hobbiesList}
      />

      <DropdownInput
        control={control}
        name="programming"
        arrayName={options}
        label="Select your Favourite Language"
      />

      <PasswordInput name="password" control={control} label="Password" />

      <PasswordInput
        control={control}
        name="confirmpassword"
        label="Confirm Password"
      />

      <ButtonInput
        onClick={handleSubmit(onSubmit)}
        label={isEditing ? "Update" : "Submit"}
        className="btn btn-primary flex justify-center gap-2 items-center"
      />

      {isEditing && (
        <ButtonInput
          label="Cancel"
          type="button"
          onClick={handleCancel}
          className="btn btn-primary flex justify-center gap-2 items-center"
        />
      )}
    </>
  );
};
