import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Páginas principales
import Portada from "./Portada.jsx";
import Login from "./Login.jsx";
import Registro from "./Registro.jsx";
import Menu from "./Menu.jsx";
import PerfilUsuario from "./PerfilUsuario.jsx";
import EditarPerfil from "./EditarPerfil.jsx";
import ClasesSoloVista from "./ClasesSoloVista.jsx";




// Clases y reservas
import Clases from "./Clases.jsx";
import EdicionPremium from "./EdicionPremium.jsx";
import CreativoPlus from "./CreativoPlus.jsx";
import BasicoEsencial from "./BasicoEsencial.jsx";
import PintarCeramica from "./PintarCeramica.jsx";
import FundamentalMini from "./FundamentalMini.jsx";
import MensualBono2Clases from "./MensualBono2Clases.jsx";
import MensualBono4Clases from "./MensualBono4Clases.jsx";
import ExpresContinuo from "./ExpresContinuo.jsx";

// Reservas
import ReservaEdicionPremium from "./ReservaEdicionPremium.jsx";
import ReservaCreativoPlus from "./ReservaCreativoPlus.jsx";
import ReservaBasicoEsencial from "./ReservaBasicoEsencial.jsx";
import ReservaPintarCeramica from "./ReservaPintarCeramica.jsx";
import ReservaBono4Clases from "./ReservaBono4Clases.jsx";
import ReservaBono2Clases from "./ReservaBono2Clases.jsx";
import ReservaFundamentalMini from "./ReservaFundamentalMini.jsx";
import ReservaExpresContinuo from "./ReservaExpresContinuo.jsx";

// Tarjeta regalo
import GaleriaTarjetasRegalo from "./GaleriaTarjetasRegalo.jsx";
import DetalleTarjeta2Clases from "./DetalleTarjeta2Clases.jsx";
import DetalleTarjeta4Clases from "./DetalleTarjeta4Clases.jsx";
import DetalleTarjetaCreaTuPiezaFavorita from "./DetalleTarjetaCreaTuPiezaFavorita.jsx";
import DetalleTarjetaPintaTuPieza from "./DetalleTarjetaPintaTuPieza.jsx";
import DetalleTarjetaTornoIntensivo from "./DetalleTarjetaTornoIntensivo.jsx";
import FuncionamientoTarjetaRegalo from "./FuncionamientoTarjetaRegalo.jsx";
import GenerarCodigoTarjetaRegalo from "./GenerarCodigoTarjetaRegalo.jsx";
import CanjearTarjetaRegalo from "./CanjearTarjetaRegalo.jsx";

// Pago
import ResumenPago from "./ResumenPago.jsx";
import FormularioRedsys from "./FormularioRedsys.jsx";
import PagoFallido from "./PagoFallido.jsx";

// Admin panel y gestión general
import AdminPanel from "./AdminPanel.jsx";
import AdminNotificaciones from "./AdminNotificaciones.jsx";
import AdminEnviarAviso from "./AdminEnviarAviso.jsx";
import AdminSolicitudes from "./AdminSolicitudes.jsx";
import AdminSolicitarEliminacion from "./AdminSolicitarEliminacion.jsx";


// Admin historial
import AdminHistoriales from "./AdminHistoriales.jsx";
import AdminHistorialReservas from "./AdminHistorialReservas.jsx";
import AdminHistorialBonos from "./AdminHistorialBonos.jsx";

// Admin clases
import AdminSolicitarCrearClase from "./AdminSolicitarCrearClase";
import AdminSolicitarEditarClase from "./AdminSolicitarEditarClase.jsx";
import AdminCambiarImagenClase from "./AdminCambiarImagenClase.jsx";
import AdminVerInscripciones from "./AdminVerInscripciones.jsx";
import AdminListadoClases from "./AdminListadoClases.jsx";

// Admin reservas
import AdminListadoReservas from "./AdminListadoReservas.jsx";
import AdminFiltrarReservas from "./AdminFiltrarReservas.jsx";
import AdminCompletarReserva from "./AdminCompletarReserva.jsx";
import AdminCancelarReserva from "./AdminCancelarReserva.jsx";
import AdminAñadirNota from "./AdminAñadirNota.jsx";
import AdminUsoBonos from "./AdminUsoBonos.jsx";

// Admin usuarios
import AdminListadoUsuarios from "./AdminListadoUsuarios.jsx";
import AdminPerfilUsuario from "./AdminPerfilUsuario.jsx";
import AdminBuscarUsuario from "./AdminBuscarUsuario.jsx";

// Opciones para reservar
import DondeReservar from "./DondeReservar.jsx";
import TheClub from "./TheClub.jsx";

import ReservaTheClub from "./ReservaTheClub.jsx";
import ReservaTearium from "./ReservaTearium.jsx";
import ReservaKarma from "./ReservaKarma.jsx";

import ResumenPagoTheClub from "./ResumenPagoTheClub.jsx";
import ResumenPagoTearium from "./ResumenPagoTearium.jsx";
import ResumenPagoKarma from "./ResumenPagoKarma.jsx";
import TeariumKarma from "./TeariumKarma.jsx";


// Legales
import PoliticaCancelacion from "./PoliticaCancelacion.jsx";
import CondicionesUso from "./CondicionesUso.jsx";
import PoliticaPrivacidad from "./PoliticaPrivacidad.jsx";
import CondicionesPago from "./CondicionesPago.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/portada" />} />

        {/* Usuario */}
        <Route path="/portada" element={<Portada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        <Route path="/editar-perfil" element={<EditarPerfil />} />
        <Route path="/clases-solo" element={<ClasesSoloVista />} />


        {/* Clases */}
        <Route path="/clases" element={<Clases />} />
        <Route path="/edicion-premium" element={<EdicionPremium />} />
        <Route path="/creativo-plus" element={<CreativoPlus />} />
        <Route path="/basico-esencial" element={<BasicoEsencial />} />
        <Route path="/pintar-ceramica" element={<PintarCeramica />} />
        <Route path="/fundamental-mini" element={<FundamentalMini />} />
        <Route path="/bono-2-clases" element={<MensualBono2Clases />} />
        <Route path="/bono-4-clases" element={<MensualBono4Clases />} />
        <Route path="/exprescontinuo" element={<ExpresContinuo />} />

        {/* Reservas */}
        <Route path="/reserva-edicion-premium" element={<ReservaEdicionPremium />} />
        <Route path="/reserva-creativo-plus" element={<ReservaCreativoPlus />} />
        <Route path="/reserva-basico-esencial" element={<ReservaBasicoEsencial />} />
        <Route path="/reserva-pintar-ceramica" element={<ReservaPintarCeramica />} />
        <Route path="/reserva-bono-4-clases" element={<ReservaBono4Clases />} />
        <Route path="/reserva-bono-2-clases" element={<ReservaBono2Clases />} />
        <Route path="/reserva-fundamental-mini" element={<ReservaFundamentalMini />} />
        <Route path="/reserva-exprescontinuo" element={<ReservaExpresContinuo />} />

        {/* Tarjetas regalo */}
        <Route path="/tarjeta-regalo" element={<GaleriaTarjetasRegalo />} />
        <Route path="/tarjeta-regalo/funciona" element={<FuncionamientoTarjetaRegalo />} />
        <Route path="/tarjeta-regalo/2clases" element={<DetalleTarjeta2Clases />} />
        <Route path="/tarjeta-regalo/4clases" element={<DetalleTarjeta4Clases />} />
        <Route path="/tarjeta-regalo/creapiezafavorita" element={<DetalleTarjetaCreaTuPiezaFavorita />} />
        <Route path="/tarjeta-regalo/pintatupieza" element={<DetalleTarjetaPintaTuPieza />} />
        <Route path="/tarjeta-regalo/tornointensivo" element={<DetalleTarjetaTornoIntensivo />} />
        <Route path="/generarcodigotarjetaregalo" element={<GenerarCodigoTarjetaRegalo />} />
        <Route path="/canjeartarjetaregalo" element={<CanjearTarjetaRegalo />} />

        {/* Pagos */}
        <Route path="/resumen-pago" element={<ResumenPago />} />
        <Route path="/pago-redsys" element={<FormularioRedsys />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />

        {/* Admin panel */}
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/solicitudes" element={<AdminSolicitudes />} />
        <Route path="/admin/clases/solicitar-eliminacion" element={<AdminSolicitarEliminacion />} />



        {/* Admin gestión clases */}
        <Route path="/admin/clases/crear" element={<AdminSolicitarCrearClase />} />
        <Route path="/admin/clases/listado" element={<AdminListadoClases />} />
        <Route path="/admin/clases/editar" element={<AdminSolicitarEditarClase />} />
        <Route path="/admin/clases/inscripciones/:id" element={<AdminVerInscripciones />} />

        {/* Admin gestión usuarios */}
        <Route path="/admin/usuarios/listado" element={<AdminListadoUsuarios />} />
        <Route path="/admin/usuarios/aviso/:id" element={<AdminEnviarAviso />} />
        <Route path="/admin/usuarios/perfil/:id" element={<AdminPerfilUsuario />} />
        <Route path="/admin/usuarios/listado" element={<AdminListadoUsuarios />} />
        <Route path="/admin/usuarios/buscar" element={<AdminBuscarUsuario />} />

        {/* Opciones de reservas*/}
        <Route path="/dondereservar" element={<DondeReservar />} />
        <Route path="/theclub" element={<TheClub />} />
        
        

        <Route path="/reservatheclub" element={<ReservaTheClub />} />
        <Route path="/reservatearium" element={<ReservaTearium />} />
        <Route path="/reservakarma" element={<ReservaKarma />} />

        <Route path="/resumenpagotheclub" element={<ResumenPagoTheClub />} />
        <Route path="/resumenpagotearium" element={<ResumenPagoTearium />} />
        <Route path="/resumenpagokarma" element={<ResumenPagoKarma />} />
        <Route path="/teariumkarma" element={<TeariumKarma />} />
        


        

        {/* Admin gestión reservas */}
        <Route path="/admin/reservas/listado" element={<AdminListadoReservas />} />
        <Route path="/admin/reservas/filtrar" element={<AdminFiltrarReservas />} />
        <Route path="/admin/reservas/completar" element={<AdminCompletarReserva />} />
        <Route path="/admin/reservas/cancelar" element={<AdminCancelarReserva />} />
        <Route path="/admin/reservas/nota/:id" element={<AdminAñadirNota />} />
        <Route path="/admin/reservas/uso-bonos" element={<AdminUsoBonos />} />

        {/* Admin historiales */}
        <Route path="/admin/historiales" element={<AdminHistoriales />} />
        <Route path="/admin/historial/reservas" element={<AdminHistorialReservas />} />
        <Route path="/admin/historial/bonos" element={<AdminHistorialBonos />} />

        {/* Admin notificaciones */}
        <Route path="/admin/notificaciones" element={<AdminNotificaciones />} />

        {/* Legales */}
        <Route path="/politicacancelacion" element={<PoliticaCancelacion />} />
        <Route path="/condicionesuso" element={<CondicionesUso />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/condiciones-pago" element={<CondicionesPago />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
