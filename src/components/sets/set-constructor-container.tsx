import React, { useEffect, useState } from "react";
import SetConstructor from "./set-constructor";
import { useParams } from "react-router-dom";
import { ISet } from "../../types/ISet";
import { SetsAPI } from "../../core/api/sets";
import { Spin } from "antd";
import { CreateSetDto } from "../../dtos/CreateSetDto";
import { toast } from "react-toastify";
import { IReward } from "../../types/IReward";

const SetConstructorContainer = () => {
    let { id } = useParams();
    const [set, setSet] = useState<ISet | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        getSet();
    }, [id]);

    const getSet = () => {
        if (!id) return;

        setIsLoading(true);
        SetsAPI.getSet(id)
            .then((response) => {
                setSet(response.data);
            })
            .finally(() => setIsLoading(false));
    };

    const handleSaveTasks = (taskIds: string[]) => {
        if (!id || !taskIds) return;

        setIsLoading(true);
        let dto: CreateSetDto = {
            tasks: taskIds,
        };
        SetsAPI.updateSet(id, dto)
            .then((response) => {
                setSet(response.data);
                toast.success("Комплект обновлен");
            })
            .finally(() => setIsLoading(false));
    };

    const handleSaveInformation = (payload: ISet) => {
        if (!id) return;

        setIsLoading(true);
        SetsAPI.updateSet(id, payload)
            .then((response) => {
                setSet(response.data);
                toast.success("Комплект обновлен");
            })
            .finally(() => setIsLoading(false));
    };

    const handleAddRewardItem = (reward: IReward) => {
        if (!id) return;

        SetsAPI.attachItem(id, reward)
            .then((response) => {
                setSet(response.data);
            })
            .finally(() => setIsLoading(false));
    };

    return isLoading ? (
        <Spin tip="Загрузка..." size={"large"} />
    ) : (
        <React.Fragment>
            {!set ? (
                <h3>Нет данных для этого комплекта.</h3>
            ) : (
                <SetConstructor
                    set={set}
                    handleSaveTasks={handleSaveTasks}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    handleSaveInformation={handleSaveInformation}
                    handleAddRewardItem={handleAddRewardItem}
                />
            )}
        </React.Fragment>
    );
};

export default SetConstructorContainer;
