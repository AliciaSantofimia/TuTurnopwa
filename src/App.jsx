import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Utilidades y layout
import ScrollToTop from "./ScrollToTop";
import AppLayout from "./AppLayout";

// Páginas principales
import Portada from "./Portada.jsx";
import Login from "./Login.jsx";
import Registro from "./Registro.jsx";
import Menu from "./Menu.jsx";
import PerfilUsuario from "./PerfilUsuario.jsx";
import EditarPerfil from "./EditarPerfil.jsx";
import DondeReservar from "./DondeReservar.jsx";

// Legales y políticas
import PoliticaPiezas from "./PoliticaPiezas";
import AvisoLegal from "./AvisoLegal.jsx";
import PoliticaCancelacion from "./PoliticaCancelacion.jsx";
import CondicionesUso from "./CondicionesUso.jsx";
import PoliticaPrivacidad from "./PoliticaPrivacidad.jsx";
import CondicionesPago from "./CondicionesPago.jsx";

// Pagos
import ResumenPago from "./ResumenPago.jsx";
import ConfirmacionPago from "./ConfirmacionPago.jsx";
import PagoFallido from "./PagoFallido.jsx";
import ResumenPagoTheClub from "./ResumenPagoTheClub.jsx";
import ResumenPagoTearium from "./ResumenPagoTearium.jsx";

// Clases y secciones principales
import Clases from "./Clases.jsx";
import ClasesSoloVista from "./ClasesSoloVista.jsx";
import TalleresCrearPiezas from "./TalleresCrearPiezas";
import TalleresCursosBonos from "./TalleresCursosBonos";
import TalleresPintaDecora from "./TalleresPintaDecora";
import TarjetaRegalo from "./TarjetaRegalo";

// Clases
import CreaTuBrunchBowl from "./CreaTuBrunchBowl.jsx";
import CreaTuPiezaFavorita from "./CreaTuPiezaFavorita";
import PintarCeramica from "./PintarCeramica.jsx";
import CreaTuCuencoRamen from "./CreaTuCuencoRamen.jsx";
import CreaTuBandejaHogar from "./CreaTuBandejaHogar.jsx";
import CreaTuTazaFavorita from "./CreaTuTazaFavorita.jsx";
import CreaTuMaceta from "./CreaTuMaceta.jsx";
import CreaTuGranCentroMesa from "./CreaTuGranCentroMesa.jsx";
import CreaTuJarraJarronGrande from "./CreaTuJarraJarronGrande.jsx";
import CreaTuSetMatcha from "./CreaTuSetMatcha.jsx";
import CreaTuSetSake from "./CreaTuSetSake.jsx";
import CreaTuTazaEscultorica from "./CreaTuTazaEscultorica";
import CreaTuMacetaOrganica from "./CreaTuMacetaOrganica";
import ModelaAManoYDecoraTusPiezasFavoritas from "./ModelaAManoYDecoraTusPiezasFavoritas";
import TornoAlfareroYDecoracion from "./TornoAlfareroYDecoracion";
import TornoAlfareroEmpezarDesdeCero from "./TornoAlfareroEmpezarDesdeCero";
import TornoAlfareroPerfeccionaLoQueYaSabes from "./TornoAlfareroPerfeccionaLoQueYaSabes";
import EspecialPintaTuPieza from "./EspecialPintaTuPieza";
import PintaTuPieza from "./PintaTuPieza";
import ComprarTarjetaRegalo from "./ComprarTarjetaRegalo";
import GenerarCodigoTarjetaRegalo from "./GenerarCodigoTarjetaRegalo";
import ReservaConTarjetaRegalo from "./ReservaConTarjetaRegalo";
import ClaseSueltaContinuidad from "./ClaseSueltaContinuidad";
import CreaTuPiezaFavoritaRegalo from "./CreaTuPiezaFavoritaRegalo.jsx";

// Reservas normales
import ReservaCreaTuPiezaFavorita from "./ReservaCreaTuPiezaFavorita.jsx";
import ReservaCreaTuBrunchBowl from "./ReservaCreaTuBrunchBowl.jsx";
import ReservaCreaTuCuencoRamen from "./ReservaCreaTuCuencoRamen.jsx";
import ReservaCreaTuBandejaHogar from "./ReservaCreaTuBandejaHogar.jsx";
import ReservaCreaTuTazaFavorita from "./ReservaCreaTuTazaFavorita.jsx";
import ReservaCreaTuMaceta from "./ReservaCreaTuMaceta.jsx";
import ReservaCreaTuGranCentroMesa from "./ReservaCreaTuGranCentroMesa.jsx";
import ReservaCreaTuJarraJarronGrande from "./ReservaCreaTuJarraJarronGrande.jsx";
import ReservaCreaTuSetMatcha from "./ReservaCreaTuSetMatcha.jsx";
import ReservaCreaTuSetSake from "./ReservaCreaTuSetSake.jsx";
import ReservaCreaTuTazaEscultorica from "./ReservaCreaTuTazaEscultorica.jsx";
import ReservaCreaTuMacetaOrganica from "./ReservaCreaTuMacetaOrganica.jsx";
import ReservaModelaAManoYDecoraTusPiezasFavoritas from "./ReservaModelaAManoYDecoraTusPiezasFavoritas";
import ReservaTornoAlfareroYDecoracion from "./ReservaTornoAlfareroYDecoracion";
import ReservaTornoAlfareroEmpezarDesdeCero from "./ReservaTornoAlfareroEmpezarDesdeCero";
import ReservaTornoAlfareroPerfeccionaLoQueYaSabes from "./ReservaTornoAlfareroPerfeccionaLoQueYaSabes";
import ReservaEspecialPintaTuPieza from "./ReservaEspecialPintaTuPieza";
import ReservaPintaTuPieza from "./ReservaPintaTuPieza";
import ReservaClaseSueltaContinuidad from "./ReservaClaseSueltaContinuidad";
import ReservaGrupos from "./ReservaGrupos.jsx";

// Tarjetas regalo
import CanjearTarjetaRegalo from "./CanjearTarjetaRegalo";

// Ubicaciones externas
import TheClub from "./TheClub.jsx";
import TeariumInfo from "./TeariumInfo.jsx";
import ReservaTheClub from "./ReservaTheClub.jsx";
import ReservaTearium from "./ReservaTearium.jsx";

// Clases online
import ClasesOnlineInfo from "./ClasesOnlineInfo.jsx";
import ReservaClasesOnline from "./ReservaClasesOnline.jsx";


// Nuevo Admin
import AdminNuevo from "./AdminNuevo";
import AdminReservasNuevo from "./AdminReservasNuevo";
import AdminDashboard from "./AdminDashboard";
import AdminClasesNuevo from "./AdminClasesNuevo";
import AdminUsuariosNuevo from "./AdminUsuariosNuevo";
import AdminCalendarioReservasNuevo from "./AdminCalendarioReservasNuevo";
import AdminHistorialNuevo from "./AdminHistorialNuevo";
import AdminDetalleReservaNuevo from "./AdminDetalleReservaNuevo";
import AdminDetalleUsuarioNuevo from "./AdminDetalleUsuarioNuevo";
import AdminDetalleClaseNuevo from "./AdminDetalleClaseNuevo";
import RutaAdmin from "./RutaAdmin";
import AdminTarjetasRegalo from "./AdminTarjetasRegalo";
import AdminReservasGrupos from "./AdminReservasGrupos";


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<AppLayout />}>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/portada" replace />} />

          {/* Páginas principales */}
          <Route path="/portada" element={<Portada />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/perfil" element={<PerfilUsuario />} />
          <Route path="/editar-perfil" element={<EditarPerfil />} />
          <Route path="/dondereservar" element={<DondeReservar />} />

          {/* Legales y políticas */}
          <Route path="/politica-piezas" element={<PoliticaPiezas />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politicacancelacion" element={<PoliticaCancelacion />} />
          <Route path="/condicionesuso" element={<CondicionesUso />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/condiciones-pago" element={<CondicionesPago />} />

          {/* Secciones principales */}
          <Route path="/clases" element={<Clases />} />
          <Route path="/clases-solo" element={<ClasesSoloVista />} />
          <Route path="/talleres/cursos-bonos" element={<TalleresCursosBonos />} />
          <Route path="/talleres/crear-piezas" element={<TalleresCrearPiezas />} />
          <Route path="/talleres/pinta-decora" element={<TalleresPintaDecora />} />
          <Route path="/tarjeta-regalo" element={<TarjetaRegalo />} />

          {/* Clases */}
          <Route path="/crea-tu-brunch-bowl" element={<CreaTuBrunchBowl />} />
          <Route path="/crea-tu-pieza-favorita-desde-cero" element={<CreaTuPiezaFavorita />} />
          <Route path="/pintar-ceramica" element={<PintarCeramica />} />
          <Route path="/crea-tu-cuenco-ramen" element={<CreaTuCuencoRamen />} />
          <Route path="/crea-tu-bandeja-hogar" element={<CreaTuBandejaHogar />} />
          <Route path="/crea-tu-taza-favorita" element={<CreaTuTazaFavorita />} />
          <Route path="/crea-tu-maceta" element={<CreaTuMaceta />} />
          <Route path="/crea-tu-gran-centro-mesa" element={<CreaTuGranCentroMesa />} />
          <Route path="/crea-tu-jarra-jarron-grande" element={<CreaTuJarraJarronGrande />} />
          <Route path="/crea-tu-set-matcha" element={<CreaTuSetMatcha />} />
          <Route path="/crea-tu-set-sake" element={<CreaTuSetSake />} />
          <Route path="/crea-tu-taza-escultorica" element={<CreaTuTazaEscultorica />} />
          <Route path="/crea-tu-maceta-organica" element={<CreaTuMacetaOrganica />} />
          <Route
            path="/modela-a-mano-y-decora-tus-piezas-favoritas"
            element={<ModelaAManoYDecoraTusPiezasFavoritas />}
          />
          <Route path="/torno-alfarero-y-decoracion" element={<TornoAlfareroYDecoracion />} />
          <Route
            path="/torno-alfarero-empezar-desde-cero"
            element={<TornoAlfareroEmpezarDesdeCero />}
          />
          <Route
            path="/torno-alfarero-perfecciona-lo-que-ya-sabes"
            element={<TornoAlfareroPerfeccionaLoQueYaSabes />}
          />
          <Route path="/especial-pinta-tu-pieza" element={<EspecialPintaTuPieza />} />
          <Route path="/pinta-tu-pieza" element={<PintaTuPieza />} />
          <Route path="/comprar-tarjeta-regalo" element={<ComprarTarjetaRegalo />} />
          <Route
            path="/generar-codigo-tarjeta-regalo"
            element={<GenerarCodigoTarjetaRegalo />}
          />
          <Route path="/reserva-con-tarjeta-regalo" element={<ReservaConTarjetaRegalo />} />
          <Route
            path="/talleres/clase-suelta-continuidad"
            element={<ClaseSueltaContinuidad />}
          />

          {/* Reservas normales */}
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
          <Route
            path="/reserva-crea-tu-bandeja-hogar"
            element={<ReservaCreaTuBandejaHogar />}
          />
          <Route
            path="/reserva-crea-tu-taza-favorita"
            element={<ReservaCreaTuTazaFavorita />}
          />
          <Route path="/reserva-crea-tu-maceta" element={<ReservaCreaTuMaceta />} />
          <Route
            path="/reserva-crea-tu-gran-centro-mesa"
            element={<ReservaCreaTuGranCentroMesa />}
          />
          <Route
            path="/reserva-crea-tu-jarra-jarron-grande"
            element={<ReservaCreaTuJarraJarronGrande />}
          />
          <Route
            path="/reserva-crea-tu-set-matcha"
            element={<ReservaCreaTuSetMatcha />}
          />
          <Route
            path="/reserva-crea-tu-set-sake"
            element={<ReservaCreaTuSetSake />}
          />
          <Route
            path="/reserva-crea-tu-taza-escultorica"
            element={<ReservaCreaTuTazaEscultorica />}
          />
          <Route
            path="/reserva-crea-tu-maceta-organica"
            element={<ReservaCreaTuMacetaOrganica />}
          />
          <Route
            path="/reserva-modela-a-mano-y-decora-tus-piezas-favoritas"
            element={<ReservaModelaAManoYDecoraTusPiezasFavoritas />}
          />
          <Route
            path="/reserva-torno-alfarero-y-decoracion"
            element={<ReservaTornoAlfareroYDecoracion />}
          />
          <Route
            path="/reserva-torno-alfarero-empezar-desde-cero"
            element={<ReservaTornoAlfareroEmpezarDesdeCero />}
          />
          <Route
            path="/reserva-torno-alfarero-perfecciona-lo-que-ya-sabes"
            element={<ReservaTornoAlfareroPerfeccionaLoQueYaSabes />}
          />
          <Route
            path="/reserva-especial-pinta-tu-pieza"
            element={<ReservaEspecialPintaTuPieza />}
          />
          <Route path="/reserva-pinta-tu-pieza" element={<ReservaPintaTuPieza />} />
          
          <Route
            path="/reserva-clase-suelta-continuidad"
            element={<ReservaClaseSueltaContinuidad />}
          />
          <Route path="/reserva-grupos" element={<ReservaGrupos />} />

          {/* Tarjetas regalo */}
          <Route
            path="/tarjeta-regalo-solo/creapiezafavorita"
            element={<CreaTuPiezaFavoritaRegalo />}
          />
          <Route
            path="/creapiezafavorita-solo"
            element={<CreaTuPiezaFavoritaRegalo />}
          />
          <Route path="/canjear-tarjeta" element={<CanjearTarjetaRegalo />} />
          <Route
            path="/canjear-tarjeta-regalo"
            element={<CanjearTarjetaRegalo />}
          />

          {/* Pagos */}
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

          {/* Clases online */}
          <Route path="/clases-online" element={<ClasesOnlineInfo />} />
          <Route path="/reserva-online" element={<ReservaClasesOnline />} />

          

        {/* Nuevo Admin */}

        <Route
  path="/admin-reservas-grupos"
  element={
    <RutaAdmin>
      <AdminReservasGrupos />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-nuevo"
  element={
    <RutaAdmin>
      <AdminNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-reservas-nuevo"
  element={
    <RutaAdmin>
      <AdminReservasNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-dashboard"
  element={
    <RutaAdmin>
      <AdminDashboard />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-clases-nuevo"
  element={
    <RutaAdmin>
      <AdminClasesNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-usuarios-nuevo"
  element={
    <RutaAdmin>
      <AdminUsuariosNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-calendario-reservas-nuevo"
  element={
    <RutaAdmin>
      <AdminCalendarioReservasNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-historial-nuevo"
  element={
    <RutaAdmin>
      <AdminHistorialNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-detalle-reserva"
  element={
    <RutaAdmin>
      <AdminDetalleReservaNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-detalle-usuario"
  element={
    <RutaAdmin>
      <AdminDetalleUsuarioNuevo />
    </RutaAdmin>
  }
/>
<Route
  path="/admin-detalle-clase"
  element={
    <RutaAdmin>
      <AdminDetalleClaseNuevo />
    </RutaAdmin>
  }
  
/>

<Route
  path="/admin-tarjetas-regalo"
  element={
    <RutaAdmin>
      <AdminTarjetasRegalo />
    </RutaAdmin>
  }
/>
          

          

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/portada" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;