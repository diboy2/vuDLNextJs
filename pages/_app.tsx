/* eslint react/prop-types: 0 */
import React from "react";
import { FetchContextProvider } from "../context/FetchContext";
import { PaginatorContextProvider } from "../context/PaginatorContext";

import "../styles/normalize.css";
import "../styles/application.css";
import "../styles/client.css";
import "../styles/justgrid.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function MyApp({ Component, pageProps }) {
    return (
        <PaginatorContextProvider>
            <FetchContextProvider>
                <Component {...pageProps} />
            </FetchContextProvider>
        </PaginatorContextProvider>
    );
}

export default MyApp;
