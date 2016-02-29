import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './config/routes';
import {Provider} from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<Router>{routes}</Router>
	</Provider>,
	document.getElementById('app')
)