import { useNavigate } from "react-router-dom";
import DeleteUser from "./DeleteUser";
import { useState } from "react";
import toast from "react-hot-toast";
import "./CardUser.css";

const CardUser = ({ user, setDeleteUser, setRoleChange }) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(user.role);
  const [newAdress, setNewAdress] = useState("");

  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const token = localStorage.getItem("RucaMeu-token");
  const userRole = localStorage.getItem("user_role");
  const userId = parseInt(localStorage.getItem("user_id"));
  console.log(userId);

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
      if (
        changeRolDTO.Id === 1 ||
        changeRolDTO.Id === 2 ||
        changeRolDTO.Id === 3
      ) {
        toast.error("Los superAdmins no se pueden modificar");
      } else {
        toast.error("Error al cambiar el rol");
      }
      console.error("Error al cambiar el rol:", error.message);
    }
  };

  return (
    // Reemplazado 'card' por 'admin-card-base' y el style inline
    <div className="admin-card-base" style={{ width: "18rem" }}>
      {/* Reemplazado 'card-body' por 'admin-card-body' */}
      <div className="admin-card-body">
        {/* Reemplazado 'card-title' por 'admin-card-title' */}
        <h5 className="admin-card-title">{user.fullName}</h5>
        {/* Reemplazado 'card-text' por 'admin-card-role' */}
        <p className="admin-card-role">{user.role}</p>
        {/* Reemplazado 'card-text' por 'admin-card-phone' */}
        <p className="admin-card-phone">{user.phoneNumber}</p>

        {/* Contenedor de botones (ya era personalizado) */}
        <div className="cards-admin-buttons">
          {/* Botón de Eliminar */}
          {userRole === "Admin" && (
            // Reemplazado 'btn delete' por 'admin-btn-delete'
            <button
              className="admin-btn admin-btn-delete"
              onClick={() => {
                setDeleteUser(DeleteUser({ id: user.id, navigate }));
              }}
            >
              🗑
            </button>
          )}

          {/* Controles de Cambio de Rol */}
          {userRole === "Admin" && (
            <>
              {/* SELECT para cambiar rol */}
              <select
                name="role"
                onChange={handleSelectChange}
                // Agregado clase personalizada al select
                className="admin-role-select"
              >
                <option value="" selected disabled>
                  Cambiar rol
                </option>
                <option value="Admin">Admin</option>
                <option value="Employee">Empleado</option>
                <option value="Client">Cliente</option>
              </select>

              {/* Input de Dirección y Botón de Confirmar (condicionales) */}
              {isAdressRequired && (
                <>
                  {/* INPUT de Dirección (form-control mt-2) */}
                  <input
                    type="text"
                    placeholder="Nueva Dirección (requerido)"
                    value={newAdress}
                    onChange={(e) => setNewAdress(e.target.value)}
                    // Reemplazado 'form-control mt-2' por 'admin-input-address'
                    className="admin-input-address"
                  />

                  {/* Botón de Confirmar Rol (btn btn-success mt-2) */}
                  <button
                    // Reemplazado 'btn btn-success mt-2' por 'admin-btn-confirm'
                    className="admin-btn admin-btn-confirm"
                    onClick={handleRoleChange}
                    disabled={user.role === selectedRole}
                  >
                    Confirmar Rol
                  </button>
                </>
              )}

              {/* Botón de Cambiar Rol simple (btn btn-primary mt-2) */}
              {(!isAdressRequired || selectedRole === "Client") &&
                user.role !== selectedRole && (
                  <button
                    // Reemplazado 'btn btn-primary mt-2' por 'admin-btn-change-role'
                    className="admin-btn admin-btn-change-role"
                    onClick={handleRoleChange}
                  >
                    Cambiar Rol
                  </button>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardUser;
