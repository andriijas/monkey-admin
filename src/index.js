import dva from "dva";
import createHistory from "history/createBrowserHistory";
import createLoading from "dva-loading";
import { message } from "antd";
import registerServiceWorker from "./registerServiceWorker";
import RouterConfig from "./router";
//import "./index.css";

const app = dva({
  history: createHistory(),
  onError(e) {
    message.error(e.message, 3);
  }
});

app.use(
  createLoading({
    effects: true
  })
);
app.router(RouterConfig);
app.start("#root");

registerServiceWorker();
