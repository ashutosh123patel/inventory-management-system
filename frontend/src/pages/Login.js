import React, { useState } from "react";
import { loginUser } from "../services/authServices";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setMsg("All fields required ❌");
            return;
        }

        try {
            const res = await loginUser(form);
            const token = res.data.token;

            localStorage.setItem("token", token);
            setMsg("Login Successful ✅");
        } catch {
            setMsg("Invalid Credentials ❌");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button className="button" type="submit">
                        Login
                    </button>
                </form>

                <p className="message">{msg}</p>
            </div>
        </div>
    );
};

export default Login;