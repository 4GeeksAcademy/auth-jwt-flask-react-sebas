// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react"

export const Dashboard = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const token = store.login_data?.jwt_token;
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "logout" });
    console.log("Cerrando sesión")
    navigate("/login");
  };


  const dataPrivate = async () => {
    try {
      const reps = await fetch(`https://musical-broccoli-xj9xx66ggvq26x4v-3001.app.github.dev/api/private`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        }
      }
      );

      if (reps.ok) {
        console.log("Acceso a sitio privado");
        const data = await reps.json();
        console.log(data);
      }
    } catch (error) {
      console.error("Error accediendo al sitio privado :", error)
    }
  }

  useEffect(() => {

    if (token) {
      dataPrivate();
    } else {
      navigate("/login")
    }

  }, [token])

  return (
    <div className="container">

      <div className="row mb-3">
        <div className="col text-center">
          <h1>ÁREA PRIVADA</h1>
        </div>
      </div>

      <div className="row">
        <div className="col-auto gap-3 d-flex justify-content-start">
          <Link to="/">
            <button className="btn btn-primary">Atrás</button>
          </Link>
          <button className="btn btn-danger" onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>

    </div>
  );
};
