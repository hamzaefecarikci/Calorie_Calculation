import React, { useState } from "react";

const CalorieResult: React.FC = () => {
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
    activityLevel: "",
  });

  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult("");

    try {
      const res = await fetch("http://localhost:8080/api/users/calories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight),
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const message = await res.text();
      setResult(message);
    } catch (err: any) {
      setError(err.message || "Hesaplama hatası");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-md rounded-xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-700">Kalori İhtiyacı Hesapla</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: "age", label: "Yaş", type: "number" },
            { name: "height", label: "Boy (cm)", type: "number" },
            { name: "weight", label: "Kilo (kg)", type: "number" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cinsiyet</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
              <option value="">Seçiniz</option>
              <option value="male">Erkek</option>
              <option value="female">Kadın</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Aktivite Seviyesi</label>
            <select
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm px-4 py-3 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            >
              <option value="">Seçiniz</option>
              <option value="low">Düşük</option>
              <option value="moderate">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition"
          >
            Hesapla
          </button>
        </form>

        {result && <p className="mt-6 text-green-700 font-semibold text-center">{result}</p>}
        {error && <p className="mt-6 text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default CalorieResult;
