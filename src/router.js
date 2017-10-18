import React from "react";
import { Router, Switch, Route } from "dva/router";
import dynamic from "dva/dynamic";
import App from "./App";

function RouterConfig({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () =>
      import(/* webpackChunkName: "IndexPage" */ "./routes/IndexPage")
  });

  const Users = dynamic({
    app,
    //models: () => [import("./models/users")],
    component: () => import(/* webpackChunkName: "Users" */ "./routes/Users")
  });

  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <Route exact path="/users" component={Users} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
