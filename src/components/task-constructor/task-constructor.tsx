import React from "react";
import styles from "./styles.module.scss";
import TaskStepper from "./task-stepper";
import TaskQuestion from "./task-question/task-question";
import TextEditModal from "../text-edit-modal/text-edit-modal";
import { ITask } from "../../types/ITask";
import TaskQuestionImage from "./task-question-image/task-question-image";
import TaskAnswers from "./task-answers/task-answers";
import { AnswersTypeEnum } from "../../types/AnswersTypeEnum";

interface IProps {
    isEdit: boolean;
    currentStep: number;
    task: ITask | undefined;
    isQuestionTextModalOpen: boolean;
    handleDeleteQuestionImage: () => void;
    setCurrentStep: (step: number) => void;
    handleLoadQuestionImage: (file: File) => void;
    handleEditQuestionText: (text: string) => void;
    setIsQuestionTextModalOpen: (payload: boolean) => void;
    handleSaveAnswersType: (type: AnswersTypeEnum) => void;
}

const TaskConstructor = ({
    currentStep,
    setCurrentStep,
    task,
    handleEditQuestionText,
    isQuestionTextModalOpen,
    setIsQuestionTextModalOpen,
    handleLoadQuestionImage,
    handleDeleteQuestionImage,
    handleSaveAnswersType,
    isEdit,
}: IProps) => {
    return (
        <React.Fragment>
            <TextEditModal
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

                    <TaskAnswers
                        handleSaveAnswersType={handleSaveAnswersType}
                        taskType={task?.answersType}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default TaskConstructor;
