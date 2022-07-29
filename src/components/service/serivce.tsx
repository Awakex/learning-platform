import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ModalLayout from "../modal-layout/modal-layout";
import { toggleAppLoading, toggleLoginModal } from "../../store/app/app-slice";
import Auth from "../auth/auth";
import { Drawer } from "antd";
import DevPanel from "../dev-panel";
import jwtDecode from "jwt-decode";
import { loadUser } from "../../store/app/app-thunk";

const Service = () => {
    const dispatch = useAppDispatch();
    const { isLoginModalOpen, isAuthenticated, user } = useAppSelector((state) => state.app);
    const [isDevPanelOpen, setIsDevPanelOpen] = useState(false);

    useEffect(() => {
        let devToggle = (e: KeyboardEvent) => {
            if (e.code === "Slash") {
                setIsDevPanelOpen(!isDevPanelOpen);
            }
        };

        window.addEventListener("keypress", devToggle);
        return () => window.removeEventListener("keypress", devToggle);
    }, [isDevPanelOpen]);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            let decodedToken: any = jwtDecode(token);
            let currentDate = new Date();

            if (decodedToken.exp * 1000 > currentDate.getTime()) {
                if (user) {
                    dispatch(toggleAppLoading(false));
                    return;
                }

                dispatch(loadUser(decodedToken.user._id));
            } else {
                localStorage.removeItem("token");
                dispatch(toggleAppLoading(false));
            }
        }
    }, [isAuthenticated]);

    return (
        <React.Fragment>
            {isLoginModalOpen && (
                <ModalLayout
                    isVisible={isLoginModalOpen}
                    setIsVisible={(payload) => dispatch(toggleLoginModal(payload))}
                    title={"Авторизация"}
                >
                    <Auth />
                </ModalLayout>
            )}

            <Drawer
                title="DevPanel"
                placement={"right"}
                closable={false}
                onClose={() => setIsDevPanelOpen(false)}
                visible={isDevPanelOpen}
            >
                <DevPanel />
            </Drawer>
        </React.Fragment>
    );
};

export default Service;
