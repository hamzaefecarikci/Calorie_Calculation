import React, { useState } from "react";

interface LoginFormData {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  // diğer alanlar varsa buraya ekleyebilirsin
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Giriş başarısız");
      }

      const data: User = await response.json();
      setUser(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Bilinmeyen hata");
      setUser(null);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Giriş Yap</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="E-posta"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Şifre"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Giriş Yap</button>
      </form>

      {user && <p>👋 Hoş geldin, {user.name}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;