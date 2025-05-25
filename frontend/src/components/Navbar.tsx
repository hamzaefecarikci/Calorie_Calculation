import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkStyle =
    "px-4 py-2 rounded-md text-sm font-medium hover:bg-pink-100 transition";

  const activeStyle = "bg-pink-500 text-white";

  return (
    <nav className="bg-white shadow-sm p-4 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <span className="text-lg font-bold text-pink-600">Kalori Takip</span>
        <div className="flex space-x-4">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-pink-600"}`
            }
          >
            Giriş
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-pink-600"}`
            }
          >
            Kayıt
          </NavLink>
          <NavLink
            to="/calories"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-pink-600"}`
            }
          >
            Kalori Hesapla
          </NavLink>
          <NavLink
            to="/meals"
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : "text-pink-600"}`
            }
          >
            Yemek Takibi
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
