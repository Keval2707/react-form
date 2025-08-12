import { useState } from "react";
import { RHFUserForm } from './RHFUserForm';
import { RHFUserList } from "./RHFUserList";
import { defaultValues, getUserList } from "./components";

const RHFUser = () => {
  const [activeTab, setActiveTab] = useState("AllUsers");
  const [editingUser, setEditingUser] = useState(defaultValues);
  const [formData, setFormData] = useState(getUserList("rhf-users"));

  const isEditing = editingUser && editingUser.id;

  return (
    <>
      <div className="form-wrapper">
        <h2 className="form-title text-4xl">
          {isEditing ? "Edit Details" : "Create Account"}
        </h2>

        <RHFUserForm
          formData={formData}
          setFormData={setFormData}
          editingUser={editingUser}
          setEditingUser={setEditingUser}
        />
      </div>

      <section>
        <div className="mt-2">
          <h1 className="text-center text-3xl">User Details</h1>

          <div className="tabs">
            <button
              onClick={() => setActiveTab("ActiveUsers")}
              className={activeTab === "ActiveUsers" ? "active" : ""}
            >
              Active Users
            </button>

            <button
              onClick={() => setActiveTab("InactiveUsers")}
              className={activeTab === "InactiveUsers" ? "active" : ""}
            >
              Inactive Users
            </button>

            <button
              onClick={() => setActiveTab("AllUsers")}
              className={activeTab === "AllUsers" ? "active" : ""}
            >
              All Users
            </button>
          </div>

          <RHFUserList
            formData={formData}
            activeTab={activeTab}
            setFormData={setFormData}
            editingUser={editingUser}
            setEditingUser={setEditingUser}
          />
        </div>
      </section>
    </>
  );
};

export default RHFUser;
