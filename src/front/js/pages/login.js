import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = () => {
        const opts = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Origin': 'https://fictional-carnival-6995rg77w4p4257gx-3000.app.github.dev'
                
            },
            body: JSON.stringify({
                "email": email,
                "password": password
            })
        }
        fetch('https://fictional-carnival-6995rg77w4p4257gx-3001.app.github.dev/api/token', opts)
            .then(resp => {
                if(resp.status === 200) return resp.json();
                else alert("There has been some error");
            })
            .then(data => {
                // Manejar la respuesta exitosa aquí
                console.log(data); // Por ejemplo, mostrar la respuesta en la consola
                // Aquí puedes redirigir al usuario a otra página si es necesario
            })
            .catch(error => {
                console.error("There was an error!!!!", error)
            })
    }
	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
                <input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
		</div>
	);
};
