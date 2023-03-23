import React, { Suspense, useContext, useEffect, useState } from "react";
import { Router, Switch, Route } from "react-router-dom";
import "App.css";

import history from "./Utils/history";
import Routes from "./Constants/routes";
import UserContext from "Context/userContext";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./Components/homePage";
import ProductList from "Components/productList";
import mixpanel from "mixpanel-browser";
// import NavBar from './Components/common/navBar';

const DashboardComponent = React.lazy(() => import("./Screens/dashboard"));
const NavBar = React.lazy(() => import("Components/common/navBar"));
const AddWish = React.lazy(() => import("Screens/addWish"));
const Terms = React.lazy(() => import("Components/terms"));
// const Footer = React.lazy(() => import("Components/common/footer"))
// const HomePage = React.lazy(() => import("Components/homePage"))

const AppComponent = () => {
  const [, updateUsers] = useContext(UserContext);

  useEffect(() => {
    mixpanel.init("yourmipanelid", {
      debug: process.env.NODE_ENV === "production" && true,
    });
    import("@sentry/react").then((Sentry) =>
      import("@sentry/tracing").then(({ Integrations }) => {
        Sentry.init({
          dsn: "yoursentrydsn",
          autoSessionTracking: true,
          integrations: [new Integrations.BrowserTracing()],

          // We recommend adjusting this value in production, or using tracesSampler
          // for finer control
          tracesSampleRate: 1.0,
        });
      })
    );
  }, []);

  useEffect(() => {
    import("Components/Firebase").then(({ auth }) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          updateUsers({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            emailVerified: user.emailVerified,
          });
        } else {
          updateUsers({});
        }
      });
    });
  }, [updateUsers]);

  return (
    <div className="App">
      <Router history={history}>
        <Suspense
          fallback={
            <div className="bg-red text-white pl-4 w-full fixed top-0 left-0">
              Instant help:{" "}
              <a href="mailto:contact@wishgee.com">contact@wishgee.com</a>
            </div>
          }
        >
          <NavBar />
        </Suspense>
        <Switch>
          <Route exact path={Routes.HOME}>
            <Suspense fallback={<div>Please wait...</div>}>
              <HomePage />
            </Suspense>
          </Route>
          <Route path={[Routes.MAKE_WISH, Routes.ADD_WISH]}>
            <Suspense fallback={<div>Please wait...</div>}>
              <AddWish />
            </Suspense>
          </Route>
          <Route path={Routes.DASHBOARD}>
            <Suspense fallback={<div>Please wait...</div>}>
              <DashboardComponent />
            </Suspense>
          </Route>
          <Route path={Routes.PRODUCT_LIST}>
            <Suspense fallback={<div>Please wait...</div>}>
              <ProductList />
            </Suspense>
          </Route>
          <Route path={Routes.TERMS}>
            <Suspense fallback={<div>Please wait...</div>}>
              <Terms />
            </Suspense>
          </Route>
          <PrivateRoute />
        </Switch>
        <Suspense fallback={<div>Please wait...</div>}>
          {/* <Footer /> */}
        </Suspense>
      </Router>
    </div>
  );
};

const App = () => {
  const userData = useState(UserContext);
  return (
    <UserContext.Provider value={userData}>
      <AppComponent />
    </UserContext.Provider>
  );
};

export default App;
