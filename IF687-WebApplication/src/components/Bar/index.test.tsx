import { mount } from 'enzyme';
import { MuiThemeProvider } from 'material-ui/styles';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router';
import Bar from '.';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        (
            <MuiThemeProvider>
                <StaticRouter context={{}}>
                    <Bar title="" />
                </StaticRouter>
            </MuiThemeProvider>
        ),
        div,
    );
});

describe('when user is not logged in', () => {
    test('Login button is visible', () => {
        const wrapper = mount((
            <MuiThemeProvider>
                <StaticRouter context={{}}>
                    <Bar title="" />
                </StaticRouter>
            </MuiThemeProvider>
        ));
        expect(wrapper.text()).toContain('Login');
    });
});
