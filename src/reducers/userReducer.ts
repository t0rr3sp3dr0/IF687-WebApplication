import { AnyAction, Reducer } from 'redux';

type S = string | null;

const reducer: Reducer<S> = (state: S, action: AnyAction): S => {
    const payload = 'payload';

    switch (action.type) {
        case 'USER_ACTION':
            return action[payload];

        default:
            return state ? state : null;
    }
};

export default reducer;
