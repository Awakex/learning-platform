import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Story from "./story";
import { StoriesAPI } from "../../core/api/stories";
import { IStory } from "../../types/IStory";

const StoryContainer = () => {
    let { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [story, setStory] = useState<IStory | undefined>(undefined);

    const getStory = () => {
        if (!id) return;

        setIsLoading(true);
        StoriesAPI.getStory(id)
            .then((response) => {
                setStory(response.data);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getStory();
    }, [id]);

    return (
        <div>
            {story ? (
                <Story
                    story={story}
                    isEdit={false}
                    handleSaveSubstory={() => null}
                    setStoryModalIsOpen={() => null}
                    storyModalIsOpen={false}
                />
            ) : (
                <p>Нет сюжета</p>
            )}
        </div>
    );
};

export default StoryContainer;
