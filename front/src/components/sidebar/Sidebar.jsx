'use client';
import { Sidebar } from "flowbite-react";
import { NavLink } from "react-router-dom";

import { sidebarItems } from "../../config";

export const Navbar = () => {
  return (
    <aside className="bg-slate-400 min-h-screen py-10 px-5">
    <h1 className="text-3xl text-center">Tkti  qo'shma <br /> ta'lim</h1>
    {/* <ul className="mt-10">
      {sidebarItems.map((item) => (
        <li key={item.name}>
          <NavLink to={item.link} className="flex gap-4 py-3 px-4 rounded-lg">
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </NavLink>
        </li>
      ))}
    </ul> */}

    <button
      className="text-red-600 flex mt-10 ml-4"
      onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}
    >
      Chiqish
    </button>
  </aside>
  );
};
