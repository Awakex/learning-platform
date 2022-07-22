import React, { memo } from "react";
import styles from "./styles.module.scss";
import ActionButtons from "../../action-buttons/action-buttons";

interface IProps {
    text?: string;
    isEdit: boolean;
    handleEdit: (text: string) => void;
}

const TaskQuestion = memo(({ text, isEdit, handleEdit }: IProps) => {
    return (
        <div className={styles.question}>
            <p className={styles.questionText}>{text ? text : "Нет вопроса"}</p>
            {isEdit && (
                <ActionButtons handleEdit={handleEdit} handleDelete={() => console.log("delete")} />
            )}
        </div>
    );
});

export default TaskQuestion;
