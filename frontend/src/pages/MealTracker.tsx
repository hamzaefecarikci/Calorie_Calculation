import React, { useState, useEffect } from "react";

interface Meal {
  id?: number;
  name: string;
  calories: number;
}

const userId = 1; // Giriş sistemi tamamlandığında dinamik yapılabilir

const MealTracker: React.FC = () => {
  const [meal, setMeal] = useState<Meal>({ name: "", calories: 0 });
  const [meals, setMeals] = useState<Meal[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [message, setMessage] = useState<string | null>(null);
  const [editingMealId, setEditingMealId] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: name === "calories" ? Number(value) : value });
  };

  const fetchMeals = async () => {
    const res = await fetch(`http://localhost:8080/api/meals/all/${userId}`);
    const data = await res.json();
    setMeals(data);
  };

  const fetchTotalCalories = async () => {
    const res = await fetch(`http://localhost:8080/api/meals/today-total/${userId}`);
    const text = await res.text();
    const match = text.match(/\d+(\.\d+)?/);
    setTotalCalories(match ? parseFloat(match[0]) : 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/meals/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...meal, user: { id: userId } }),
    });

    if (response.ok) {
      setMessage("✅ Yemek eklendi");
      setMeal({ name: "", calories: 0 });
      fetchMeals();
      fetchTotalCalories();
    } else {
      setMessage("❌ Ekleme başarısız");
    }
  };

  const startEditing = (meal: Meal) => {
  setMeal(meal);
  setEditingMealId(meal.id || null);
};

const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingMealId) return;

  const response = await fetch(`http://localhost:8080/api/meals/update/${editingMealId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meal),
  });

  if (response.ok) {
    setMessage("✅ Yemek güncellendi");
    setMeal({ name: "", calories: 0 });
    setEditingMealId(null);
    fetchMeals();
    fetchTotalCalories();
  } else {
    setMessage("❌ Güncelleme başarısız");
  }
};


  const handleDelete = async (mealId?: number) => {
  if (!mealId) return;
  try {
    const res = await fetch(`http://localhost:8080/api/meals/delete/${mealId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessage("✅ Yemek silindi");
      fetchMeals();
      fetchTotalCalories();
    } else {
      setMessage("❌ Silme başarısız");
    }
  } catch {
    setMessage("❌ Silinirken hata oluştu");
  }
};


  useEffect(() => {
    fetchMeals();
    fetchTotalCalories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 flex items-start justify-center py-10">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">
          🍽️ Günlük Kalori Takibi
        </h2>

        <form onSubmit={editingMealId ? handleUpdate : handleSubmit} className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">Yemek Adı</label>
            <input
              name="name"
              value={meal.name}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-4 py-3 focus:border-yellow-500 focus:ring-yellow-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Kalori (kcal)</label>
            <input
              name="calories"
              type="number"
              value={meal.calories}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm px-4 py-3 focus:border-yellow-500 focus:ring-yellow-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 transition"
          >
            {editingMealId ? "Güncelle" : "Ekle"}
          </button>
        </form>


        {message && (
          <div className="mb-4 text-center font-medium text-green-700">{message}</div>
        )}

        <div className="text-lg font-semibold text-gray-800 mb-4 text-center">
          🔢 Bugünkü Toplam Kalori:{" "}
          <span className="text-yellow-600">{totalCalories} kcal</span>
        </div>

        <ul className="divide-y divide-gray-200">
          {meals.map((m) => (
            <li key={m.id} className="py-3 flex justify-between items-center text-sm text-gray-700">
              <div>
                <span className="font-medium">{m.name}</span> — {m.calories} kcal
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(m)}
                  className="text-blue-500 hover:text-blue-700"
                  title="Düzenle"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Sil"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealTracker;
