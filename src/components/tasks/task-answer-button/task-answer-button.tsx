import { Button } from "antd";
import React from "react";
import styles from "./styles.module.scss";

interface IProps {
    isEdit: boolean;
    handleSaveAnswers: () => void;
    handleCheckAnswers: () => void;
    disabled: boolean;
}

const TaskAnswerButton = ({ isEdit, handleCheckAnswers, handleSaveAnswers, disabled }: IProps) => {
    return (
        <div className={styles.TaskAnswerButtonWrapper}>
            <Button
                type={"primary"}
                size={"large"}
                block
                className={styles.TaskAnswerButton}
                disabled={disabled}
                onClick={isEdit ? () => handleSaveAnswers() : () => handleCheckAnswers()}
            >
                {isEdit ? "Сохранить выбранные ответы" : "Ответить"}
            </Button>
        </div>
    );
};

export default TaskAnswerButton;
