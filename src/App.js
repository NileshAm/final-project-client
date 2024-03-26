import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "Pages/HomePage/HomePage";
import About from "Pages/About/About";
import CheckAdminLogin from "Components/CheckAdminLogin/CheckAdminLogin";
import AdminLogin from "Pages/AdminLogin/AdminLogin";
import SignUp from "Pages/SignUp/SignUp";
import AddProduct from "Pages/AddProduct/AddProduct";

function App() {
  return (
    // TODO : change all h1 tags with components 
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<h1>cart</h1>} />                  
        <Route path="/search" element={<h1>search</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin" element={<CheckAdminLogin />}>
          <Route index element={<h1>Admin home</h1>} />
          <Route path="edit" element={<h1>edit</h1>} />
        </Route>
          <Route path="/admin/add" element={<AddProduct/>} />
        <Route path="*" element={<h1>NotFound</h1>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
