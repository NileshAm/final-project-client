import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import About from "./Pages/About/About";
import CheckAdminLogin from "./Components/CheckAdminLogin/CheckAdminLogin";

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
        <Route path="/admin/login" element={<h1>Admin login</h1>} />
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
