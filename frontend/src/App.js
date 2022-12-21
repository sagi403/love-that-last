import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <div>My app</div>;
    </Router>
  );
};

export default App;
