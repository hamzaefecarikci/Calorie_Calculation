import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Şifreler eşleşmiyor.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      const data = await response.json();
      login(data);
      navigate("/meals");

    } catch (err: any) {
      setMessage(err.message || "Bir hata oluştu.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-xl px-10 py-12 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adınız</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Tekrar</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            Kayıt Ol
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center text-sm text-red-700 font-medium">
            {message}
          </div>
        )}

        <p className="text-sm mt-6 text-center">
          Zaten hesabınız var mı?{" "}
          <Link to="/login" className="text-pink-600 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
