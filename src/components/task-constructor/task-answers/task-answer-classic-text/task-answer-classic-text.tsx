import React from "react";
import styles from "./styles.module.scss";
import cn from "classnames";

interface IProps {
    id: string;
    content: string;
    isActive: boolean;
    handleClick: (id: string) => void;
}

const TaskAnswerClassicText = ({ id, content, isActive, handleClick }: IProps) => {
    return (
        <div
            onClick={() => handleClick(id)}
            className={cn({
                [styles.taskAnswerClassicText]: true,
                [styles.taskAnswerClassicTextInactive]: !isActive,
                [styles.taskAnswerClassicTextActive]: isActive,
            })}
        >
            <p>{content}</p>
        </div>
    );
};

export default TaskAnswerClassicText;
