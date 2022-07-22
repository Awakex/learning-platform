import React from "react";
import styles from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { Button } from "antd";
import { logOut, toggleLoginModal } from "../../store/app/AppSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.app);

    return (
        <div className={styles.header}>
            <p className={styles.title}>Project W</p>

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
