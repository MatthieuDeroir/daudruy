import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { I18nextProvider } from "react-i18next";
import i18n from "./translate/i18n";
import { CustomThemeProvider } from './context/ThemeModeContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 
    <CustomThemeProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </CustomThemeProvider>
);
