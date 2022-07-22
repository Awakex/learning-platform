import React, { useState } from "react";
import Login from "./Login";
import { useAppDispatch } from "../../hooks/redux";
import { LoginDto } from "../../types/LoginDto";
import { login, registration } from "../../store/app/AppThunk";
import Registration from "./Registration";
import { RegistrationDto } from "../../types/RegistrationDto";

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
