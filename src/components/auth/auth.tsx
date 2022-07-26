import React, { useState } from "react";

import { useAppDispatch } from "../../hooks/redux";
import { LoginDto } from "../../dtos/LoginDto";
import { login, registration } from "../../store/app/app-thunk";
import { RegistrationDto } from "../../dtos/RegistrationDto";
import Registration from "./registration";
import Login from "./login";

const Auth = () => {
    const [isRegistration, setIsRegistration] = useState(false);
    const dispatch = useAppDispatch();

    const handleLogin = (loginDto: LoginDto) => {
        dispatch(login(loginDto));
    };

    const handleRegistration = (registrationDto: RegistrationDto) => {
        dispatch(registration(registrationDto));
    };

    return isRegistration ? (
        <Registration onFinish={handleRegistration} onShowLogin={() => setIsRegistration(false)} />
    ) : (
        <Login onFinish={handleLogin} onShowRegistration={() => setIsRegistration(true)} />
    );
};

export default Auth;
