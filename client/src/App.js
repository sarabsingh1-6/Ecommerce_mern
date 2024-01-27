import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Policy } from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Regiter from "./pages/Auth/Regiter";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/User/Dashboard";
import PrivateRoute from "./components/Routes/Private";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Regiter />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
