import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LocaleProvider } from "antd";
import enUS from "antd/es/locale-provider/en_US";
import Loadable from "components/Loadable";
import AuthProvider from "components/Authorized/AuthProvider";

const App = props => {
  return (
    <LocaleProvider locale={enUS}>
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <Route
              path="/user"
              component={Loadable({
                loader: () => import("layouts/UserLayout"),
              })}
            />
            <Route
              path="/"
              component={Loadable({
                loader: () => import("layouts/BasicLayout"),
              })}
            />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    </LocaleProvider>
  );
};

export default App;
