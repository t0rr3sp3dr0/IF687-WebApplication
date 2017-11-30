import * as React from 'react';
import ExampleDialog from './ExampleDialog';

class Dialogs extends React.Component {
    render(): JSX.Element | null | false {
        return (
            <div>
                <ExampleDialog />
            </div>
        );
    }
}

export default Dialogs;
