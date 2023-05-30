import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import RecipesPage from "./pages/recipes-page/recipes-page";
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import CreateCustomProteinShakePage from "./pages/create-custom-protein-shake/create-custom-protein-shake";
import CreateCustomBreakfastHash from "./pages/create-custom-breakfast-hash/create-custom-breakfast-hash";
import AdminHomePage from "./pages/admin-home-page/admin-home-page";
import {SplashPage} from "./pages/splash-page/splash-page"
import ManageInventory from "./pages/manage-inventory/manage-inventory";
import MainMenu from "./pages/main-menu/main-menu";
setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <SplashPage />
        </Route>
        <Route exact path="/admin-home-page">
          <AdminHomePage />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/main-menu">
          <MainMenu />
        </Route>

        <Route exact path="/recipes" >
          <RecipesPage />
        </Route>
        <Route exact path="/manage-inventory" >
          <ManageInventory />
        </Route>
        <Route exact path="/create-custom-protein-shake" >
          <CreateCustomProteinShakePage />
        </Route>
        <Route exact path="/create-custom-breakfast-hash" >
          <CreateCustomBreakfastHash />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
