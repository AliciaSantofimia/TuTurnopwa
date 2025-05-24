import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Portada from "./Portada.jsx";
import Login from "./Login.jsx";
import Registro from "./Registro.jsx";
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
import GaleriaTarjetasRegalo from "./GaleriaTarjetasRegalo.jsx";
import DetalleTarjeta2Clases from "./DetalleTarjeta2Clases.jsx";
import DetalleTarjeta4Clases from "./DetalleTarjeta4Clases.jsx";
import DetalleTarjetaCreaTuPiezaFavorita from "./DetalleTarjetaCreaTuPiezaFavorita.jsx";
import DetalleTarjetaPintaTuPieza from "./DetalleTarjetaPintaTuPieza.jsx";
import DetalleTarjetaTornoIntensivo from "./DetalleTarjetaTornoIntensivo.jsx";
import FuncionamientoTarjetaRegalo from "./FuncionamientoTarjetaRegalo.jsx";
import ResumenPago from "./ResumenPago.jsx";
import FormularioRedsys from "./FormularioRedsys.jsx";
import PagoFallido from "./PagoFallido.jsx";
import AdminGestionClases from "./AdminGestionClases.jsx";
import AdminGestionUsuarios from "./AdminGestionUsuarios.jsx";
import AdminGestionReservas from "./AdminGestionReservas.jsx";
import AdminNotificaciones from "./AdminNotificaciones.jsx";
import AdminPanel from "./AdminPanel.jsx";
import AdminHistoriales from "./AdminHistoriales.jsx";
import AdminHistorialReservas from "./AdminHistorialReservas.jsx";
import AdminHistorialBonos from "./AdminHistorialBonos.jsx";
import ExpresContinuo from "./ExpresContinuo.jsx";
import ReservaExpresContinuo from "./ReservaExpresContinuo.jsx";
import AdminEnviarAviso from "./AdminEnviarAviso.jsx";
import PoliticaCancelacion from "./PoliticaCancelacion.jsx";
import CondicionesUso from " ./CondicionesUso.jsx";







function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/portada" />} />
        <Route path="/portada" element={<Portada />} />
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
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/historiales" element={<AdminHistoriales />} />
        <Route path="/admin/historial/reservas" element={<AdminHistorialReservas />} />
        <Route path="/admin/historial/bonos" element={<AdminHistorialBonos />} />
        <Route path="/exprescontinuo" element={<ExpresContinuo />} />
        <Route path="/reserva-exprescontinuo" element={<ReservaExpresContinuo />} />
        <Route path="/tarjeta-regalo" element={<GaleriaTarjetasRegalo />} />
        <Route path="/tarjeta-regalo/funciona" element={<FuncionamientoTarjetaRegalo />} />
        <Route path="/tarjeta-regalo/2clases" element={<DetalleTarjeta2Clases />} />
        <Route path="/tarjeta-regalo/4clases" element={<DetalleTarjeta4Clases />} />
        <Route path="/tarjeta-regalo/pintatupieza" element={<DetalleTarjetaPintaTuPieza />} />
        <Route path="/tarjeta-regalo/creapiezafavorita" element={<DetalleTarjetaCreaTuPiezaFavorita />} />
        <Route path="/tarjeta-regalo/tornointensivo" element={<DetalleTarjetaTornoIntensivo />} />
        <Route path="/resumen-pago" element={<ResumenPago />} />
        <Route path="/pago-redsys" element={<FormularioRedsys />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />
        <Route path="/admin/clases" element={<AdminGestionClases />} />
        <Route path="/admin/usuarios" element={<AdminGestionUsuarios />} />
        <Route path="/admin/reservas" element={<AdminGestionReservas />} />
        <Route path="/admin/notificaciones" element={<AdminNotificaciones />} />
        <Route path="/admin/usuarios/aviso/:id" element={<AdminEnviarAviso />} />
        <Route path= "/politicacancelacion" elment= {<PoliticaCancelacion />} />
        <Route path= "/condicionesuso" element= {<CondicionesUso />} />




        {/* Puedes añadir también /login y /registro más adelante */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
