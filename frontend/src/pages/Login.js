import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setMsg("All fields required ");
            return;
        }

        try {
            setLoading(true);

            const res = await loginUser(form);

            login({
                user: res.user,
                token: res.token
            });

            localStorage.setItem("token", res.token);

            setMsg("Login Successful ");

        } catch (err) {
            setMsg(err?.response?.data?.message || "Invalid Credentials ");
        } finally {
            setLoading(false);
        }
    };

    return  (
        <div className="auth-page">

            <div className="auth-card">

                {/* LOGO / TITLE */}
                <div className="auth-header">
                    <div className="auth-logo"></div>
                    <h2>StockPro</h2>
                    <p>Inventory Management System</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            name="email"
                            placeholder="Enter your email"
                            onChange={handleChange}
                            value={form.email}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={handleChange}
                            value={form.password}
                        />
                    </div>

                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* MESSAGE */}
                {msg && <p className="auth-message">{msg}</p>}

            </div>

        </div>
    );

};

export default Login;