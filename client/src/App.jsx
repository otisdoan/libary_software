
import { UserProvider } from './context/UserContext';
import AllRoutes from "./routes/AllRoutes";
import 'antd/dist/reset.css';

function App() {
  return (
    <UserProvider>
      <AllRoutes />
    </UserProvider>
  )
}

export default App; 