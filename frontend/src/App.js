import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProductScreen from "./screens/ProductScreen";
import AllProductsScreen from "./screens/AllProductsScreen";
import CartScreen from "./screens/CartScreen";
import { autoLogin } from "./store/userSlice";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import RequireAuth from "./components/RequireAuth";
import OrderScreen from "./screens/OrderScreen";
import ProfileScreen from "./screens/ProfileScreen";

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, loadingAutoLogin, loggedIn } = useSelector(
    state => state.user
  );

  useEffect(() => {
    if (!userInfo) {
      dispatch(autoLogin());
    }
  }, [loggedIn]);

  return (
    !loadingAutoLogin && (
      <PayPalScriptProvider
        deferLoading={true}
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
        <Router>
          <Header />
          <main className="py-3">
            <Routes>
              <Route element={<RequireAuth />}>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
              </Route>
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/products" element={<AllProductsScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </PayPalScriptProvider>
    )
  );
};

export default App;
