import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ModalLayout from "../ModalLayout/ModalLayout";
import { toggleLoginModal } from "../../store/app/AppSlice";
import Auth from "../Auth/Auth";
import jwtDecode from "jwt-decode";
import { loadUser } from "../../store/app/AppThunk";

const Service = () => {
    const dispatch = useAppDispatch();
    const { isLoginModalOpen, user, isAuthenticated } = useAppSelector((state) => state.app);

    useEffect(() => {
        let token = localStorage.getItem("token");

        if (token) {
            let decodedToken: any = jwtDecode(token);
            let currentDate = new Date();

            if (decodedToken.exp * 1000 > currentDate.getTime()) {
                if (user) return;
                dispatch(loadUser(decodedToken.user._id));
            } else {
                localStorage.removeItem("token");
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
        </React.Fragment>
    );
};

export default Service;
