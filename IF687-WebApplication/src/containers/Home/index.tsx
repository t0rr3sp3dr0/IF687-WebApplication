import { Card, CardActions, RaisedButton, TextField } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { emptyP } from '../../util/decorators';

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

class Home extends React.Component<D & P> {
    public static contextTypes?: PropTypes.ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    render(): JSX.Element | null | false {
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
                                this.context.router.history.push('/game');
                            }}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default emptyP(connect<void, D, P>(
    null,
    (dispatch): D => ({
        userAction: (payload: string) => dispatch({
            type: 'USER_ACTION',
            payload: payload,
        }),
    }),
)(Home));
