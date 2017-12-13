import * as React from 'react';

export function emptyP(Component: React.ComponentType): React.ComponentType {
    return class Clazz extends React.Component {
        render(): JSX.Element | null | false {
            return (
                <Component {...this.props} />
            );
        }
    };
}
