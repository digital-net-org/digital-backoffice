import React from 'react';
import type { CrudApiState } from '@/api';
import type { EntityBase } from '@/models';
import type { DefaultEditorConfiguration, Tool } from '../types';

export interface EditorContextState<T extends EntityBase, TRaw = T>
    extends DefaultEditorConfiguration<T, TRaw>,
        CrudApiState<T, TRaw> {
    selectedModel?: T;
    selectModel: (id?: EntityBase<string | number>['id']) => void;
    selectedTool?: Tool;
    selectTool: (value: Tool) => void;
}

export const defaultValues: EditorContextState<any> = {
    // configuration
    api: '',
    tools: [],
    actions: [],
    disabled: false,
    // state
    selectedModel: undefined,
    selectModel: () => void 0,
    selectedTool: undefined,
    selectTool: () => void 0,
    // api
    models: [],
    patch: () => void 0,
    delete: () => void 0,
    create: () => void 0,
    set: () => void 0,
    refetchQuery: async () => void 0,
    isPatching: false,
    isDeleting: false,
    isCreating: false,
    isQuerying: false,
    isLoading: false,
};

export const EditorContext = React.createContext<EditorContextState<any>>(defaultValues);
