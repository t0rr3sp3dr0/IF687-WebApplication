import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Forbidden from './Forbidden';
import InternalServerError from './InternalServerError';
import NotFound from './NotFound';
import ServiceUnavailable from './ServiceUnavailable';
import Unauthorized from './Unauthorized';

describe('Forbidden', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MuiThemeProvider>
                    <Forbidden />
                </MuiThemeProvider>
            ),
            div,
        );
    });
});

describe('InternalServerError', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MuiThemeProvider>
                    <InternalServerError />
                </MuiThemeProvider>
            ),
            div,
        );
    });
});

describe('NotFound', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MuiThemeProvider>
                    <NotFound />
                </MuiThemeProvider>
            ),
            div,
        );
    });
});

describe('ServiceUnavailable', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MuiThemeProvider>
                    <ServiceUnavailable />
                </MuiThemeProvider>
            ),
            div,
        );
    });
});

describe('Unauthorized', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            (
                <MuiThemeProvider>
                    <Unauthorized />
                </MuiThemeProvider>
            ),
            div,
        );
    });
});
