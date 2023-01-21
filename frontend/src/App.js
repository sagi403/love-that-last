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
import UserListScreen from "./screens/UserListScreen";
import NotFoundScreen from "./screens/NotFoundScreen";
import RequireAdminAuth from "./components/RequireAdminAuth";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import ShippingPolicyScreen from "./screens/ShippingPolicyScreen";
import RefundPolicyScreen from "./screens/RefundPolicyScreen";
import FaqsScreen from "./screens/FaqsScreen";
import TermsOfServiceScreen from "./screens/TermsOfServiceScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import PrivacyPolicyScreen from "./screens/PrivacyPolicyScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import ThankYouContactScreen from "./screens/ThankYouContactScreen";
import ThankYouNewsletterScreen from "./screens/ThankYouNewsletterScreen";
import RequireMessageAuth from "./components/RequireMessageAuth";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import ResetPasswordAuth from "./components/ResetPasswordAuth";
import { getPaypalClientId } from "./store/paypalSlice";

const App = () => {
  const dispatch = useDispatch();

  const { userInfo, loadingAutoLogin, loggedIn } = useSelector(
    state => state.user
  );
  const { paypalId, loadingClient } = useSelector(state => state.paypal);

  useEffect(() => {
    dispatch(getPaypalClientId());
  }, []);

  useEffect(() => {
    if (!userInfo) {
      dispatch(autoLogin());
    }
  }, [loggedIn]);

  return (
    !loadingAutoLogin &&
    !loadingClient && (
      <PayPalScriptProvider
        deferLoading={true}
        options={{ "client-id": paypalId }}
      >
        <Router>
          <Header />
          <main className="py-3">
            <Routes>
              <Route element={<RequireMessageAuth />}>
                <Route
                  path="/thank-you-newsletter"
                  element={<ThankYouNewsletterScreen />}
                />
                <Route path="/thank-you" element={<ThankYouContactScreen />} />
              </Route>
              <Route element={<RequireAuth />}>
                <Route element={<RequireAdminAuth />}>
                  <Route
                    path="/admin/orderlist"
                    element={<OrderListScreen />}
                  />
                  <Route
                    path="/admin/productlist"
                    element={<ProductListScreen />}
                  />
                  <Route
                    path="/admin/product/:id/edit"
                    element={<ProductEditScreen />}
                  />
                  <Route path="/admin/userlist" element={<UserListScreen />} />
                  <Route
                    path="/admin/user/:id/edit"
                    element={<UserEditScreen />}
                  />
                </Route>
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/order/:id" element={<OrderScreen />} />
                <Route path="/place-order" element={<PlaceOrderScreen />} />
                <Route path="/payment" element={<PaymentScreen />} />
                <Route path="/shipping" element={<ShippingScreen />} />
              </Route>
              <Route path="/cart/:id" element={<CartScreen />} />
              <Route path="/cart" element={<CartScreen />} />
              <Route path="/products" element={<AllProductsScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route element={<ResetPasswordAuth />}>
                <Route
                  path="/reset-password/:id/:token"
                  element={<ResetPasswordScreen />}
                />
              </Route>
              <Route
                path="/forgot-password"
                element={<ForgotPasswordScreen />}
              />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
              <Route path="/contact-us" element={<ContactUsScreen />} />
              <Route path="/about-us" element={<AboutUsScreen />} />
              <Route
                path="/terms-of-service"
                element={<TermsOfServiceScreen />}
              />
              <Route path="/faqs" element={<FaqsScreen />} />
              <Route path="/refund-policy" element={<RefundPolicyScreen />} />
              <Route
                path="/shipping-policy"
                element={<ShippingPolicyScreen />}
              />
              <Route path="/" element={<HomeScreen />} />
              <Route path="*" element={<NotFoundScreen />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </PayPalScriptProvider>
    )
  );
};

export default App;
