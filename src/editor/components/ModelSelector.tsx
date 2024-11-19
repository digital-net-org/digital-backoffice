import React from 'react';
import { t } from 'i18next';
import { Button, Icon } from '@safari-digital/digital-ui';
import type { EntityBase } from '@/models';
import Tool from './Tool';
import useEditor from '../useEditor';

export default function ModelSelector() {
    const { api, create, onCreate, models, selectedModel, selectModel, renderModelName, isLoading } =
        useEditor<EntityBase>();

    return (
        <Tool
            title={t(`editor:${api}.tool.title`)}
            actions={[
                {
                    icon: Icon.AddIcon,
                    action: () => (onCreate ? onCreate(create) : create({})),
                },
            ]}>
            <div className="Editor-model-selector">
                {models.map(e => (
                    <Button
                        key={e.id}
                        variant="icon"
                        disabled={isLoading}
                        fullWidth
                        selected={e.id === selectedModel?.id}
                        onClick={() => (!isLoading ? selectModel(e.id) : void 0)}>
                        {renderModelName?.(e) ?? e.id}
                    </Button>
                ))}
            </div>
        </Tool>
    );
}
