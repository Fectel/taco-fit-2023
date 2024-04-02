import { Redirect, Route } from 'react-router-dom';
import {IonApp, IonLoading, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

import '@ionic/react/css/core.css';
import React from "react";


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
import ManageInventory from "./pages/manage-inventory/manage-inventory";
import MainMenu from "./pages/main-menu/main-menu";
import SelectedMenuItemComponent from "./pages/selected-menu--item-component/selected-menu-item-component";
import MenuComboPage from "./pages/menu-combo-page/menu-combo-page";
import MenuComboPage2 from "./pages/menu-combo-page/menu-combo-page-2";

import {useAuthInit, AuthContext, useAuth} from "./auth";
import CheckInPage from "./pages/check-in-page/check-in-page";
import EmployeeDashboard from "./pages/employee-dashboard/employee-dashboard";
import EmployeeAppTabs from "./Employee-App-Tabs";
import AdminAppTabs from "./Admin-App-Tabs";
import RecipesPage2 from './pages/recipes-page/recipes-page-2';
setupIonicReact();


const App: React.FC = () => {


  const {loading, auth} = useAuthInit();



  if (loading) {
    return <IonLoading isOpen={true}/>;
  }

  // @ts-ignore
  return (
      <IonApp>
        <AuthContext.Provider
            // @ts-ignore
            value={auth}
        >
          <IonReactRouter>
            <IonRouterOutlet>
              <Route exact path="/home">
                <CheckInPage />
              </Route>

              {/*<Route exact path="/menu-combo-page">*/}
              {/*  <MenuComboPage2 />*/}
              {/*</Route>*/}

              {/*<Route exact path="/menu-combo-page">*/}
              {/*  <MenuComboPage />*/}
              {/*</Route>*/}


              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/employee">
                <EmployeeAppTabs  />
              </Route>
              <Route path="/admin">
                <AdminAppTabs  />
              </Route>
              <Route exact path="/main-menu">
                <MainMenu />
              </Route>




              {/*<Route exact path="/recipes2" >*/}
              {/*  <RecipesPage2 />*/}
              {/*</Route>*/}
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
        </AuthContext.Provider>

      </IonApp>
      )

}
export default App;
