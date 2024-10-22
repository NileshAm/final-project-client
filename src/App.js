import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import CheckAdminLogin from "./Components/CheckAdminLogin/CheckAdminLogin";
import ProductView from "./Pages/ProductView/ProductView";


import AdminLogin from "./Pages/AdminLogin/AdminLogin";
import SignUp from "./Pages/SignUp/SignUp";
import AddProduct from "./Pages/AddProduct/AddProduct";

import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import HeaderFooter from "./Components/HeaderFooter/HeaderFooter";
import Search from "./Pages/Search/Search";
import AdminHome from "./Pages/AdminHome/AdminHome";
import AdminUpdate from "./Pages/AdminUpdate/AdminUpdate";
import AdminApprove from "Pages/AdminApprove/AdminApprove";
import AdminPickup from "Pages/AdminPickup/AdminPickup";
import Info from "Pages/Info/Info";
import NotFound from "Pages/NotFound/NotFound";
import AdminBrandCategory from "./Pages/AdminBrandCategory/AdminBrandCategory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />

          <Route path="/" element={<HeaderFooter />}>
            <Route path="home" element={<Navigate to={"/"} />} />
            <Route index element={<HomePage />} />
            <Route path="about" element={<About />} />
            <Route path="cart" element={<Cart />} />
            <Route path="info" element={<Info />} />
            <Route path="search" element={<Search />} />
            <Route
              path="product/:id"
              element={<ProductView key={window.location.pathname} />}
            />
            <Route path="about" element={<About/>} />
          </Route>

          <Route path="/checkout/:method/:state" element={<Checkout />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={<CheckAdminLogin />}>
            <Route index element={<AdminHome />} />
            <Route path="add" element={<AddProduct />} />
            <Route path="update" element={<AdminUpdate />} />
            <Route path="approve" element={<AdminApprove />} />
            <Route path="pickup" element={<AdminPickup />} />
            <Route path="add/others" element={<AdminBrandCategory/>} />
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
