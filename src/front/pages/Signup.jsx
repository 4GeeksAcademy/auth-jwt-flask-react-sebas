// Import necessary components from react-router-dom and other parts of the application.
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";  // Custom hook for accessing the global state.
import { useEffect, useState } from "react"

export const Signup = () => {
  // Access the global state and dispatch function using the useGlobalReducer hook.
  const { store, dispatch } = useGlobalReducer();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupMessage, setSignupMessage] = useState(null);

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const reps = await fetch(`https://musical-broccoli-xj9xx66ggvq26x4v-3001.app.github.dev/api/signup`,
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
        const data = await reps.json();
        setSignupMessage({ type: "success", text: data.msg || "Registro éxitoso" })
        console.log("Registro éxitoso")
      } else {
        const errorData = await reps.json()
        setSignupMessage({ type: "error", text: errorData.msg || "Error registrando" })
        console.log("Error registrando")
      }

    } catch (error) {
      console.error("Error en la solicitud: ", error)
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

      {signupMessage && (
        <div
          className={`alert ${signupMessage.type === "success" ? "alert-success" : "alert-danger"}`}
          role="alert"
        >
          {signupMessage.text}
        </div>
      )}

      <form className="w-50 text-center mx-auto p-3 my-5 border border-secondary-subtle rounded">
        <h1 className="text-center" >Signup</h1>
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputEmail1" className="form-label">Nuevo correo</label>
          <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={handleInputEmail}></input>
          <div id="emailHelp" className="form-text">Escribe tu email para registrarte</div>
        </div>
        <div className="mb-3 text-start">
          <label htmlFor="exampleInputPassword1" className="form-label">Nueva contraseña</label>
          <input type="text" name="password" className="form-control" aria-describedby="passwordHelp" value={password} onChange={handleInputPassword}></input>
          <div id="passwordHelp" className="form-text">Escribe tu contraseña de registro</div>
        </div>
        <button className="btn btn-primary mb-3" onClick={handleLogin}>Signup</button>
      </form>
      <div className="border-top border-primary pt-3">
        <Link to="/">
          <button className="btn btn-primary">Atrás</button>
        </Link>
      </div>
    </div>
  );
};
