import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/loginScreen/LoginScreen";

import OrderScreen from "./screens/orderScreen/OrderScreen";
import useSessionStorage from "./utils/hooks";
import ProductsScreen from "./screens/productsScreen/ProductsScreen";
function App() {
  const [user, setUser] = useSessionStorage("user", {});

  console.log(user);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen setUser={setUser} />} />
          <Route path="/your-orders" element={<OrderScreen user={user} />} />
          <Route path="/products" element={<ProductsScreen user={user} />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
