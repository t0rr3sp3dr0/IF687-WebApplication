import { Card, CardActions, RaisedButton, TextField } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { emptyP } from '../../util/decorators';
import * as request from 'request-promise';

interface S {
    user: string | null;
}

interface D {
    userAction: (payload: string) => void;
}

type P = RouteComponentProps<{}>;

const styles: {
    [key: string]: React.CSSProperties;
} = {
    black30: {
        color: 'rgba(0, 0, 0, 0.3)',
    },
    center: {
        textAlign: 'center',
    },
    input: {
        verticalAlign: 'middle',
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
    label: {
        verticalAlign: 'middle',
    },
    margin: {
        margin: 16,
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
    white: {
        color: 'white',
    },
};

class Home extends React.Component<S & D & P> {
    public static contextTypes?: PropTypes.ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    render(): JSX.Element | null | false {
        const { user } = this.props;

        return (
            <div style={styles.margin}>
                <Card style={styles.center}>
                    <TextField
                        floatingLabelText="Nickname"
                        onChange={(e, newValue) => this.props.userAction(newValue)}
                    />
                    <br />
                    <CardActions>
                        <RaisedButton
                            label="Play"
                            labelStyle={styles.label}
                            secondary={true}
                            icon={(
                                <i
                                    className="material-icons"
                                    style={styles.white}
                                >
                                    videogame_asset
                                </i>
                            )}
                            onClick={() => {
                                if (user !== null && user.trim().length > 0) {
                                    request({
                                        method: 'POST',
                                        uri: 'http://67.207.87.198:8000/api/enterRoom/',
                                        body: {
                                            userName: user!,
                                        },
                                        json: true,
                                    })
                                        .then(() => {
                                            this.context.router.history.push('/game');
                                        })
                                        .catch(error => {
                                            alert(error.error.messageError);
                                        });
                                }
                            }}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default emptyP(connect<S, D, P>(
    (store: S): S => ({
        user: store.user,
    }),
    (dispatch): D => ({
        userAction: (payload: string) => dispatch({
            type: 'USER_ACTION',
            payload: payload,
        }),
    }),
)(Home));
