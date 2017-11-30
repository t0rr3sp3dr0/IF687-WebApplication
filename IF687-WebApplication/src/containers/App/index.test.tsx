import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, StaticRouter } from 'react-router';
import { createStore } from 'redux';
import App from '.';
import reducers from '../../reducers';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        (
            <Provider store={createStore(reducers)}>
                <MuiThemeProvider>
                    <StaticRouter context={{}}>
                        <Route component={App} />
                    </StaticRouter>
                </MuiThemeProvider>
            </Provider>
        ),
        div,
    );
});
