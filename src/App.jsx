import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import PoliticaPiezas from "./PoliticaPiezas";
import AvisoLegal from "./AvisoLegal.jsx";

import ConfirmacionPago from "./ConfirmacionPago.jsx";
import PagoFallido from "./PagoFallido.jsx";


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
import CreaTuBrunchBowl from "./CreaTuBrunchBowl.jsx";
import CreaTuPiezaFavorita from "./CreaTuPiezaFavorita";
import ReservaCreaTuPiezaFavorita from "./ReservaCreaTuPiezaFavorita.jsx";
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
import CanjearTarjetaRegalo from "./CanjearTarjetaRegalo.jsx";
import TalleresCrearPiezas from "./TalleresCrearPiezas";
import TalleresCursosBonos from "./TalleresCursosBonos";
import TalleresPintaDecora from "./TalleresPintaDecora";
import TarjetaRegalo from "./TarjetaRegalo";
import ReservaCreaTuBrunchBowl from "./ReservaCreaTuBrunchBowl.jsx";
import CreaTuCuencoRamen from "./CreaTuCuencoRamen.jsx";
import CreaTuBandejaHogar from "./CreaTuBandejaHogar.jsx";
import ReservaCreaTuBandejaHogar from "./ReservaCreaTuBandejaHogar.jsx";
import CreaTuTazaFavorita from "./CreaTuTazaFavorita.jsx";
import ReservaCreaTuTazaFavorita from "./ReservaCreaTuTazaFavorita.jsx";
import CreaTuMaceta from "./CreaTuMaceta.jsx";
import ReservaCreaTuMaceta from "./ReservaCreaTuMaceta.jsx";
import CreaTuGranCentroMesa from "./CreaTuGranCentroMesa.jsx";
import ReservaCreaTuGranCentroMesa from "./ReservaCreaTuGranCentroMesa.jsx";
import CreaTuJarraJarronGrande from "./CreaTuJarraJarronGrande.jsx";
import ReservaCreaTuJarraJarronGrande from "./ReservaCreaTuJarraJarronGrande.jsx";
import CreaTuSetMatcha from "./CreaTuSetMatcha.jsx";
import ReservaCreaTuSetMatcha from "./ReservaCreaTuSetMatcha.jsx";
import CreaTuSetSake from "./CreaTuSetSake.jsx";
import ReservaCreaTuSetSake from "./ReservaCreaTuSetSake.jsx";


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

//Reservas con las tarjetas regalo
import ReservaTornoIntensivoRegalo from "./ReservaTornoIntensivoRegalo.jsx";
import Reserva2clases4hmesRegalo from "./Reserva2clases4hmesRegalo.jsx";
import ReservaCreaTuCuencoRamen from "./ReservaCreaTuCuencoRamen.jsx";







// Ubicaciones externas
import TheClub from "./TheClub.jsx";
import TeariumInfo from "./TeariumInfo.jsx";
import ReservaTheClub from "./ReservaTheClub.jsx";
import ReservaTearium from "./ReservaTearium.jsx";
import ResumenPagoTheClub from "./ResumenPagoTheClub.jsx";
import ResumenPagoTearium from "./ResumenPagoTearium.jsx";




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

//Clases Online
import ClasesOnlineInfo from "./ClasesOnlineInfo.jsx";
import ReservaClasesOnline from "./ReservaClasesOnline.jsx";

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
          <Route path="/politica-piezas" element={<PoliticaPiezas />} /> 
          <Route path="/aviso-legal" element={<AvisoLegal />} />

          {/* Clases */}
          <Route path="/clases" element={<Clases />} />
          <Route path="/clases-solo" element={<ClasesSoloVista />} />
          <Route path="/edicion-premium" element={<EdicionPremium />} />
          <Route path="/crea-tu-brunch-bowl" element={<CreaTuBrunchBowl />} />
          <Route path="/crea-tu-pieza-favorita-desde-cero" element={<CreaTuPiezaFavorita />} />
          <Route path="/pintar-ceramica" element={<PintarCeramica />} />
          <Route path="/fundamental-mini" element={<FundamentalMini />} />
          <Route path="/bono-2-clases" element={<MensualBono2Clases />} />
          <Route path="/bono-4-clases" element={<MensualBono4Clases />} />
          <Route path="/exprescontinuo" element={<ExpresContinuo />} />
          <Route
  path="/reserva-crea-tu-pieza-favorita"
  element={<ReservaCreaTuPiezaFavorita />}
 />
 <Route
  path="/reserva-crea-tu-brunch-bowl"
  element={<ReservaCreaTuBrunchBowl />}
/>
<Route
  path="/reserva-crea-tu-cuenco-ramen"
  element={<ReservaCreaTuCuencoRamen />}
/>
<Route path="/crea-tu-bandeja-hogar" element={<CreaTuBandejaHogar />} />
<Route
  path="/reserva-crea-tu-bandeja-hogar"
  element={<ReservaCreaTuBandejaHogar />}
/>
<Route path="/crea-tu-taza-favorita" element={<CreaTuTazaFavorita />} />
<Route
  path="/reserva-crea-tu-taza-favorita"
  element={<ReservaCreaTuTazaFavorita />}
/>
<Route path="/crea-tu-maceta" element={<CreaTuMaceta />} />
<Route path="/reserva-crea-tu-maceta" element={<ReservaCreaTuMaceta />} />
<Route path="/crea-tu-gran-centro-mesa" element={<CreaTuGranCentroMesa />} />
<Route
  path="/reserva-crea-tu-gran-centro-mesa"
  element={<ReservaCreaTuGranCentroMesa />}
/>
<Route
  path="/crea-tu-jarra-jarron-grande"
  element={<CreaTuJarraJarronGrande />}
/>
<Route
  path="/reserva-crea-tu-jarra-jarron-grande"
  element={<ReservaCreaTuJarraJarronGrande />}
/>
<Route path="/crea-tu-set-matcha" element={<CreaTuSetMatcha />} />
<Route
  path="/reserva-crea-tu-set-matcha"
  element={<ReservaCreaTuSetMatcha />}
/>
<Route path="/crea-tu-set-sake" element={<CreaTuSetSake />} />
<Route
  path="/reserva-crea-tu-set-sake"
  element={<ReservaCreaTuSetSake />}
/>
          
          <Route path="/talleres/cursos-bonos" element={<TalleresCursosBonos />} />
          <Route path="/talleres/crear-piezas" element={<TalleresCrearPiezas />} />
          <Route path="/talleres/pinta-decora" element={<TalleresPintaDecora />} />
          <Route path="/tarjeta-regalo" element={<TarjetaRegalo />} />
          <Route path="/crea-tu-cuenco-ramen" element={<CreaTuCuencoRamen />} />
           

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
          <Route path="/canjear-tarjeta-regalo" element={<CanjearTarjetaRegalo />} />
          <Route path="/reserva-pinta-tu-pieza-regalo" element={<ReservaPintaTuPiezaRegalo />} />
          

          {/* Reservas tarjetas regalo*/}
          <Route path="/reserva-tornointensivo-regalo" element={<ReservaTornoIntensivoRegalo />}/>
          <Route path="/reserva-2clases4hmes-regalo" element={<Reserva2clases4hmesRegalo />} />


          {/* Reservas normales */}
          <Route path="/reserva-edicion-premium" element={<ReservaEdicionPremium />} />
          
          
          <Route path="/reserva-pintar-ceramica" element={<ReservaPintarCeramica />} />
          <Route path="/reserva-fundamental-mini" element={<ReservaFundamentalMini />} />
          <Route path="/reserva-bono-2-clases" element={<ReservaBono2Clases />} />
          <Route path="/reserva-bono-4-clases" element={<ReservaBono4Clases />} />
          <Route path="/reserva-exprescontinuo" element={<ReservaExpresContinuo />} />

          {/* Resumen de pago */}
          <Route path="/resumen-pago" element={<ResumenPago />} />
          <Route path="/resumenpagotheclub" element={<ResumenPagoTheClub />} />
          <Route path="/resumenpagotearium" element={<ResumenPagoTearium />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />
          <Route path="/pago/exito" element={<ConfirmacionPago />} />
<Route path="/pago/error" element={<PagoFallido />} />



          {/* Ubicaciones externas */}
          <Route path="/theclub" element={<TheClub />} />
          <Route path="/teariumInfo" element={<TeariumInfo />} />
          <Route path="/reservatheclub" element={<ReservaTheClub />} />
          <Route path="/reservatearium" element={<ReservaTearium />} />
          {/* Clases Online */}
          <Route path="/clases-online" element={<ClasesOnlineInfo />} />
          <Route path="/reserva-online" element={<ReservaClasesOnline />} />


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
          <Route path="*" element={<Navigate to="/portada" replace />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;






