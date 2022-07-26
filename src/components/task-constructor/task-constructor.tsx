import React, { useEffect } from "react";
import styles from "./styles.module.scss";
import TaskStepper from "./task-stepper";
import TaskQuestion from "./task-question/task-question";
import TextModal from "../text-modal/text-modal";
import { ITask } from "../../types/ITask";
import TaskQuestionImage from "./task-question-image/task-question-image";
import { AnswersTypeEnum } from "../../types/AnswersTypeEnum";
import TaskSelectAnswersType from "./task-select-answers-type/task-select-answers-type";
import TaskAnswers from "./task-answers/task-answers";
import { IAnswer } from "../../types/IAnswer";
import TaskAnswerButton from "./task-answer-button/task-answer-button";
import TaskSettings from "./task-settings/task-settings";
import { ITaskSettings } from "../../types/ITaskSettings";

interface IProps {
    isEdit: boolean;
    currentStep: number;
    task: ITask | undefined;
    settings: ITaskSettings | undefined;
    isQuestionTextModalOpen: boolean;
    handleDeleteQuestionImage: () => void;
    setCurrentStep: (step: number) => void;
    handleLoadQuestionImage: (file: File) => void;
    handleEditQuestionText: (text: string) => void;
    setIsQuestionTextModalOpen: (payload: boolean) => void;
    handleSaveAnswersType: (type: AnswersTypeEnum) => void;
    handleSaveAnswerContent: (content: string) => void;
    handleSelectAnswer: (answerId: string) => void;
    handleCheckAnswers: () => void;
    handleSaveAnswers: () => void;
    handleSaveSettings: (payload: TaskSettingsDto) => void;
    selectedAnswersIds: string[];
    answers: IAnswer[];
}

const TaskConstructor = ({
    task,
    isEdit,
    answers,
    settings,
    currentStep,
    setCurrentStep,
    handleEditQuestionText,
    isQuestionTextModalOpen,
    setIsQuestionTextModalOpen,
    handleLoadQuestionImage,
    handleDeleteQuestionImage,
    handleSaveAnswersType,
    handleSaveAnswerContent,
    handleSelectAnswer,
    selectedAnswersIds,
    handleSaveAnswers,
    handleCheckAnswers,
    handleSaveSettings,
}: IProps) => {
    return (
        <React.Fragment>
            <TextModal
                isVisible={isQuestionTextModalOpen}
                setIsVisible={setIsQuestionTextModalOpen}
                handleSave={handleEditQuestionText}
                text={task?.question}
                title={"Редактирование вопроса"}
            />

            <div className={styles.taskConstructor}>
                <div className={styles.taskHeader}>
                    <TaskStepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
                </div>

                <div className={styles.taskBody}>
                    {(currentStep === 0 || currentStep === 1) && (
                        <React.Fragment>
                            <TaskQuestion
                                text={task?.question}
                                isEdit={isEdit}
                                handleEdit={() => setIsQuestionTextModalOpen(true)}
                            />

                            <TaskQuestionImage
                                imageName={task?.image}
                                isEdit={isEdit}
                                handleLoadQuestionImage={handleLoadQuestionImage}
                                handleDeleteQuestionImage={handleDeleteQuestionImage}
                            />

                            {isEdit && (
                                <TaskSelectAnswersType
                                    handleSaveAnswersType={handleSaveAnswersType}
                                    taskType={task?.answersType}
                                />
                            )}

                            {task?.answersType && (
                                <TaskAnswers
                                    answersType={task?.answersType}
                                    answers={answers}
                                    isEdit={isEdit}
                                    handleSaveAnswerContent={handleSaveAnswerContent}
                                    handleSelectAnswer={handleSelectAnswer}
                                    selectedAnswersIds={selectedAnswersIds}
                                />
                            )}

                            <TaskAnswerButton
                                isEdit={isEdit}
                                handleCheckAnswers={handleCheckAnswers}
                                handleSaveAnswers={handleSaveAnswers}
                                disabled={!selectedAnswersIds.length}
                            />
                        </React.Fragment>
                    )}

                    {currentStep === 2 && (
                        <TaskSettings handleSaveSettings={handleSaveSettings} settings={settings} />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default TaskConstructor;
