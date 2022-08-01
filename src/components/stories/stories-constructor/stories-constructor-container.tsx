import React, { useEffect, useState } from "react";
import StoriesConstructor from "./stories-constructor";
import { useParams } from "react-router-dom";
import { IStory } from "../../../types/IStory";
import { StoriesAPI } from "../../../core/api/stories";
import { StoryDto } from "../../../dtos/StoryDto";
import { toast } from "react-toastify";
import { Spin } from "antd";

const StoriesConstructorContainer = () => {
    let { id } = useParams();
    const [story, setStory] = useState<IStory | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getStory();
    }, []);

    const getStory = () => {
        if (!id) return;

        setIsLoading(true);
        StoriesAPI.getStory(id)
            .then((response) => setStory(response.data))
            .finally(() => setIsLoading(false));
    };

    const handleSaveInformation = (payload: StoryDto) => {
        if (!id) return;

        setIsLoading(true);
        StoriesAPI.updateStory(id, payload)
            .then((response) => {
                setStory(response.data);
                toast.success("Сюжет обновлен");
            })
            .finally(() => setIsLoading(false));
    };

    return isLoading ? (
        <Spin tip="Загрузка..." size={"large"} />
    ) : (
        <StoriesConstructor
            story={story}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSaveInformation={handleSaveInformation}
        />
    );
};

export default StoriesConstructorContainer;
