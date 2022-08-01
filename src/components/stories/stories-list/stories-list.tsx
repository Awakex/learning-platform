import React, { useEffect, useState } from "react";
import { IStory } from "../../../types/IStory";
import { StoriesAPI } from "../../../core/api/stories";
import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../routers";

const StoriesList = () => {
    let navigate = useNavigate();
    const [stories, setStories] = useState<IStory[] | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    const getStories = () => {
        setIsLoading(true);
        StoriesAPI.getStories()
            .then((response) => setStories(response.data))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        getStories();
    }, []);

    return (
        <div>
            {stories ? (
                <React.Fragment>
                    {stories.map((story) => (
                        <div
                            key={story._id}
                            className={styles.Story}
                            onClick={() =>
                                story._id &&
                                navigate(RoutePaths.STORIES.PLAY.replace(":id", story._id))
                            }
                        >
                            {story.name}
                        </div>
                    ))}
                </React.Fragment>
            ) : (
                <p>Нет сюжетов</p>
            )}
        </div>
    );
};

export default StoriesList;
