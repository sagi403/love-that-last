import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import { autoLogin } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, loadingAutoLogin } = useSelector(state => state.user);

  useEffect(() => {
    if (!userInfo) {
      dispatch(autoLogin());
    }
  }, []);

  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/products" element={<AllProductsScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
