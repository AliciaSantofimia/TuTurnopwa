import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";

// Layout general
import AppLayout from "./AppLayout";

// Páginas principales
import Portada from "./Portada.jsx";
import Login from "./Login.jsx";
import Registro from "./Registro.jsx";
import Menu from "./Menu.jsx";
import PerfilUsuario from "./PerfilUsuario.jsx";
import EditarPerfil from "./EditarPerfil.jsx";
import DondeReservar from "./DondeReservar.jsx";

// Clases y reservas
import Clases from "./Clases.jsx";
import ClasesSoloVista from "./ClasesSoloVista.jsx";
import EdicionPremium from "./EdicionPremium.jsx";
import ReservaEdicionPremium from "./ReservaEdicionPremium.jsx";
import CreativoPlus from "./CreativoPlus.jsx";
import ReservaCreativoPlus from "./ReservaCreativoPlus.jsx";
import BasicoEsencial from "./BasicoEsencial.jsx";
import ReservaBasicoEsencial from "./ReservaBasicoEsencial.jsx";
import PintarCeramica from "./PintarCeramica.jsx";
import ReservaPintarCeramica from "./ReservaPintarCeramica.jsx";
import FundamentalMini from "./FundamentalMini.jsx";
import ReservaFundamentalMini from "./ReservaFundamentalMini.jsx";
import MensualBono2Clases from "./MensualBono2Clases.jsx";
import ReservaBono2Clases from "./ReservaBono2Clases.jsx";
import MensualBono4Clases from "./MensualBono4Clases.jsx";
import ReservaBono4Clases from "./ReservaBono4Clases.jsx";
import ExpresContinuo from "./ExpresContinuo.jsx";
import ReservaExpresContinuo from "./ReservaExpresContinuo.jsx";
import ResumenPago from "./ResumenPago.jsx";
import GaleriaTarjetasRegalo from "./GaleriaTarjetasRegalo.jsx";
import CanjearTarjetaRegalo from "./CanjearTarjetaRegalo.jsx";

// Clases solo vista
import EdicionPremiumSolo from "./EdicionPremiumSolo.jsx";
import CreativoPlusSolo from "./CreativoPlusSolo.jsx";
import BasicoEsencialSolo from "./BasicoEsencialSolo.jsx";
import Bono2ClasesSolo from "./Bono2ClasesSolo.jsx";
import Bono4ClasesSolo from "./Bono4ClasesSolo.jsx";
import FundamentalMiniSolo from "./FundamentalMiniSolo.jsx";
import PintaTuPiezaDeCeramicaSolo from "./PintaTuPiezaDeCeramicaSolo.jsx";
import ExpresContinuoSolo from "./ExpresContinuoSolo.jsx";

// Tarjetas regalo
import TarjetaRegaloSolo from "./TarjetaRegaloSolo.jsx";
import TornoIntensivoRegalo from "./TornoIntensivoRegalo.jsx";
import Clase2ClasesRegalo from "./Clase2ClasesRegalo.jsx";
import CreaTuPiezaFavoritaRegalo from "./CreaTuPiezaFavoritaRegalo.jsx";
import Clase4ClasesRegalo from "./Clase4ClasesRegalo.jsx";
import DetalleTarjeta2Clases from "./DetalleTarjeta2Clases.jsx";
import DetalleTarjeta4Clases from "./DetalleTarjeta4Clases.jsx";
import DetalleTarjetaCreaTuPiezaFavorita from "./DetalleTarjetaCreaTuPiezaFavorita.jsx";
import DetalleTarjetaPintaTuPieza from "./DetalleTarjetaPintaTuPieza.jsx";
import DetalleTarjetaTornoIntensivo from "./DetalleTarjetaTornoIntensivo.jsx";
import ReservaPintaTuPiezaRegalo from "./ReservaPintaTuPiezaRegalo.jsx";

// Ubicaciones externas
import TheClub from "./TheClub.jsx";
import TeariumKarma from "./TeariumKarma.jsx";
import ReservaTheClub from "./ReservaTheClub.jsx";
import ReservaTearium from "./ReservaTearium.jsx";
import ReservaKarma from "./ReservaKarma.jsx";
import ResumenPagoTheClub from "./ResumenPagoTheClub.jsx";
import ResumenPagoTearium from "./ResumenPagoTearium.jsx";
import ResumenPagoKarma from "./ResumenPagoKarma.jsx";

// Admin
import AdminPanel from "./AdminPanel.jsx";
import AdminNotificaciones from "./AdminNotificaciones.jsx";
import AdminEnviarAviso from "./AdminEnviarAviso.jsx";
import AdminSolicitudes from "./AdminSolicitudes.jsx";
import AdminSolicitarEliminacion from "./AdminSolicitarEliminacion.jsx";
import AdminHistoriales from "./AdminHistoriales.jsx";
import AdminHistorialReservas from "./AdminHistorialReservas.jsx";
import AdminHistorialBonos from "./AdminHistorialBonos.jsx";
import AdminSolicitarCrearClase from "./AdminSolicitarCrearClase.jsx";
import AdminSolicitarEditarClase from "./AdminSolicitarEditarClase.jsx";
import AdminCambiarImagenClase from "./AdminCambiarImagenClase.jsx";
import AdminListadoClases from "./AdminListadoClases.jsx";
import AdminListadoReservas from "./AdminListadoReservas.jsx";
import AdminFiltrarReservas from "./AdminFiltrarReservas.jsx";
import AdminCompletarReserva from "./AdminCompletarReserva.jsx";
import AdminCancelarReserva from "./AdminCancelarReserva.jsx";
import AdminAñadirNota from "./AdminAñadirNota.jsx";
import AdminUsoBonos from "./AdminUsoBonos.jsx";
import AdminListadoUsuarios from "./AdminListadoUsuarios.jsx";
import AdminPerfilUsuario from "./AdminPerfilUsuario.jsx";
import AdminBuscarUsuario from "./AdminBuscarUsuario.jsx";
import AdminEliminarClase from "./AdminEliminarClase.jsx";
import AdminVerInscripciones from "./AdminVerInscripciones.jsx";
import AdminBloquearUsuario from "./AdminBloquearUsuario.jsx";

// Legales
import PoliticaCancelacion from "./PoliticaCancelacion.jsx";
import CondicionesUso from "./CondicionesUso.jsx";
import PoliticaPrivacidad from "./PoliticaPrivacidad.jsx";
import CondicionesPago from "./CondicionesPago.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/portada" />} />
          <Route path="/portada" element={<Portada />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/dondereservar" element={<DondeReservar />} />

          {/* Clases */}
          <Route path="/clases" element={<Clases />} />
          <Route path="/clases-solo" element={<ClasesSoloVista />} />
          <Route path="/edicion-premium" element={<EdicionPremium />} />
          <Route path="/creativo-plus" element={<CreativoPlus />} />
          <Route path="/basico-esencial" element={<BasicoEsencial />} />
          <Route path="/pintar-ceramica" element={<PintarCeramica />} />
          <Route path="/fundamental-mini" element={<FundamentalMini />} />
          <Route path="/bono-2-clases" element={<MensualBono2Clases />} />
          <Route path="/bono-4-clases" element={<MensualBono4Clases />} />
          <Route path="/exprescontinuo" element={<ExpresContinuo />} />
          <Route path="/tarjeta-regalo" element={<GaleriaTarjetasRegalo />} />
          <Route path="/tarjeta-regalo/2clases" element={<DetalleTarjeta2Clases />} />
          <Route path="/tarjeta-regalo/4clases" element={<DetalleTarjeta4Clases />} />
          <Route path="/tarjeta-regalo/creapiezafavorita" element={<DetalleTarjetaCreaTuPiezaFavorita />} />
          <Route path="/tarjeta-regalo/pintatupieza" element={<DetalleTarjetaPintaTuPieza />} />
          <Route path="/tarjeta-regalo/tornointensivo" element={<DetalleTarjetaTornoIntensivo />} />

          {/* Clases solo vista */}
          <Route path="/edicion-premium-solo" element={<EdicionPremiumSolo />} />
          <Route path="/creativo-plus-solo" element={<CreativoPlusSolo />} />
          <Route path="/basico-esencial-solo" element={<BasicoEsencialSolo />} />
          <Route path="/bono-2-clases-solo" element={<Bono2ClasesSolo />} />
          <Route path="/bono-4-clases-solo" element={<Bono4ClasesSolo />} />
          <Route path="/fundamental-mini-solo" element={<FundamentalMiniSolo />} />
          <Route path="/exprescontinuo-solo" element={<ExpresContinuoSolo />} />

          {/* Tarjetas regalo solo vista */}
          <Route path="/tarjeta-regalo-solo" element={<TarjetaRegaloSolo />} />
          <Route path="/pintar-ceramica-solo" element={<PintaTuPiezaDeCeramicaSolo />} />
          <Route path="/tarjeta-regalo-solo/2clases" element={<Clase2ClasesRegalo />} />
          <Route path="/tarjeta-regalo-solo/creapiezafavorita" element={<CreaTuPiezaFavoritaRegalo />} />
          <Route path="/tarjeta-regalo-solo/pintatupieza" element={<PintaTuPiezaDeCeramicaSolo />} />
          <Route path="/pintatupieza-solo" element={<PintaTuPiezaDeCeramicaSolo />} />
          <Route path="/tornointensivo-solo" element={<TornoIntensivoRegalo />} />
          <Route path="/tarjeta-regalo-solo/tornointensivo" element={<TornoIntensivoRegalo />} />
          <Route path="/2clases-solo" element={<Bono2ClasesSolo />} />
          <Route path="/4clases-solo" element={<Bono4ClasesSolo />} />
          <Route path="/creapiezafavorita-solo" element={<CreaTuPiezaFavoritaRegalo />} />
          <Route path="/tarjeta-regalo-solo/4clases" element={<Clase4ClasesRegalo />} />

          {/* Canjear y reserva regalo */}
          <Route path="/canjear-tarjeta" element={<CanjearTarjetaRegalo />} />
          <Route path="/reserva-pinta-tu-pieza-regalo" element={<ReservaPintaTuPiezaRegalo />} />

          {/* Reservas normales */}
          <Route path="/reserva-edicion-premium" element={<ReservaEdicionPremium />} />
          <Route path="/reserva-creativo-plus" element={<ReservaCreativoPlus />} />
          <Route path="/reserva-basico-esencial" element={<ReservaBasicoEsencial />} />
          <Route path="/reserva-pintar-ceramica" element={<ReservaPintarCeramica />} />
          <Route path="/reserva-fundamental-mini" element={<ReservaFundamentalMini />} />
          <Route path="/reserva-bono-2-clases" element={<ReservaBono2Clases />} />
          <Route path="/reserva-bono-4-clases" element={<ReservaBono4Clases />} />
          <Route path="/reserva-exprescontinuo" element={<ReservaExpresContinuo />} />

          {/* Resumen de pago */}
          <Route path="/resumenpago" element={<ResumenPago />} />
          <Route path="/resumenpagotheclub" element={<ResumenPagoTheClub />} />
          <Route path="/resumenpagotearium" element={<ResumenPagoTearium />} />
          <Route path="/resumenpagokarma" element={<ResumenPagoKarma />} />

          {/* Ubicaciones externas */}
          <Route path="/theclub" element={<TheClub />} />
          <Route path="/teariumkarma" element={<TeariumKarma />} />
          <Route path="/reservatheclub" element={<ReservaTheClub />} />
          <Route path="/reservatearium" element={<ReservaTearium />} />
          <Route path="/reservakarma" element={<ReservaKarma />} />

          {/* Admin */}
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-notificaciones" element={<AdminNotificaciones />} />
          <Route path="/admin-enviar-aviso" element={<AdminEnviarAviso />} />
          <Route path="/admin-solicitudes" element={<AdminSolicitudes />} />
          <Route path="/admin-solicitar-eliminacion" element={<AdminSolicitarEliminacion />} />
          <Route path="/admin-historiales" element={<AdminHistoriales />} />
          <Route path="/admin-historial-reservas" element={<AdminHistorialReservas />} />
          <Route path="/admin-historial-bonos" element={<AdminHistorialBonos />} />
          <Route path="/admin-solicitar-crear-clase" element={<AdminSolicitarCrearClase />} />
          <Route path="/admin-solicitar-editar-clase" element={<AdminSolicitarEditarClase />} />
          <Route path="/admin-cambiar-imagen-clase" element={<AdminCambiarImagenClase />} />
          <Route path="/admin-ver-inscripciones" element={<AdminVerInscripciones />} />
          <Route path="/admin-listado-clases" element={<AdminListadoClases />} />
          <Route path="/admin-listado-reservas" element={<AdminListadoReservas />} />
          <Route path="/admin-filtrar-reservas" element={<AdminFiltrarReservas />} />
          <Route path="/admin-completar-reserva" element={<AdminCompletarReserva />} />
          <Route path="/admin-cancelar-reserva" element={<AdminCancelarReserva />} />
          <Route path="/admin-aniadir-nota/:id" element={<AdminAñadirNota />} />
          <Route path="/admin/usuarios/bloquear/:id" element={<AdminBloquearUsuario />} />
          <Route path="/admin/usuarios/aviso/:id" element={<AdminEnviarAviso />} />
          <Route path="/admin-uso-bonos" element={<AdminUsoBonos />} />
          <Route path="/admin-listado-usuarios" element={<AdminListadoUsuarios />} />
          <Route path="/admin-perfil-usuario/:uid" element={<AdminPerfilUsuario />} />
          <Route path="/admin-buscar-usuario" element={<AdminBuscarUsuario />} />
          <Route path="/admin-eliminar-clase" element={<AdminEliminarClase />} />
          <Route path="/admin/clases/inscripciones/:nombreClase" element={<AdminVerInscripciones />} />

          {/* Legales */}
          <Route path="/politicacancelacion" element={<PoliticaCancelacion />} />
          <Route path="/condicionesuso" element={<CondicionesUso />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/condiciones-pago" element={<CondicionesPago />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;






