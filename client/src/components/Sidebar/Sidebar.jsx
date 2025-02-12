import { useState } from "react";
import { FaUser, FaBars } from "react-icons/fa";
import { FaBook } from "react-icons/fa";
import { CiCreditCard2 } from "react-icons/ci";
import { MdArticle } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Nút mở Sidebar */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md"
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-slate-500 text-white transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 text-xl font-bold border-b border-gray-700 flex justify-between items-center mt-10">
          Manager
          <button onClick={toggleSidebar} className="text-gray-300">
            ✖
          </button>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center p-4 hover:bg-gray-700">
            <FaUser className="mr-3" /> User
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-700">
            <FaBook className="mr-3" /> Book
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-700">
            <CiCreditCard2 className="mr-3" /> Borrow and return books
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-700">
            <MdArticle className="mr-3" /> Article
          </a>
          <a href="#" className="flex items-center p-4 hover:bg-gray-700">
            <IoChatbox className="mr-3" /> Opinion
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
