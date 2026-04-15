import React, { useState } from "react";
import { registerUser } from "../services/authServices";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            setMsg("All fields required ❌");
            return;
        }

        try {
            await registerUser(form);
            setMsg("Registration Successful ✅");
        } catch {
            setMsg("Registration Failed ❌");
        }
    };

    return (
        <div className="container">
            <div className="card">
                <h2>Register</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        className="input"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                    />
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
                        Register
                    </button>
                </form>

                <p className="message">{msg}</p>
            </div>
        </div>
    );
};

export default Register;