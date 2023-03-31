import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ContextRootStore, store } from './mst/store/RootStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ContextRootStore.Provider value={store}>
		<App />
	</ContextRootStore.Provider>,
);
