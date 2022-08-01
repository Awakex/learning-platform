import React, { useEffect, useState } from "react";
import { IStory } from "../../types/IStory";
import styles from "./styles.module.scss";
import StoryModal from "./story-modal/story-modal";
import { ISubstory } from "../../types/ISubstory";
import { ISubstoryForm } from "../../types/ISubstoryForm";
import { REQUEST_CONFIG } from "../../core/config";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routers";

interface IProps {
    story: IStory;
    isEdit: boolean;
    storyModalIsOpen: boolean;
    setStoryModalIsOpen: (payload: boolean) => void;
    handleSaveSubstory: (substory: ISubstoryForm, payload?: IStoryAttachSubstory) => void;
}

export enum StoryAddTypes {
    ADD_SUBSTORY_TO_BLOCK,
    ADD_SUBSTORY_BLOCK,
}

export interface IStoryAttachSubstory {
    type: StoryAddTypes;
    blockId: string;
}

const Story = ({
    story,
    isEdit,
    setStoryModalIsOpen,
    storyModalIsOpen,
    handleSaveSubstory,
}: IProps) => {
    let navigate = useNavigate();
    const [selectedSubstory, setSelectedSubstory] = useState<ISubstory | undefined>(undefined);
    const [selectedAddPayload, setSelectedAddPayload] = useState<IStoryAttachSubstory | undefined>(
        undefined
    );

    const handleSelectSubstory = (substory: ISubstory) => {
        setSelectedSubstory(substory);
        setStoryModalIsOpen(true);
    };

    const handleAddSubstoryToBlock = (blockId: string, type: StoryAddTypes) => {
        setSelectedAddPayload({
            blockId,
            type,
        });
        setStoryModalIsOpen(true);
    };

    useEffect(() => {
        if (!storyModalIsOpen) {
            setSelectedSubstory(undefined);
            setSelectedAddPayload(undefined);
        }
    }, [storyModalIsOpen]);

    return (
        <React.Fragment>
            {isEdit && (
                <StoryModal
                    isVisible={storyModalIsOpen}
                    setIsVisible={setStoryModalIsOpen}
                    handleSave={handleSaveSubstory}
                    substory={selectedSubstory}
                    addPayload={selectedAddPayload}
                />
            )}

            <div className={styles.Story}>
                <h2>{story.name}</h2>
                <div className={styles.StoryContent}>
                    {story.storyMap.map((story) => (
                        <div key={story._id} className={styles.StoryBlock}>
                            {story.substory.map((substory) => (
                                <div
                                    key={substory._id}
                                    className={styles.Substory}
                                    onClick={
                                        isEdit
                                            ? () => handleSelectSubstory(substory)
                                            : () =>
                                                  navigate(
                                                      RoutePaths.PLAYER.PLAY_SET.replace(
                                                          ":setId",
                                                          substory.set || ""
                                                      )
                                                  )
                                    }
                                >
                                    {substory.icon ? (
                                        <img src={REQUEST_CONFIG.URL + `/${substory.icon}`} />
                                    ) : (
                                        <React.Fragment>{substory.content}</React.Fragment>
                                    )}
                                </div>
                            ))}

                            {isEdit && (
                                <div
                                    className={styles.AddSubstory}
                                    onClick={() =>
                                        handleAddSubstoryToBlock(
                                            story._id || "",
                                            StoryAddTypes.ADD_SUBSTORY_TO_BLOCK
                                        )
                                    }
                                >
                                    +
                                </div>
                            )}
                        </div>
                    ))}

                    {isEdit && (
                        <div
                            className={styles.AddSubstoryBlock}
                            onClick={() =>
                                handleAddSubstoryToBlock(
                                    story._id || "",
                                    StoryAddTypes.ADD_SUBSTORY_BLOCK
                                )
                            }
                        >
                            +
                        </div>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Story;
