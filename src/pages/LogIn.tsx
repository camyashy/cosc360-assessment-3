import React, { useState } from 'react';
import { api } from "../api/http";
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import type { ApiResponse } from '../types/Api';
import type { LoginResponse } from '../types/LoginResponse';
import { useAuth } from '../context/AuthContext';

// Fix CSS with password/email input
// Do I need the set username and id stuff?

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    //Hold the form input values
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    //Handle loading and errors
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const response: ApiResponse<LoginResponse> = await api.post("/login", { email, password });

            if (response.success) {
                const { token, name, id } = response.data;
                localStorage.setItem("token", token);

                login({ user_name: name, user_id: id });

                navigate(`/post/dashboard/${id}`);
            } else {
                throw new Error(response.message);
            }

        } catch (err: any) {
            setError(err.message || "Login Failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>

            <div className="text-center vh-100">
                <form onSubmit={handleSubmit}>

                    <h2 className="font-semibold mb-6 mt-6 pt-5 pb-3 text-center">Login</h2>

                    {error && <Alert variant="danger" className="text-center p-3">{error}</Alert>}

                    <div className="mb-4">
                        <label className="p-3">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                            className="input-field-login" />
                    </div>

                    <div className="mb-3 p-2">
                        <label className="p-2">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="input-field-login" />
                    </div>

                    <button type="submit" disabled={loading} className="btn bg-primary my-3">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>

    );

}

