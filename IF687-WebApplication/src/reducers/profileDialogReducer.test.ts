import { createStore } from 'redux';
import { User } from '../models';
import reducer from './profileDialogReducer';

it('has expected default state', () => {
    const store = createStore(reducer);
    expect(store.getState()).toEqual({
        open: false,
        user: null,
    });
});

it('has expected state when action OPEN_PROFILE_DIALOG_ACTION has been dispatched', () => {
    const store = createStore(reducer);
    store.dispatch({
        type: 'OPEN_PROFILE_DIALOG_ACTION',
    });

    expect(store.getState()).toEqual({
        open: true,
        user: null,
    });
});

it('has expected state when action CLOSE_PROFILE_DIALOG_ACTION has been dispatched', () => {
    const store = createStore(reducer);
    store.dispatch({
        type: 'CLOSE_PROFILE_DIALOG_ACTION',
    });

    expect(store.getState()).toEqual({
        open: false,
        user: null,
    });
});

it('has expected state when action PROFILE_DIALOG_ACTION has been dispatched', () => {
    const user = new User();

    const store = createStore(reducer);
    store.dispatch({
        type: 'PROFILE_DIALOG_ACTION',
        payload: {
            open: true,
            user: user,
        },
    });

    expect(store.getState()).toEqual({
        open: true,
        user: user,
    });
});
