import React, { type PropsWithChildren } from 'react';
import { type Config, type Data, Puck, usePuck } from '@measured/puck';
import { useClassName, useProps } from '@/utils';
import { type EditorContextProps, EditorProvider } from './EditorContext';
import { defaultPuckConfig, defaultPuckData } from './config';
import Toolbar from './Toolbar';
import Tool from './Tool';
import './Editor.styles.css';

export interface EditorProps extends PropsWithChildren<EditorContextProps> {
    data?: Data;
    config?: Config;
    onPublish?: () => void;
}

export default function Editor({ children, disabled, ...props }: EditorProps) {
    const className = useClassName({ disabled }, 'Editor');
    const { mapProps } = useProps({ disabled });

    const { appState } = usePuck();
    React.useEffect(() => console.log('PUCK: appState', appState), [appState]);

    return (
        <EditorProvider {...props}>
            <Puck data={props.data ?? defaultPuckData} config={props.config ?? defaultPuckConfig}>
                <div className={className}>
                    {mapProps(<Toolbar />)}
                    {mapProps(<Tool />)}
                    {mapProps(children)}
                </div>
            </Puck>
        </EditorProvider>
    );
}
