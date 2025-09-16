// Import necessary components from react-router-dom and other parts of the application.
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react"

export const Login = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const reps = await fetch(`https://musical-broccoli-xj9xx66ggvq26x4v-3001.app.github.dev/api/token`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            is_active: true
          })
        })

      if (reps.ok) {
        console.log("Inicio de sesión éxitosa");

        const data = await reps.json();
        dispatch({ type: "login_data", payload: { email: data.email, jwt_token: data.token } });

        navigate("/dashboard");

      } else {
        console.log("Error iniciando sesión");
      }

    } catch (error) {
      console.error("Error en la solicitud: ", error);
    }
  }

  const handleInputEmail = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const handleInputPassword = (e) => {
    const { name, value } = e.target;
    setPassword(value);
  };


  return (
    <div className="container">

      <form className="w-50 text-center mx-auto p-3 my-5 border border-secondary-subtle rounded">
        <h1 className="text-center" >Login</h1>
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputEmail1" className="form-label">Ingresar correo</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleInputEmail}></input>
          <div id="emailHelp" className="form-text">Escribe tu email registrado</div>
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputPassword1" className="form-label">Ingresar contraseña</label>
          <input type="text" name="password" className="form-control" aria-describedby="passwordHelp" value={password} onChange={handleInputPassword}></input>
          <div id="passwordHelp" className="form-text">Escribe tu contraseña registrada</div>
        </div>
        <button className="btn btn-success mb-3" onClick={handleLogin}>Login</button>
      </form>
      <div className="border-top border-primary pt-3">
        <Link to="/">
          <button className="btn btn-primary">Atrás</button>
        </Link>
      </div>
    </div>
  );
};
