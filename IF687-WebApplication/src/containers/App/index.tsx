import { AppBar } from 'material-ui';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { ValidationMap } from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import '../../../node_modules/material-design-icons/iconfont/material-icons.css';
import Dialogs from '../../components/Dialogs';
import { emptyP } from '../../util/decorators';
import NotFound from '../errorDocuments/NotFound';
import Game from '../Game/index';
import Home from '../Home/index';

type P = RouteComponentProps<{}>;

const styles: {
    [key: string]: React.CSSProperties;
} = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'auto [content-start] minmax(320px, 1080px) [content-end] auto',
    },
    content: {
        gridColumn: 'content-start / content-end',
    },
    link: {
        textDecoration: 'none',
    },
};

// noinspection TsLint
const route = (path: string, Component: React.ComponentType<RouteComponentProps<{}> | {}>): React.ReactNode => (
    <Route exact={true} path={path} component={Component} />
);

class App extends React.Component<P> {
    public static contextTypes?: ValidationMap<{}> = {
        router: PropTypes.object.isRequired,
    };

    public render(): JSX.Element | null | false {
        return (
            <div>
                <AppBar
                    title="Introdução à Multimídia"
                    showMenuIconButton={false}
                />

                <div style={styles.grid}>
                    <div style={styles.content}>
                        <Switch>
                            {route('/', Home)}
                            {route('/game', Game)}
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>

                <Dialogs />
            </div>
        );
    }
}

export default emptyP(App);
