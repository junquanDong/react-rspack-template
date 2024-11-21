import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import Router from "@/@core/router";
import Redux from '@/@core/redux'
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={Redux.store}>
      <PersistGate loading={null} persistor={Redux.persistor}>
        <Router />
      </PersistGate>
    </Provider>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
