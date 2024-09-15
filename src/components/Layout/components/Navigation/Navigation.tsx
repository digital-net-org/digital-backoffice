import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SdIcon, SdLogo } from '@/digital-ui';
import { appRoutes } from '@/router';
import { t } from 'i18next';
import LayoutMenu from '../common/LayoutMenu';
import './styles.css';

export default function Navigation() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    React.useEffect(() => console.log(pathname), [pathname]);

    const actions = React.useMemo(
        () =>
            appRoutes
                .filter(route => route.navigable)
                .sort((a, b) => a.path.localeCompare(b.path))
                .map(route => ({
                    label: t(`router:page.title.${route.name}`),
                    callback: () => navigate(route.path),
                    selected: pathname === route.path,
                })),
        [navigate],
    );

    return (
        <div className="Layout-navigation">
            <LayoutMenu
                actions={actions}
                icon={<SdIcon.MenuIcon />}
                label={t('layout:navigation.label')}
                direction="right"
            />
            <SdLogo />
        </div>
    );
}
