import * as z from "zod";

export const genders = {
  Male: "male",
  Female: "female",
  Others: "others",
};

export const hobbiesList = [
  { id: 1, name: "Coding" },
  { id: 2, name: "Reading" },
  { id: 3, name: "Playing" },
  { id: 4, name: "Travelling" },
];

export const options = ["HTML", "CSS", "JavaScript", "React", "Redux"];

export const schema = z
  .object({
    name: z.string().trim().min(1, "Username is required"),
    dob: z.string().min(1, "Date of birth is required"),
    dod: z.string().optional(),
    gender: z.string().min(1, "Gender is required"),
    programming: z.string().min(1, "language is required"),
    hobbies: z
      .array(z.enum(["Coding", "Reading", "Playing", "Travelling"]))
      .min(1, "At least one hobby is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Email format is not valid"),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmpassword: z.string().trim().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords don't match",
    path: ["confirmpassword"],
  });

export const defaultValues = {
  dob: "",
  dod: "",
  name: "",
  email: "",
  hobbies: [],
  password: "",
  active: true,
  gender: "Male",
  programming: "",
  confirmpassword: "",
};

export const formFields = [
  {
    component: "NameInput",
    name: "name",
    label: "Username",
    placeholder: "Enter your username",
  },

  {
    component: "NameInput",
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
  },

  {
    component: "NameInput",
    name: "dob",
    type: "date",
    label: "Date of Birth",
    maxField: "dod",
  },

  {
    component: "NameInput",
    name: "dod",
    type: "date",
    label: "Date of Death",
    minField: "dob",
  },

  { component: "RadioInput", name: "gender", arrayName: genders },

  {
    component: "CheckboxInput",
    name: "hobbies",
    label: "Hobbies",
    arrayName: hobbiesList,
  },

  {
    component: "DropdownInput",
    name: "programming",
    label: "Select your Favourite Language",
    arrayName: options,
  },

  { component: "PasswordInput", name: "password", label: "Password" },

  {
    component: "PasswordInput",
    name: "confirmpassword",
    label: "Confirm Password",
  },
];

export const getAge = (birth, death) => {
  const birthDate = new Date(birth);
  const endDate = death ? new Date(death) : new Date();

  let days = endDate.getDate() - birthDate.getDate();
  let months = endDate.getMonth() - birthDate.getMonth();
  let years = endDate.getFullYear() - birthDate.getFullYear();

  if (days < 0) {
    months -= 1;

    const lastDayOfPrevMonth = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      0
    ).getDate();
    days += lastDayOfPrevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  if (months === 0) return `${years} years, ${days} days`;
  
  if (years === 0) return `${months} months, ${days} days`;
  
  if (days === 0) return `${years} years, ${months} months,`;

  return `${years} years, ${months} months, ${days} days`;
};

const STORAGE_KEY = import.meta.env.VITE_LOCALE_STORAGE_KEY;

export const updateUserList = (list) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const getUserList = () => {
  const key = STORAGE_KEY;

  if (!key) return [];

  const userList = localStorage.getItem(key);

  return userList?.length ? JSON.parse(userList) : [];
};
