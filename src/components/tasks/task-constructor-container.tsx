import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TaskConstructor from "./task-constructor";
import { TasksAPI } from "../../core/api/tasks";
import { ITask } from "../../types/ITask";
import { AnswersTypeEnum } from "../../types/AnswersTypeEnum";
import { IAnswer } from "../../types/IAnswer";
import { AnswersAPI } from "../../core/api/answers";
import { AnswerDto } from "../../dtos/AnswerDto";
import { CorrectAnswerDto } from "../../dtos/CorrectAnswerDto";
import { toast } from "react-toastify";
import { ITaskSettings } from "../../types/ITaskSettings";

interface IProps {
    config: ITaskConstructorConfig;
    taskIdForLoad?: string;
}

const TaskConstructorContainer = ({ config, taskIdForLoad }: IProps) => {
    let { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [isTaskLoading, setIsTaskLoading] = useState(false);
    const [task, setTask] = useState<ITask | undefined>(undefined);
    const [settings, setSettings] = useState<ITaskSettings | undefined>(undefined);
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [isQuestionTextModalOpen, setIsQuestionTextModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(true);
    const [selectedAnswersIds, setSelectedAnswersIds] = useState<string[]>([]);

    useEffect(() => {
        getTask();
    }, [id, taskIdForLoad]);

    useEffect(() => {
        if (config.isCreate) {
            setIsEdit(currentStep === 0);
        }
    }, [currentStep, config]);

    useEffect(() => {
        setIsEdit(config.isCreate);
    }, [config]);

    const getTask = () => {
        setIsTaskLoading(true);
        TasksAPI.getTask(taskIdForLoad || id)
            .then((response) => {
                setTask(response.data);
                setSettings(response.data.settings);

                if (response.data._id) {
                    getAnswers(response.data._id);
                }
            })
            .finally(() => setIsTaskLoading(false));
    };

    const getAnswers = (questionId: string) => {
        setIsTaskLoading(true);
        AnswersAPI.getAnswersByQuestionId(questionId)
            .then((response) => setAnswers(response.data))
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
        if (!task?._id) return;

        setIsTaskLoading(true);
        TasksAPI.attachImage(task?._id, file)
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

    const handleSaveAnswerContent = (content: string) => {
        if (!id || !task) return;

        let answerDto: AnswerDto = {
            content,
        };

        setIsTaskLoading(true);
        AnswersAPI.createAnswer(id, answerDto)
            .then(() => {
                getAnswers(task._id);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleSelectAnswer = (answerId: string) => {
        if (selectedAnswersIds.includes(answerId)) {
            setSelectedAnswersIds((old) => old.filter((id) => id !== answerId));
        } else {
            setSelectedAnswersIds((old) => [...old, answerId]);
        }
    };

    const handleSaveAnswers = () => {
        if (!id || !task) return;

        setIsTaskLoading(true);
        let dto: CorrectAnswerDto = {
            answers: selectedAnswersIds,
        };

        AnswersAPI.createCorrectAnswers(id, dto)
            .then(() => toast.success("Правильные ответы сохранены"))
            .finally(() => setIsTaskLoading(false));
    };

    const handleCheckAnswers = () => {
        setIsTaskLoading(true);
        let dto: CorrectAnswerDto = {
            answers: selectedAnswersIds,
        };

        AnswersAPI.checkCorrectAnswers(taskIdForLoad || id || "", dto)
            .then((response) => {
                if (response.data.status) {
                    toast.success("Верный ответ");
                } else {
                    toast.error("Неверный ответ");
                }
                setSelectedAnswersIds([]);
            })
            .finally(() => setIsTaskLoading(false));
    };

    const handleSaveSettings = (payload: TaskSettingsDto) => {
        if (!id) return;

        setIsTaskLoading(true);
        TasksAPI.saveSettings(id, payload)
            .then((response) => {
                setSettings(response.data);
                toast.success("Настройки сохранены");
            })
            .finally(() => setIsTaskLoading(false));
    };

    return (
        <TaskConstructor
            task={task}
            config={config}
            settings={settings}
            isEdit={isEdit}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            isQuestionTextModalOpen={isQuestionTextModalOpen}
            setIsQuestionTextModalOpen={setIsQuestionTextModalOpen}
            handleEditQuestionText={handleEditQuestionText}
            handleLoadQuestionImage={handleLoadQuestionImage}
            handleDeleteQuestionImage={handleDeleteQuestionImage}
            handleSaveAnswersType={handleSaveAnswersType}
            answers={answers}
            handleSaveAnswerContent={handleSaveAnswerContent}
            handleSelectAnswer={handleSelectAnswer}
            selectedAnswersIds={selectedAnswersIds}
            handleSaveAnswers={handleSaveAnswers}
            handleCheckAnswers={handleCheckAnswers}
            handleSaveSettings={handleSaveSettings}
        />
    );
};

export default TaskConstructorContainer;
