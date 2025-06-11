// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // optional icon lib
import API_URL from '../../utils/ApiUrl';
import { FiMenu } from "react-icons/fi";
import { FaCube } from "react-icons/fa";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
    <div className={`transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-max'} overflow-hidden bg-base-100 shadow-lg`}>
        <div className="p-4">
            <button className="btn btn-ghost text-xl" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <FiMenu />
            </button>
          <ul className="menu">
            <li><a href={API_URL+'app/wedding-form'} className="flex flex-row hover:bg-gray-700 px-3 py-2 rounded"><FaCube />
            {isSidebarOpen && <span>List Wedding</span>}
          </a></li>
          </ul>
        </div>
      </div>

    </>
  );
};

export default Sidebar;
