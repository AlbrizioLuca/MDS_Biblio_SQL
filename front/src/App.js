import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./pages/Connexion";
import Admin from "./pages/Utilisateurs";
import Livres from "./pages/Livres";
import Abonnes from "./pages/Abonnes";
import Fiche from "./pages/Fiche_Abonne";

import Navbar from "./components/Navbar";
import Logout from "./pages/Deconnexion";

import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Connexion />} />
            <Route element={<Navbar />}>
              <Route path="admin" element={<Admin />}></Route>
              <Route path="livres" element={<Livres />}></Route>
              <Route path="abonnes" element={<Abonnes />}></Route>
              <Route path="fiche-abonne/:id" element={<Fiche />}></Route>
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="*" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}
