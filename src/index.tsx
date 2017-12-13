import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

ReactDOM.render(
    (
        <Provider store={store}>
            <MuiThemeProvider>
                <Router>
                    <Route component={App} />
                </Router>
            </MuiThemeProvider>
        </Provider>
    ),
    document.getElementById('root') as HTMLElement,
);
registerServiceWorker();
