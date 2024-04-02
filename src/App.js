import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import CheckAdminLogin from "./Components/CheckAdminLogin/CheckAdminLogin";

import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import SignUp from "./Pages/SignUp/SignUp";

import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import HeaderFooter from "./Components/HeaderFooter/HeaderFooter";
import Search from "./Pages/Search/Search";


function App() {
  return (
    // TODO : change all h1 tags with components
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<HeaderFooter />}>

            <Route path="home" element={<Navigate to={"/"} />} />
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<h1>Login</h1>} />
          </Route>

          <Route path="/checkout/:method/:state" element={<Checkout/>} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<CheckAdminLogin />}>
            <Route index element={<h1>Admin home</h1>} />
            <Route path="edit" element={<h1>edit</h1>} />
          </Route>
          <Route path="*" element={<h1>NotFound</h1>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
