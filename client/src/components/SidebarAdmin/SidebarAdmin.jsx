import { FaHome, FaUser, FaCog } from "react-icons/fa";
import PropTypes from "prop-types";

const SidebarAdmin = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-orange-700 text-white transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-5 pt-16 text-xl font-bold border-b border-gray-700">
        Menu
        <button onClick={onToggle} className="ml-4 text-gray-300">
          Toggle
        </button>
      </div>
      <nav className="mt-4">
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <FaHome className="mr-3" /> Home
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <FaUser className="mr-3" /> Profile
        </a>
        <a href="#" className="flex items-center p-4 hover:bg-gray-700">
          <FaCog className="mr-3" /> Settings
        </a>
      </nav>
    </div>
  );
};

SidebarAdmin.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default SidebarAdmin;
