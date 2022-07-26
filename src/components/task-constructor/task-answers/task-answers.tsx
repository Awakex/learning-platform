import React, { useState } from "react";
import { AnswersTypeEnum } from "../../../types/AnswersTypeEnum";
import { IAnswer } from "../../../types/IAnswer";
import TaskAnswerClassicText from "./task-answer-classic-text/task-answer-classic-text";
import styles from "./styles.module.scss";
import { Button } from "antd";
import TextModal from "../../text-modal/text-modal";

interface IProps {
    answersType: AnswersTypeEnum;
    answers: IAnswer[];
    isEdit: boolean;
    handleSaveAnswerContent: (content: string) => void;
    handleSelectAnswer: (answerId: string) => void;
    selectedAnswersIds: string[];
}

const TaskAnswers = ({
    answers,
    answersType,
    isEdit,
    handleSaveAnswerContent,
    handleSelectAnswer,
    selectedAnswersIds,
}: IProps) => {
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const handleAddAnswer = () => {
        switch (answersType) {
            case AnswersTypeEnum.CLASSIC_TEXT:
                setIsTextModalOpen(true);
                return;
        }
    };

    const handleSave = (content: string) => {
        setIsTextModalOpen(false);
        handleSaveAnswerContent(content);
    };

    return (
        <div className={styles.taskAnswers}>
            {isEdit && answers?.length < 6 && (
                <React.Fragment>
                    <TextModal
                        isVisible={isTextModalOpen}
                        setIsVisible={setIsTextModalOpen}
                        handleSave={handleSave}
                        title={"Текстовый ответ"}
                    />

                    <Button type={"primary"} onClick={handleAddAnswer} style={{ marginBottom: 10 }}>
                        Добавить ответ
                    </Button>
                </React.Fragment>
            )}
            <div className={styles.answers}>
                {answers?.map((answer) => {
                    switch (answersType) {
                        case AnswersTypeEnum.CLASSIC_TEXT:
                            return (
                                <TaskAnswerClassicText
                                    key={answer._id}
                                    id={answer._id}
                                    content={answer.content}
                                    isActive={selectedAnswersIds.includes(answer._id)}
                                    handleClick={(id) => handleSelectAnswer(id)}
                                />
                            );
                    }
                })}
            </div>
        </div>
    );
};

export default TaskAnswers;
