import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { LocaleProvider } from "antd";
import enUS from "antd/es/locale-provider/en_US";
import Loadable from "components/Loadable";

const App = props => {
  return (
    <LocaleProvider locale={enUS}>
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
    </LocaleProvider>
  );
};

export default App;
