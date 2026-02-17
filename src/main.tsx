import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx';
import {BrowserRouter} from "react-router-dom";
import {persistor,store} from "./utils/Redux/Store/mainStore.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';
import SocketProvider from './config/Socket.config.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <PersistGate  loading={null} persistor={persistor}>
      <SocketProvider>
      <App />
      </SocketProvider>
    </PersistGate>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
