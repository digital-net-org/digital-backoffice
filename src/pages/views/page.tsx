import { type ViewModel, type FrameModel } from '@/models';
import { Editor, digitalPuckConfig } from '@/puck';
import { Icon } from '@safari-digital/digital-ui';
import { t } from 'i18next';
import React from 'react';
import { PageEditor } from './components';
import { useViews, useFrames } from './utils';

/* TODO
    - Views should be handled by a separate page and not in the same editor as frames
    - Dissociate Puck from the editor
*/
export default function ViewsPage() {
    const { views, selectedView, setSelectedView, ...viewApi } = useViews();
    const { frames, selectedFrame, setSelectedFrame, ...frameApi } = useFrames();

    const isLoading = React.useMemo(
        () => viewApi.loading || frameApi.loading,
        [viewApi.loading, frameApi.loading],
    );

    return (
        <Editor
            data={selectedFrame?.data}
            loading={isLoading}
            config={digitalPuckConfig}
            disabled={!selectedFrame}
            renderStatus={selectedFrame?.name}
            actions={[
                {
                    key: 'save',
                    variant: 'primary',
                    children: (
                        <React.Fragment>
                            {t('global:actions.save')}
                            <Icon.FloppyIcon variant="filled" />
                        </React.Fragment>
                    ),
                    // TODO: Should use puck "onPublish api" ..?
                    onClick: () => frameApi.patch(selectedFrame?.id ?? 0, { data: selectedFrame?.data }),
                },
                {
                    key: 'delete',
                    children: <Icon.TrashIcon variant="filled" />,
                    onClick: () => void 0,
                },
                {
                    key: 'duplicate',
                    variant: 'icon',
                    children: <Icon.CopyIcon variant="filled" />,
                    onClick: () => void 0,
                    separator: true,
                },
            ]}
            tools={[
                {
                    key: 'views',
                    icon: Icon.CollectionIcon,
                    alwaysEnabled: true,
                    render: (
                        <PageEditor.Tools.EntitySelector<ViewModel>
                            title={t('editor:tools.views.title')}
                            elements={views}
                            selected={selectedView}
                            onSelect={setSelectedView}
                            onCreate={viewApi.create}
                            renderName={view => view.title}
                        />
                    ),
                },
                {
                    key: 'frames',
                    icon: Icon.LayerIcon,
                    separator: true,
                    alwaysEnabled: true,
                    render: (
                        <PageEditor.Tools.EntitySelector<FrameModel>
                            title={t('editor:tools.frames.title')}
                            elements={frames}
                            selected={selectedFrame}
                            onSelect={setSelectedFrame}
                            onCreate={frameApi.create}
                            renderName={frame => frame.name}
                        />
                    ),
                },
                {
                    key: 'components',
                    icon: Icon.DiamondIcon,
                    render: <PageEditor.Tools.Components />,
                },
                {
                    key: 'tree',
                    icon: Icon.DiagramIcon,
                    render: <PageEditor.Tools.Tree />,
                },
            ]}>
            <PageEditor.Frames.ViewConfig view={selectedView} />
            <PageEditor.Frames.Render data={selectedFrame?.data} />
            <PageEditor.Frames.Edit data={selectedFrame?.data} />
        </Editor>
    );
}
