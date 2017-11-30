import * as firebase from 'firebase';
import { AppBar, Avatar, Divider, FlatButton, IconButton, IconMenu, MenuItem, Subheader } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { RouterProps } from 'react-router';
import { User } from '../../models';
import store from '../../store';

type P = Readonly<{}> & {
    title: string,
    user?: User,
};

const styles: {
    [key: string]: React.CSSProperties;
} = {
    noMargin: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0,
    },
    noPadding: {
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
    },
};

const origin: __MaterialUI.propTypes.origin = {
    horizontal: 'right',
    vertical: 'top',
};

const iconStyleRight = (user: User | undefined): React.CSSProperties => user ? {} : {
    ...styles.noMargin,
    marginRight: '-16px',
    lineHeight: '64px',
    verticalAlign: 'middle',
};

const iconElementRight = (user: User | undefined, router: RouterProps): React.ReactElement<{}> => user ? (
    <IconMenu
        iconButtonElement={
            <IconButton style={styles.noPadding}>
                <Avatar src={user.picture} />
            </IconButton>}
        targetOrigin={origin}
        anchorOrigin={origin}
    >
        <Subheader>{user.name}</Subheader>
        <MenuItem
            primaryText="Profile"
            onClick={() => store.dispatch({
                type: 'PROFILE_DIALOG_ACTION',
                payload: {
                    open: true,
                    user,
                },
            })}
        />
        <Divider />
        <MenuItem primaryText="Sign Out" onClick={() => firebase.auth().signOut()} />
    </IconMenu>
) : (
    <FlatButton
        label="Login"
        style={styles.noMargin}
        onClick={() => store.dispatch({
            type: 'OPEN_AUTH_DIALOG_ACTION',
        })}
    />
);

class Bar extends React.Component<P> {
    public static contextTypes?: PropTypes.ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    public render(): JSX.Element | null | false {
        const { title, user } = this.props;

        return (
            <AppBar
                title={title}
                iconStyleRight={iconStyleRight(user)}
                iconElementRight={iconElementRight(user, this.context.router)}
                onLeftIconButtonTouchTap={() => store.dispatch({
                    type: 'OPEN_DRAWER_ACTION',
                })}
            />
        );
    }
}

export default Bar;
