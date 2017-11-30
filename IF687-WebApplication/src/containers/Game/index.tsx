import { Card, CardActions, CardMedia, CardTitle, RaisedButton } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import store from '../../store';

interface S {
    title: string;
    subtitle: string;
    dataURL: string;
    uploading: boolean;
}

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

class Game extends React.Component<{}, S> {
    public static contextTypes?: PropTypes.ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    constructor(props: {}, context: {}) {
        super(props, context);

        this.state = {
            title: '',
            subtitle: '',
            dataURL: '',
            uploading: false,
        };
    }

    nextObject(): void {
        const words = [
            'Tesoura',
            'Garrafa',
            'Régua',
            'Quadro',
            'Computador',
            'Girafa',
            'Anel',
            'Bandeira',
            'Morango',
            'Abacaxi',
            'Controle Remoto',
            'Relógio',
            'Mouse',
            'Crachá',
            'Batata',
            'Capacete',
            'Gato',
            'Abacate',
            'Cadeira',
            'Sapato',
            'Óculos',
            'Fones de Ouvido',
        ];

        this.setState({
            ...this.state,
            title: words[Math.floor(Math.random() * words.length)],
            subtitle: '15s',
        });
    }

    componentWillMount(): void {
        const user = 'user';
        if (store.getState()[user] === null || store.getState()[user].trim().length === 0) {
            this.context.router.history.replace('/');
        } else {
            setInterval(() => {
                if (this.state.subtitle === '' || this.state.subtitle === '0s') {
                    this.nextObject();
                } else {
                    this.setState({
                        ...this.state,
                        subtitle: `${parseInt(this.state.subtitle.replace('s', ''), 10) - 1}s`,
                    });
                }
            }, 1000);
        }
    }

    render(): JSX.Element | null | false {
        return (
            <div style={styles.margin}>
                <Card>
                    <CardTitle
                        title={this.state.title}
                        subtitle={this.state.subtitle}
                    />
                    {this.state.dataURL ? (
                        <CardMedia>
                            <img src={this.state.dataURL} />
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
                                    style={this.state.uploading ? styles.black30 : styles.white}
                                >
                                    camera
                                </i>
                            )}
                            containerElement="label"
                            disabled={this.state.uploading}
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
                                    style={!this.state.dataURL || this.state.uploading ? styles.black30 : styles.white}
                                >
                                    file_upload
                                </i>
                            )}
                            disabled={!this.state.dataURL || this.state.uploading}
                            onClick={() => {
                                this.setState({
                                    ...this.state,
                                    uploading: true,
                                });

                                setTimeout(() => {
                                    this.setState({
                                        ...this.state,
                                        dataURL: '',
                                        uploading: false,
                                    });

                                    this.nextObject();
                                }, 4000);
                            }}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Game;
