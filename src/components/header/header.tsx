import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Button } from "antd";
import { logOut, toggleLoginModal } from "../../store/app/app-slice";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routers";

const Header = () => {
    let navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.app);

    return (
        <div className={styles.header}>
            <div>
                <p className={styles.title} onClick={() => navigate("/")}>
                    Project W
                </p>
            </div>

            <div>
                <p onClick={() => navigate(RoutePaths.STORIES.ROOT)}>Сюжет</p>
            </div>

            <div>
                {isAuthenticated ? (
                    <Button onClick={() => dispatch(logOut())} type={"primary"}>
                        Выход
                    </Button>
                ) : (
                    <Button
                        onClick={() => dispatch(toggleLoginModal(true))}
                        type={"primary"}
                        color={"red"}
                    >
                        Вход
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Header;
