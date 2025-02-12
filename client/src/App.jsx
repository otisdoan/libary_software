import Sidebar from "./components/Sidebar/Sidebar"; // Đảm bảo đường dẫn đúng
import HeaderAdmin from "./components/Header/HeaderAdmin"; // Đảm bảo đường dẫn đúng


function App() {
  return (
    <>
      <HeaderAdmin />
      {/* <Dashboard /> */}
      <Sidebar />
    </>
  );
}

export default App;
