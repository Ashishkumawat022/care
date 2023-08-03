import React from 'react';
// import { Provider } from 'react-dnd/lib/cjs/DragDropContext';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalContextProvider } from "./admin/store/global-context";
import { store } from "./redux-toolkit/redux_store/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();