import { useState } from "react";
import Navbar from "../../components/Header/HeaderAdmin";
import LayoutAdmin from "../../components/LayoutAdmin/LayoutAdmin";
import Footer from "../../components/Footer/footer";
import SidebarAdmin from "../../components/SIdebarAdmin/SidebarAdmin"; // Thêm import SidebarAdmin

function HomeAdmin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex">
      <SidebarAdmin
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex-1">
        <Navbar />
        <LayoutAdmin />
        <Footer />
      </div>
    </div>
  );
}

export default HomeAdmin;
