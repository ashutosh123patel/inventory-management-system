import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

const Register = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.password) {
            setMsg("All fields required ");
            return;
        }

        try {
            setLoading(true);

            await registerUser(form);

            setMsg("Registration Successful ");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setMsg(typeof err === "string" ? err : "Registration Failed ");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* HEADER */}
                <div className="auth-header">
                    <div className="auth-logo"></div>
                    <h2>Create Account</h2>
                    <p>Join StockPro to manage your inventory</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            name="name"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={form.name}
                        />
                    </div>

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
                            placeholder="Create a password"
                            onChange={handleChange}
                            value={form.password}
                        />
                    </div>

                    {/* ROLE */}
                    <div className="form-group">
                        <label>Role</label>
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button className="auth-btn" type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                {/* MESSAGE */}
                {msg && <p className="auth-message">{msg}</p>}

                {/* FOOTER */}
                <p className="auth-footer">
                    Already have an account? <span onClick={() => navigate("/login")}>Login</span>
                </p>

            </div>

        </div>
    );

};

export default Register;