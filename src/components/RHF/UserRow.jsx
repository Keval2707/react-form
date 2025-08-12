import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getAge } from "./components";

export const UserRow = ({
  user,
  onEdit,
  onDelete,
  activeTab,
  isEditing,
  onToggleActive,
}) => {
  const {
    id,
    dob,
    dod,
    name,
    email,
    active,
    gender,
    hobbies,
    programming,
    // password,
    // confirmpassword,
  } = user;

  return (
    <tr
      className={`${
        !active && activeTab !== "InactiveUsers" ? "line-through" : ""
      }`}
    >
      <td>{id}</td>
      <td onClick={() => onToggleActive(id)} className="cursor-pointer">
        {name}
      </td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{dob}</td>
      <td>{dod || "-----"}</td>
      <td>{getAge(dob, dod)}</td>
      <td>{Array.isArray(hobbies) ? hobbies.join(", ") : hobbies}</td>
      <td>{programming || "-----"}</td>
      <td className="flex gap-2">
        <button
          disabled={isEditing}
          onClick={() => onEdit(user)}
          className={`p-1 text-blue-600 hover:text-blue-800 ${
            isEditing ? "cursor-not-allowed text-blue-800" : ""
          }`}
        >
          <FiEdit3 />
        </button>
        <button
          disabled={isEditing}
          onClick={() => onDelete(id)}
          className={`p-1 text-red-600 hover:text-red-800 ${
            isEditing ? "cursor-not-allowed text-red-800" : ""
          }`}
        >
          <RiDeleteBin6Fill />
        </button>
      </td>
    </tr>
  );
};
