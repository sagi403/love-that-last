import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
