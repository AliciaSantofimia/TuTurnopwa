import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portada from "./portada.jsx";
import Login from "./login.jsx";
import Registro from "./registro.jsx";
import Clases from "./Clases.jsx";
import EdicionPremium from "./EdicionPremium.jsx";
import ReservaEdicionPremium from "./ReservaEdicionPremium.jsx";
import PerfilUsuario from "./PerfilUsuario.jsx";
import CreativoPlus from "./CreativoPlus.jsx";
import BasicoEsencial from "./BasicoEsencial.jsx";
import PintarCeramica from "./PintarCeramica.jsx";
import FundamentalMini from "./FundamentalMini.jsx";
import MensualBono2Clases from "./MensualBono2Clases.jsx";
import MensualBono4Clases from "./MensualBono4Clases.jsx";
import ReservaPintarCeramica from "./ReservaPintarCeramica.jsx";
import ReservaCreativoPlus from "./ReservaCreativoPlus.jsx";
import ReservaBasicoEsencial from "./ReservaBasicoEsencial.jsx";
import ReservaBono4Clases from "./ReservaBono4Clases.jsx";
import ReservaBono2Clases from "./ReservaBono2Clases.jsx";
import ReservaFundamentalMini from "./ReservaFundamentalMini.jsx";
import Menu from "./Menu.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portada />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/edicion-premium" element={<EdicionPremium />} />
        <Route path="/reserva-edicion-premium" element={<ReservaEdicionPremium />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/creativo-plus" element={<CreativoPlus />} />
        <Route path="/basico-esencial" element={<BasicoEsencial />} />
        <Route path="/pintar-ceramica" element={<PintarCeramica />} />
        <Route path="/fundamental-mini" element={<FundamentalMini />} />
        <Route path="/bono-2-clases" element={<MensualBono2Clases />} />
        <Route path="/bono-4-clases" element={<MensualBono4Clases />} />
        <Route path="/reserva-pintar-ceramica" element={<ReservaPintarCeramica />} />
        <Route path="/reserva-creativo-plus" element={<ReservaCreativoPlus />} />
        <Route path="/reserva-basico-esencial" element={<ReservaBasicoEsencial />} />
        <Route path="/reserva-bono-4-clases" element={<ReservaBono4Clases />} />
        <Route path="/reserva-bono-2-clases" element={<ReservaBono2Clases />} />
        <Route path="/reserva-fundamental-mini" element={<ReservaFundamentalMini />} />
        <Route path="/menu" element={<Menu />} />




        {/* Puedes añadir también /login y /registro más adelante */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
