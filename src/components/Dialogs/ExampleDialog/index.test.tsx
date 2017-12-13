import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ProfileDialog from '.';
import reducers from '../../../reducers';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        (
            <Provider store={createStore(reducers)}>
                <ProfileDialog />
            </Provider>
        ),
        div,
    );
});
