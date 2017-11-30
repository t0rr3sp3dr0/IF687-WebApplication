import { Avatar, CardTitle, Dialog } from 'material-ui';
import * as React from 'react';
import { connect } from 'react-redux';
import { User } from '../../../models';

interface S {
    open: boolean;
    user: User | null;
}

interface D {
    closeProfileDialogAction: () => void;
}

interface P {
    onRequestClose?: () => void;
}

const styles: {
    [key: string]: React.CSSProperties;
} = {
    flex: {
        display: 'flex',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        padding: 24,
    },
    a: {
        color: 'inherit',
        textDecoration: 'inherit',
    },
};

class ExampleDialog extends React.Component<S & D & P> {
    public render(): JSX.Element | null | false {
        const { open, user, closeProfileDialogAction, onRequestClose } = this.props;

        return user ? (
            <Dialog
                modal={false}
                open={open}
                onRequestClose={() => {
                    closeProfileDialogAction();

                    if (onRequestClose) {
                        onRequestClose();
                    }
                }}
            >
                <div
                    style={styles.flex}
                >
                    <Avatar
                        src={user.picture}
                        size={192}
                    />
                    <div
                        style={{
                            ...styles.flex,
                            ...styles.center,
                        }}
                    >
                        <CardTitle
                            title={user.name}
                            subtitle={(
                                <a
                                    href={`mailto:${user.email}`}
                                    style={styles.a}
                                >
                                    {user.email}
                                </a>
                            )}
                            style={styles.cardTitle}
                        />
                    </div>
                </div>
            </Dialog>
        ) : false;
    }
}

export default connect<S, D, P, {
    profileDialog: {
        open: boolean;
        user: User | null;
    };
}>(
    (store): S => ({
        open: store.profileDialog.open,
        user: store.profileDialog.user,
    }),
    (dispatch): D => ({
        closeProfileDialogAction: () => dispatch({
            type: 'CLOSE_PROFILE_DIALOG_ACTION',
        }),
    }),
)(ExampleDialog);
