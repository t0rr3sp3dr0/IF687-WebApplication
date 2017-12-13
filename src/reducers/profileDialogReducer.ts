import { AnyAction, Reducer } from 'redux';
import { User } from '../models';

type S = {
    open: boolean,
    user: User | null,
} | null;

const reducer: Reducer<S> = (state: S, action: AnyAction): S => {
    const open = 'open';
    const payload = 'payload';
    const user = 'user';

    switch (action.type) {
        case 'OPEN_PROFILE_DIALOG_ACTION':
            return {
                open: true,
                user: state ? state.user : null,
            };

        case 'CLOSE_PROFILE_DIALOG_ACTION':
            return {
                open: false,
                user: state ? state.user : null,
            };

        case 'PROFILE_DIALOG_ACTION':
            return {
                open: action[payload][open],
                user: action[payload][user],
            };

        default:
            return state ? state : {
                open: false,
                user: null,
            };
    }
};

export default reducer;
