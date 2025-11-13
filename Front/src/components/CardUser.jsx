import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { useState } from "react";
import toast from "react-hot-toast";

const CardUser = ({ user, setDeleteUser, setRoleChange }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [newAdress, setNewAdress] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("RucaMeu-token");
  const userRole = localStorage.getItem("user_role");

  const isAdressRequired =
    selectedRole === "Admin" || selectedRole === "Employee";

  const handleSelectChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);

    if (role === "Client") setNewAdress("");
  };

  const handleRoleChange = async () => {
    if (selectedRole === "" || selectedRole === user.role) {
      // No hacer nada si no se ha seleccionado un rol o es el mismo
      return;
    }

    // 3. Validación: Si la dirección es requerida y está vacía
    if (isAdressRequired && newAdress.trim() === "") {
      toast.error(
        "Debes completar el campo Dirección para el rol seleccionado."
      );
      return;
    }

    if (!token) {
      navigate("/login");
      return;
    }

    // Construir el DTO
    const changeRolDTO = {
      Id: user.id,
      Role: selectedRole,
      Adress: newAdress || "",
    };

    try {
      const res = await fetch(`${API_URL}/ChangeRole`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changeRolDTO),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Falló al actualizar el rol del usuario."
        );
      }
      setRoleChange(true); // Esto activará el useEffect en AdminPanel
      toast.success("Rol actualizado correctamente.");
    } catch (error) {
      console.error("Error al cambiar el rol:", error.message);
      toast.error("Error al cambiar el rol");
    }
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">{user.fullName}</h5>
        <p className="card-text">{user.role}</p>
        <p className="card-text">{user.phoneNumber}</p>
        <div className="cards-admin-buttons">
          {/* {user?.role === "admin" && (
            <button
              className="btn update"
              onClick={() => {
                navigate(`/updateUser/${user.id}`);
              }}
            >
              ✎
            </button>
          )} */}

          {userRole === "Admin" ||
            (userRole === "Employee" && (
              <button
                className="btn delete"
                onClick={() => {
                  setDeleteUser(DeleteUser({ id: user.id, navigate }));
                }}
              >
                🗑
              </button>
            ))}

          {userRole === "Admin" ||
            (userRole === "Employee" && (
              <>
                <select
                  name="role"
                  // id={`role-select-${user.id}`}
                  onChange={handleSelectChange}
                  // value={selectedRole}
                >
                  <option value="" selected disabled>
                    Cambiar rol
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Employee">Empleado</option>
                  <option value="Client">Cliente</option>
                </select>

                {isAdressRequired && (
                  <>
                    <input
                      type="text"
                      placeholder="Nueva Dirección (requerido)"
                      value={newAdress}
                      onChange={(e) => setNewAdress(e.target.value)}
                      className="form-control mt-2"
                    />
                    <button
                      className="btn btn-success mt-2"
                      onClick={handleRoleChange}
                      disabled={user.role === selectedRole}
                    >
                      Confirmar Rol
                    </button>
                  </>
                )}
                {(!isAdressRequired || selectedRole === "Client") &&
                  user.role !== selectedRole && (
                    <button
                      className="btn btn-primary mt-2"
                      onClick={handleRoleChange}
                    >
                      Cambiar Rol
                    </button>
                  )}
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CardUser;
