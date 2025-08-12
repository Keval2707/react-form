import { FiEdit3 } from "react-icons/fi";
import { useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { getAge, updateUserList } from "./components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { useSortedFilteredUsers } from "../hooks/useSortedFilteredUsers";

export const RHFUserList = ({
  formData,
  activeTab,
  setFormData,
  editingUser,
  setEditingUser,
}) => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "default",
  });

  const sortedFilteredUsers = useSortedFilteredUsers(
    formData,
    activeTab,
    sortConfig
  );

  const isEditing = !!editingUser?.id;

  const handleDelete = (id) => {
    const updated = formData.filter((user) => user.id !== id);
    setFormData(updated);
    updateUserList(updated);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key
          ? prev.direction === "asc"
            ? "desc"
            : prev.direction === "desc"
            ? "default"
            : "asc"
          : "asc",
    }));
  };

  const handleUserState = (id) => {
    const updatedList = formData.map((user) =>
      user.id === id ? { ...user, active: !user.active } : user
    );

    setFormData(updatedList);
    updateUserList(updatedList);
  };

  const iconRenderer = {
    default: <></>,
    asc: <FaArrowUp />,
    desc: <FaArrowDown />,
  };

  const getSortIndicator = (columnKey) =>
    sortConfig.key === columnKey ? iconRenderer[sortConfig.direction] : null;

  if (!formData.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No users found. Create your first user above!
      </div>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          {["id", "name", "email"].map((col) => (
            <th
              key={col}
              onClick={() => handleSort(col)}
              style={{ cursor: "pointer" }}
            >
              <span className="flex capitalize">
                {col} {getSortIndicator(col)}
              </span>
            </th>
          ))}

          <th>Gender</th>
          <th>Date of Birth</th>
          <th>Date of Death</th>
          <th>Age</th>
          <th>Hobbies</th>
          <th>Programming Language</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {sortedFilteredUsers.map((user) => (
          <tr
            key={user.id}
            className={
              !user.active && activeTab !== "InactiveUsers"
                ? "line-through"
                : ""
            }
          >
            <td>{user.id}</td>
            <td onClick={() => handleUserState(user.id)}>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.gender}</td>
            <td>{user.dob}</td>
            <td>{user.dod || "-----"}</td>
            <td>{getAge(user.dob, user.dod)}</td>
            <td>
              {Array.isArray(user.hobbies)
                ? user.hobbies.join(", ")
                : user.hobbies}
            </td>

            <td>{user.programming || "-----"}</td>

            <td>
              <button
                disabled={isEditing}
                onClick={() => setEditingUser(user)}
                className={`p-1 text-blue-600 hover:text-blue-800 ${
                  isEditing ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <FiEdit3 />
              </button>

              <button
                disabled={isEditing}
                onClick={() => handleDelete(user.id)}
                className={`p-1 text-red-600 hover:text-red-800 ${
                  isEditing ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <RiDeleteBin6Fill />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
