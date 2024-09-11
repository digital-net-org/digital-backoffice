import React from 'react';
import { SdAvatar, SdButton, SdLoader, SdPopOver } from '@/digital-ui';
import { type Result, type UserModel } from '@/models';
import { useApiUser, useDigitalQuery } from '@/api';

export default function User() {
    const { id, logout, loading } = useApiUser();
    const { isLoading: userDataLoading, data } = useDigitalQuery<Result<UserModel>>(`/user/${id}`);
    const ref = React.useRef(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const handleMenu = () => setIsMenuOpen(!isMenuOpen);

    return userDataLoading ? (
        <SdLoader size="small" />
    ) : (
        <React.Fragment>
            <SdButton ref={ref} variant="icon" onClick={handleMenu}>
                {/*{data?.value.username ? <span>{data.value.username}</span> : null}*/}
                <SdAvatar size="small" />
            </SdButton>
            <SdPopOver anchor={ref.current} open={isMenuOpen} onClose={handleMenu} includeAnchor>
                <SdButton variant="text" onClick={logout} loading={loading}>
                    Logout
                </SdButton>
            </SdPopOver>
        </React.Fragment>
    );
}
