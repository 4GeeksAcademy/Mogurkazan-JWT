import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const SignUp = async(email, password) => {
        try {
            const response = await fetch('https://fictional-carnival-6995rg77w4p4257gx-3001.app.github.dev/api/signup', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    is_active: true
                })
            });
            if (!response.ok) {
                throw new Error('Error en la solicitud de signup');
            }
            return response.json();
        } catch (error) {
            console.error('Error en SignUp:', error);
            throw error;
        }
    }
    const handleClick = async () => {
        try {
            const data = await SignUp(email, password);
            console.log(data); // Aquí puedes manejar la respuesta de la solicitud
        } catch (error) {
            console.error('Error en SignUp:', error);
        }
    }
	return (
		<div className="text-center mt-5">
			<h1>Signup</h1>
			<div>
                <input type="text" placeholder="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button onClick={handleClick}>Login</button>
            </div>
		</div>
	);
};
