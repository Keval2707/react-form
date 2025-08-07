import * as z from "zod";

export const genders = {
  Male: "male",
  Female: "female",
  Others: "others",
};

export const schema = z
  .object({
    name: z.string().trim().min(1, "Username is required"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Email format is not valid"),
    dob: z.string().min(1, "Date of birth is required"),
    dod: z.string().optional(),
    gender: z.string().min(1, "Gender is required"),
    hobbies: z
      .array(z.enum(["Coding", "Reading", "Playing", "Travelling"]))
      .min(1, "At least one hobby is required"),
    programming: z.string().optional(),
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

export const hobbiesList = [
  { id: 1, name: "Coding" },
  { id: 2, name: "Reading" },
  { id: 3, name: "Playing" },
  { id: 4, name: "Travelling" },
];

export const options = ["HTML", "CSS", "JavaScript", "React", "Redux"];

export const getAge = (birth, death) => {
  const birthDate = new Date(birth);
  const endDate = death ? new Date(death) : new Date();

  let years = endDate.getFullYear() - birthDate.getFullYear();
  let months = endDate.getMonth() - birthDate.getMonth();
  let days = endDate.getDate() - birthDate.getDate();

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

  if (days === 0) return `${years} years, ${months} months,`;

  if (months === 0) return `${years} years, ${days} days`;

  if (years === 0) return `${months} months, ${days} days`;

  return `${years} years, ${months} months, ${days} days`;
};

export const updateUserList = (list) => {
  localStorage.setItem("rhf-users", JSON.stringify(list));
};

export const getUserList = (key) => {
  if (!key) return;

  const userList = localStorage.getItem(key);

  if (userList?.length) {
    return JSON.parse(userList);
  }

  return [];
};

export const defaultValues = {
  dob: "",
  dod: "",
  name: "",
  email: "",
  gender: "Male",
  hobbies: [],
  password: "",
  active: true,
  programming: "HTML",
  confirmpassword: "",
};
