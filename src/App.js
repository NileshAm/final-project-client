import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import CheckAdminLogin from "./Components/CheckAdminLogin/CheckAdminLogin";
import ProductView from "./Pages/ProductView/ProductView";


function App() {
  return (
    // TODO : change all h1 tags with components 
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/product" element={<ProductView />} />
        <Route path="/cart" element={<h1>cart</h1>} />                  
        <Route path="/search" element={<h1>search</h1>} />
        <Route path="/login" element={<h1>Login</h1>} />
        <Route path="/admin/login" element={<h1>Admin login</h1>} />
        <Route path="/admin" element={<CheckAdminLogin />}>
          <Route index element={<h1>Admin home</h1>} />
          <Route path="add" element={<h1>add</h1>} />
          <Route path="update" element={<h1>update</h1>} />
          <Route path="reserved" element={<h1>reservation state</h1>} />
        </Route>
        <Route path="*" element={<h1>NotFound</h1>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
