import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setMessage("");

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        age: Number(formData.age),
        height: Number(formData.height),
        weight: Number(formData.weight),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }

    setMessage("✅ Kayıt başarılı! Yönlendiriliyorsunuz...");
    
    // ⏱️ Küçük bir gecikme ile yönlendirme (isteğe bağlı)
    setTimeout(() => {
      navigate("/login");
    }, 1000);

  } catch (err: any) {
    setMessage(err.message || "Bir hata oluştu.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center py-12">
      <div className="bg-white shadow-lg rounded-xl px-10 py-12 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-8">Kayıt Ol</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
          {/* İsim */}
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

          {/* E-posta */}
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

          {/* Şifre */}
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

          {/* Yaş, boy, kilo */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Yaş", name: "age" },
              { label: "Boy (cm)", name: "height" },
              { label: "Kilo (kg)", name: "weight" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
                />
              </div>
            ))}
          </div>

          {/* Cinsiyet */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cinsiyet</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            >
              <option value="">Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>

          {/* Aktivite Seviyesi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aktivite Seviyesi</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
              className="w-full rounded-md border-gray-300 px-4 py-3 shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-500"
            >
              <option value="">Seçiniz</option>
              <option value="low">Düşük</option>
              <option value="moderate">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          {/* Buton */}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-md font-semibold hover:bg-pink-700 transition"
          >
            Kayıt Ol
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center text-sm text-green-700 font-medium">
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