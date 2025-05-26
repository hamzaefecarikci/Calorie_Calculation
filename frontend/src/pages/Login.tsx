import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ Hook burada çağrılmalı (component gövdesinde)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      const data = await res.json();
      login(data); // ✅ context login fonksiyonu çağrılıyor
      navigate("/meals");

    } catch (err: any) {
      setMessage(err.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">Giriş Yap</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">E-posta</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Giriş Yap
          </button>

          <p className="text-sm mt-4 text-center">
            Hesabınız yok mu?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">Kayıt Ol</Link>
          </p>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-red-600 font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
