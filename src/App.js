import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import CalonSiswa from "./pages/CalonSiswa";
import Dashboard from "./pages/Dashboard";
import AddCalonSiswa from "./pages/AddCalonSiswa";
import EditCalonSiswa from "./pages/EditCalonSiswa";
import Berkas from "./pages/Berkas";
import AddBerkas from "./pages/AddBerkas";
import Admin from "./pages/Admin";
import AddAdmin from "./pages/AddAdmin";
import EditAdmin from "./pages/EditAdmin";
import VerifBerkas from "./pages/VerifBerkas";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/calonsiswa" element={<CalonSiswa />} />
        <Route path="/add-calonsiswa" element={<AddCalonSiswa />} />
        <Route path="/edit-calonsiswa/:id" element={<EditCalonSiswa />} />
        <Route path="/berkas" element={<Berkas />} />
        <Route path="/add-berkas" element={<AddBerkas />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/edit-admin/:id" element={<EditAdmin />} />
        <Route path="/verifberkas" element={<VerifBerkas />} />
      </Routes>
    </Router>
  );
}

export default App;
