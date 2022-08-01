import React, { useEffect, useState } from "react";
import StoriesConstructor from "./stories-constructor";
import { useParams } from "react-router-dom";
import { IStory } from "../../../types/IStory";
import { StoriesAPI } from "../../../core/api/stories";
import { StoryDto } from "../../../dtos/StoryDto";
import { toast } from "react-toastify";
import { Spin } from "antd";
import { ISubstory } from "../../../types/ISubstory";
import { ISubstoryForm } from "../../../types/ISubstoryForm";
import { IStoryAttachSubstory, StoryAddTypes } from "../story";

const StoriesConstructorContainer = () => {
    let { id } = useParams();
    const [story, setStory] = useState<IStory | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [storyModalIsOpen, setStoryModalIsOpen] = useState(false);

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

    const handleSaveSubstory = (substory: ISubstoryForm, payload?: IStoryAttachSubstory) => {
        let dto: ISubstory = {
            _id: substory.substoryId,
            ...substory,
        };

        if (!payload) {
            if (!dto._id) return;
            StoriesAPI.updateSubstory(dto._id, dto)
                .then(() => {
                    toast.success("Подсюжет обновлен");
                    getStory();
                })
                .finally(() => setStoryModalIsOpen(false));

            return;
        } else if (payload.type === StoryAddTypes.ADD_SUBSTORY_TO_BLOCK) {
            StoriesAPI.attachSubstory(story?._id || "", dto, payload.blockId)
                .then(() => {
                    toast.success("Подсюжет добавлен и обновлен");
                    getStory();
                })
                .finally(() => setStoryModalIsOpen(false));
        } else if (payload.type === StoryAddTypes.ADD_SUBSTORY_BLOCK) {
            StoriesAPI.attachSubstory(story?._id || "", dto)
                .then(() => {
                    toast.success("Подсюжет добавлен и обновлен");
                    getStory();
                })
                .finally(() => setStoryModalIsOpen(false));
        }
    };

    return isLoading ? (
        <Spin tip="Загрузка..." size={"large"} />
    ) : (
        <StoriesConstructor
            story={story}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            handleSaveInformation={handleSaveInformation}
            handleSaveSubstory={handleSaveSubstory}
            storyModalIsOpen={storyModalIsOpen}
            setStoryModalIsOpen={setStoryModalIsOpen}
        />
    );
};

export default StoriesConstructorContainer;
