import React, { useState } from "react";
import styles from "./styles.module.scss";
import TaskStepper from "./task-stepper";
import TaskQuestion from "./task-question/task-question";
import TextEditModal from "../text-edit-modal/text-edit-modal";
import { ITask } from "../../types/ITask";
import TaskQuestionImage from "./task-question-image/task-question-image";

interface IProps {
    task: ITask | undefined;
    currentStep: number;
    setCurrentStep: (step: number) => void;
    handleEditQuestionText: (text: string) => void;
    isQuestionTextModalOpen: boolean;
    setIsQuestionTextModalOpen: (payload: boolean) => void;
    handleLoadQuestionImage: (file: File) => void;
}

const TaskConstructor = ({
    currentStep,
    setCurrentStep,
    task,
    handleEditQuestionText,
    isQuestionTextModalOpen,
    setIsQuestionTextModalOpen,
    handleLoadQuestionImage,
}: IProps) => {
    const [isEdit, setIsEdit] = useState(true);

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
                        handleLoadQuestionImage={handleLoadQuestionImage}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};

export default TaskConstructor;
