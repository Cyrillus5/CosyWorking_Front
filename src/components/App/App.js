import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import EspacePerso from '../EspacePerso/EspacePerso';
import EspaceCoworker from '../EspacePerso/EspaceCoworker/EspaceCoworker';
import Homepage from '../Homepage/Homepage';
import Error from '../Error/Error';
import EspaceHost from '../EspacePerso/EspaceHost/EspaceHost';
import MesReservations from '../EspacePerso/EspaceCoworker/MesReservations/MesReservations';
import MesAnnonces from '../EspacePerso/EspaceHost/MesAnnonces/MesAnnonces';
import ModalAlertConnection from '../ModalAlertConnection/ModalAlertConnection';
import WorkspaceDetail from '../WorkspaceDedail';
import PublicProfil from '../PublicProfile';
import WorkspaceEdition from '../WorkspaceEdition';
import SearchPage from '../SearchPage';
import './App.scss';

// import css du caroussel de la page de detail du workspace
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function App() {
  // On vérifie si le token n'a pas expiré en récupérant l'état de connexion
  const errorConnection = useSelector((state) => state.user.error_connection);

  return (
    <div className="App">
      <Nav />
      {/* Si le token a expiré, on récupère une erreur et donc on incite l'user à se reconnecter */}
      {errorConnection && <ModalAlertConnection />}
      <Routes>
        {/* <Route path="/espace-perso" element={<MyAccountMenu />} /> */}
        <Route path="/" element={<Homepage />} />
        <Route path="/workspace/:id" element={<WorkspaceDetail />} />
        <Route path="/profil/:id" element={<PublicProfil />} />
        <Route path="/espace-perso/espace-hote/mes-annonces/annonce/" element={<WorkspaceEdition />} />
        <Route path="/recherche" element={<SearchPage />} />
        <Route path="/espace-perso" element={<EspacePerso />} />
        <Route path="/espace-perso/espace-coworker" element={<EspaceCoworker />} />
        <Route path="/espace-perso/espace-coworker/mes-reservations" element={<MesReservations />} />
        <Route path="/espace-perso/espace-hote" element={<EspaceHost />} />
        <Route path="/espace-perso/espace-hote/mes-annonces" element={<MesAnnonces />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
