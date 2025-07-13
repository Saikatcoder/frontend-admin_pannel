import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../../../Frontend/src/assets/admin_assets/assets.js";

const Sidebar = () => {
  const navItems = [
    { to: "/add", icon: assets.add_icon, label: "Add Item" },
    { to: "/list", icon: assets.order_icon, label: "List Items" },
    { to: "/orders", icon: assets.order_icon, label: "Order Items" },
  ];

  return (
    <div className="w-[18%] min-h-screen bg-black border-r shadow-md text-white">
      <div className="flex flex-col gap-2 pt-6 text-[15px]">

        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition 
              ${isActive ? "bg-gray-800 text-green-400 font-semibold" : "hover:bg-gray-700"}`
            }
          >
            <img
              src={item.icon}
              alt=""
              className="w-5 h-5 filter invert brightness-0 saturate-100 hue-rotate-[90deg]"
            />
            <p className="hidden md:block">{item.label}</p>
          </NavLink>
        ))}

      </div>
    </div>
  );
};

export default Sidebar;
