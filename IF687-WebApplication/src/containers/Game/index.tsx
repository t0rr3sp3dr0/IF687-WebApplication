import { Card, CardActions, CardMedia, CardTitle, List, ListItem, RaisedButton } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import * as request from 'request-promise';
import { emptyP } from '../../util/decorators';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

const winSounds = [
    require('../../assets/win/0.m4a'),
    require('../../assets/win/1.m4a'),
    require('../../assets/win/2.m4a'),
    require('../../assets/win/3.m4a'),
    require('../../assets/win/4.m4a'),
];

const failSounds = [
    require('../../assets/fail/0.m4a'),
    require('../../assets/fail/1.m4a'),
    require('../../assets/fail/2.m4a'),
    require('../../assets/fail/3.m4a'),
    require('../../assets/fail/4.m4a'),
];

interface S {
    title: string;
    subtitle: string;
    dataURL: string;
    uploading: boolean;
    users: string[];
}

type P = RouteComponentProps<{}> & {
    user: string | null;
};

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
    grid: {
        display: 'grid',
        gridTemplateColumns: '[col-start] 1fr [col-middle] 1fr [col-end]',
        marginTop: 16,
    },
    col0: {
        gridColumn: 'col-start / col-middle',
        marginRight: 8,
    },
    col1: {
        gridColumn: 'col-middle / col-end',
        marginLeft: 8,
    },
    marginTop: {
        marginTop: 16,
    },
};

class Game extends React.Component<P, S> {
    public static contextTypes?: PropTypes.ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    constructor(props: P, context: {}) {
        super(props, context);

        this.state = {
            title: '',
            subtitle: '',
            dataURL: '',
            uploading: false,
            users: [],
        };
    }

    getObject(): void {
        request({
            method: 'GET',
            uri: 'http://67.207.87.198:8000/api/currentObject/',
            json: true,
        })
            .then(value => {
                const { title } = this.state;

                const content = 'content';
                const name = 'name';
                const nextChange = 'nextChange';

                const ms = Date.parse(value[content][nextChange]) - Date.now();

                this.setState({
                    ...this.state,
                    title: value[content][name],
                    subtitle: `${Math.round(ms / 1000)}s`,
                    ...value[content][name] === title ? {} : {
                        dataURL: '',
                        uploading: false,
                    },
                });

                setTimeout(this.getObject.bind(this), ms);
            })
            .catch(console.log);
    }

    getUsers(): void {
        request({
            method: 'GET',
            uri: 'http://67.207.87.198:8000/api/onlineUsers/',
            json: true,
        })
            .then(value => {
                const content = 'content';
                const name = 'name';
                const points = 'points';

                const users = [];
                for (const user of value[content]) {
                    users.push(`${String(user[points]).padStart(8, '0')}\0${user[name]}`);
                }

                this.setState({
                    ...this.state,
                    users,
                });

                setTimeout(this.getUsers.bind(this), 1000);
            })
            .catch(console.log);
    }

    componentWillMount(): void {
        const { user } = this.props;

        if (user === null || user.trim().length === 0) {
            this.context.router.history.replace('/');
        } else {
            this.getUsers();
            setInterval(() => {
                const { subtitle } = this.state;

                if (subtitle === '' || subtitle === '0s') {
                    this.getObject();
                } else {
                    this.setState({
                        ...this.state,
                        subtitle: `${parseInt(subtitle.replace('s', ''), 10) - 1}s`,
                    });
                }
            }, 1000);
        }
    }

    render(): JSX.Element | null | false {
        const { user } = this.props;
        const { title, subtitle, dataURL, uploading, users } = this.state;

        return (
            <div style={styles.margin}>
                <Card>
                    <CardTitle
                        title={title.charAt(0).toUpperCase() + title.substring(1)}
                        subtitle={subtitle}
                    />
                    {dataURL ? (
                        <CardMedia>
                            <img src={dataURL} />
                        </CardMedia>
                    ) : false}
                    <CardActions style={styles.center}>
                        <RaisedButton
                            label="Take Picture"
                            labelStyle={styles.label}
                            primary={true}
                            icon={(
                                <i
                                    className="material-icons"
                                    style={uploading ? styles.black30 : styles.white}
                                >
                                    camera
                                </i>
                            )}
                            containerElement="label"
                            disabled={uploading}
                        >
                            <input
                                type="file"
                                style={styles.input}
                                accept="image/*"
                                onChange={event => {
                                    const file: File = event.target.files![0];

                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = ev => {
                                            const target = ev.target as FileReader;
                                            if (target.readyState === 2) {
                                                this.setState({
                                                    ...this.state,
                                                    dataURL: target.result as string,
                                                });
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    } else {
                                        this.setState({
                                            ...this.state,
                                            dataURL: '',
                                        });
                                    }
                                }}
                            />
                        </RaisedButton>
                        <RaisedButton
                            label="Submit"
                            labelStyle={styles.label}
                            secondary={true}
                            icon={(
                                <i
                                    className="material-icons"
                                    style={!dataURL || uploading ? styles.black30 : styles.white}
                                >
                                    file_upload
                                </i>
                            )}
                            disabled={!dataURL || uploading}
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    uploading: true,
                                });

                                const colon = dataURL.indexOf(':');
                                const semicolon = dataURL.indexOf(';');
                                const comma = dataURL.indexOf(',');
                                request({
                                    method: 'POST',
                                    uri: 'http://67.207.87.198:8000/api/uploadImg/',
                                    body: {
                                        img: `${dataURL.slice(comma + 1)}`,
                                        imgType: `${dataURL.slice(colon + 1, semicolon)}`,
                                        userName: user!,
                                    },
                                    json: true,
                                }).then(value => {
                                    const content = 'content';
                                    const correct = 'correct';

                                    if (!value[content][correct]) {
                                        const audio = new Audio(
                                            failSounds[Math.floor(Math.random() * failSounds.length)]
                                        );
                                        audio.load();
                                        audio.play().catch(console.log);

                                        this.setState({
                                            ...this.state,
                                            dataURL: '',
                                            uploading: false,
                                        });
                                    } else {
                                        const audio = new Audio(
                                            winSounds[Math.floor(Math.random() * winSounds.length)]
                                        );
                                        audio.load();
                                        audio.play().catch(console.log);
                                    }
                                });
                            }}
                        />
                    </CardActions>
                </Card>
                <Card style={styles.marginTop}>
                    <List>
                        {users.sort().reverse().map((value: string, index: number): React.ReactNode => (
                            <ListItem
                                primaryText={value.split('\0')[1]}
                                secondaryText={String(parseInt(value.split('\0')[0], 10))}
                                key={value.split('\0')[1]}
                            />
                        ))}
                    </List>
                </Card>
            </div>
        );
    }
}

export default emptyP(connect<{
    user: string | null;
}>(
    (store: {
        user: string | null;
    }): {
        user: string | null;
    } => ({
        user: store.user,
    }),
)(Game));
