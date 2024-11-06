import {Provider} from "./components/ui/provider";
import {ColorModeProvider} from "./components/ui/color-mode";
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './main.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ScrollToTop from "./components/scrollToTop";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider>
                <ColorModeProvider forcedTheme="light">
                    <ScrollToTop/>
                    <App/>
                </ColorModeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
