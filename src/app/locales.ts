import { type Namespace } from '@digital-lib/react-digital-localize';
export default {
    namespace: 'layout',
    fr: {
        navigation: {
            label: 'Navigation',
        },
        user: {
            actions: {
                logout: 'Déconnexion',
            },
        },
        configuration: {
            actions: {
                version: 'Version de l\'application:',
            },
        },
    },
    en: {
        navigation: {
            label: 'Navigation',
        },
        user: {
            actions: {
                logout: 'Logout',
            },
        },
        configuration: {
            actions: {
                version: 'Application version:',
            },
        },
    },
} satisfies Namespace;
