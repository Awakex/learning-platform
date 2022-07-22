import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskConstructor from "./task-constructor";
import { TasksAPI } from "../../core/api/tasks";
import { toast } from "react-toastify";
import { ITask } from "../../types/ITask";

const TaskConstructorContainer = () => {
    let { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [task, setTask] = useState<ITask | undefined>(undefined);
    const [isQuestionTextModalOpen, setIsQuestionTextModalOpen] = useState(false);

    useEffect(() => {
        console.log(id);
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

    return (
        <TaskConstructor
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            task={task}
            isQuestionTextModalOpen={isQuestionTextModalOpen}
            setIsQuestionTextModalOpen={setIsQuestionTextModalOpen}
            handleEditQuestionText={handleEditQuestionText}
            handleLoadQuestionImage={handleLoadQuestionImage}
        />
    );
};

export default TaskConstructorContainer;
