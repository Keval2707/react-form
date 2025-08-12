import { FiEdit3 } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useMemo, useState } from "react";
import { getAge, updateUserList } from "./components";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

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

  const handleDelete = (id) => {
    const deletedUser = formData.filter((user) => user.id !== id);
    setFormData(deletedUser);
    updateUserList(deletedUser);
  };

  const iconRenderer = {
    default: <></>,
    asc: <FaArrowUp />,
    desc: <FaArrowDown />,
  };

  const handleSort = (key) => {
    let direction = "asc";

    if (sortConfig.key === key) {
      if (sortConfig.direction === "default") {
        direction = "asc";
      } else if (sortConfig.direction === "asc") {
        direction = "desc";
      } else {
        direction = "default";
      }
    } else {
      direction = "asc";
    }

    setSortConfig({ key, direction });
  };

  const getSortIndicator = (columnKey) => {
    if (sortConfig.key === columnKey) {
      return iconRenderer[sortConfig.direction];
    }
    return null;
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const isEditing = editingUser && editingUser.id;

  const currentUserList = useMemo(() => {
    let filteredData;
    if (activeTab === "ActiveUsers") {
      filteredData = formData.filter((user) => user.active !== false);
    } else if (activeTab === "InactiveUsers") {
      filteredData = formData.filter((user) => user.active === false);
    } else {
      filteredData = [...formData];
    }

    if (sortConfig.direction === "default" || !sortConfig.key) {
      return filteredData;
    }

    return [...filteredData].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (Array.isArray(aValue)) {
        aValue = aValue.join(", ");
      }
      if (Array.isArray(bValue)) {
        bValue = bValue.join(", ");
      }
      aValue = String(aValue || "");
      bValue = String(bValue || "");

      if (sortConfig.key === "id") {
        const numA = parseInt(aValue) || 0;
        const numB = parseInt(bValue) || 0;
        return sortConfig.direction === "asc" ? numA - numB : numB - numA;
      }

      const comparison = aValue.localeCompare(bValue, undefined, {
        numeric: true,
        sensitivity: "base",
      });

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [activeTab, formData, sortConfig.key, sortConfig.direction]);

  if (formData.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No users found. Create your first user above!
      </div>
    );
  }

  const handleUserState = (id) => {
    const updatedList = formData.map((user) => {
      if (user.id === id) {
        return { ...user, active: !user.active };
      }
      return user;
    });
    setFormData(updatedList);
    updateUserList(updatedList);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("id")} style={{ cursor: "pointer" }}>
              <span className="flex">id {getSortIndicator("id")}</span>
            </th>

            <th
              onClick={() => handleSort("name")}
              style={{ cursor: "pointer" }}
            >
              <span className="flex">Username {getSortIndicator("name")}</span>
            </th>

            <th
              onClick={() => handleSort("email")}
              style={{ cursor: "pointer" }}
            >
              <span className="flex">Email {getSortIndicator("email")}</span>
            </th>

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
          {currentUserList.map(
            ({
              id,
              dob,
              dod,
              name,
              email,
              active,
              gender,
              hobbies,
              password,
              programming,
              confirmpassword,
            }) => (
              <tr
                key={id}
                className={`${
                  !active && activeTab !== "InactiveUsers" ? "line-through" : ""
                }`}
              >
                <td>{id}</td>

                <td>
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => handleUserState(id)}
                  >
                    <span>{name}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>{email}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>{gender}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>{dob}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-center">
                    <span>{dod === "" ? "-----" : dod}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>{getAge(dob, dod)}</span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>
                      {Array.isArray(hobbies) ? hobbies.join(", ") : hobbies}
                    </span>
                  </div>
                </td>

                <td>
                  <div className="flex justify-between">
                    <span>{programming || "-----"}</span>
                  </div>
                </td>

                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleEdit({
                          id,
                          dob,
                          dod,
                          name,
                          email,
                          gender,
                          hobbies,
                          password,
                          programming,
                          confirmpassword,
                        })
                      }
                      disabled={isEditing}
                      className={`p-1 text-blue-600 hover:text-blue-800 ${
                        isEditing
                          ? "cursor-not-allowed text-blue-800"
                          : "cursor-pointer"
                      }`}
                      title="Edit user"
                    >
                      <FiEdit3 />
                    </button>

                    <button
                      disabled={isEditing}
                      onClick={() => handleDelete(id)}
                      className={`p-1 text-red-600 hover:text-red-800 ${
                        isEditing
                          ? "cursor-not-allowed text-red-800"
                          : "cursor-pointer"
                      }`}
                      title="Delete user"
                    >
                      <RiDeleteBin6Fill />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};
