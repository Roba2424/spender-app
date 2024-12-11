import { Provider } from "react-redux";
import App from "./App";
import ReactDOM from "react-dom/client";
import { store } from "./state-management/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
