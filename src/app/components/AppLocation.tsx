import React from 'react';
import { t } from 'i18next';
import { Box } from '@digital-net/react-digital-ui';
import { useDigitalRouter } from '@digital-net/react-digital';

export default function AppLocation() {
    const { current } = useDigitalRouter();
    return (
        <Box justify="center" fullWidth>
            {t(`router:page.title.${current?.path}`)}
        </Box>
    );
}
