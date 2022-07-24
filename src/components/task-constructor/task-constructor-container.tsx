import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskConstructor from "./task-constructor";
import { TasksAPI } from "../../core/api/tasks";
import { toast } from "react-toastify";
import { ITask } from "../../types/ITask";
import { AnswersTypeEnum } from "../../types/AnswersTypeEnum";

const TaskConstructorContainer = () => {
    let { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [task, setTask] = useState<ITask | undefined>(undefined);
    const [isQuestionTextModalOpen, setIsQuestionTextModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);

    useEffect(() => {
        getTask();
    }, [id]);

    const getTask = () => {
        if (!id) return;

        setIsTaskLoading(true);
        TasksAPI.getTask(id)
            .then((response) => {
                setTask(response.data);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleEditQuestionText = (text: string) => {
        if (!id || !task) return;

        setIsTaskLoading(true);
        let dto: ITask = {
            ...task,
            question: text,
        };

        TasksAPI.updateTask(id, dto)
            .then((response) => {
                setTask(response.data);
                setIsQuestionTextModalOpen(false);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleLoadQuestionImage = (file: File) => {
        if (!id) return;

        setIsTaskLoading(true);
        TasksAPI.attachImage(id, file)
            .then((response) => {
                setTask(response.data);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleDeleteQuestionImage = () => {
        if (!id) return;

        setIsTaskLoading(true);
        TasksAPI.deleteImage(id)
            .then((response) => {
                setTask(response.data);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleSaveAnswersType = (type: AnswersTypeEnum) => {
        if (!id || !task) return;

        let dto: ITask = {
            ...task,
            answersType: type,
        };

        setIsTaskLoading(true);
        TasksAPI.updateTask(id, dto)
            .then((response) => setTask(response.data))
            .finally(() => setIsTaskLoading(false));
    };

    return (
        <TaskConstructor
            task={task}
            isEdit={isEdit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isQuestionTextModalOpen={isQuestionTextModalOpen}
            setIsQuestionTextModalOpen={setIsQuestionTextModalOpen}
            handleEditQuestionText={handleEditQuestionText}
            handleLoadQuestionImage={handleLoadQuestionImage}
            handleDeleteQuestionImage={handleDeleteQuestionImage}
            handleSaveAnswersType={handleSaveAnswersType}
        />
    );
};

export default TaskConstructorContainer;
