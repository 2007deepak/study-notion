
import './App.css'
import { Route,Routes } from 'react-router-dom';
import Home from "./pages/Home.jsx";
import Navbar from "./components/common/Navbar.jsx";
import Login  from "./pages/Login.jsx";
import Singup from "./pages/Signup.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";

function App() {


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/singup" element={<Singup />} /> 
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App
