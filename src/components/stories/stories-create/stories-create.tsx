import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../../routers";
import TextModal from "../../text-modal/text-modal";
import { Button } from "antd";

import { StoriesAPI } from "../../../core/api/stories";
import { StoryDto } from "../../../dtos/StoryDto";
import StoriesTable from "../stories-table/stories-table";

const StoriesCreate = () => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const handleSetSave = (name: string) => {
        let dto: StoryDto = {
            name: name,
        };

        setIsLoading(true);
        StoriesAPI.createStory(dto)
            .then((response) => {
                setIsTextModalOpen(true);
                setIsLoading(false);
                navigate(RoutePaths.STORIES.EDIT.replace(":id", response.data._id));
            })
            .catch(() => setIsLoading(false));
    };

    return (
        <React.Fragment>
            <TextModal
                isVisible={isTextModalOpen}
                setIsVisible={(payload) => setIsTextModalOpen(payload)}
                handleSave={handleSetSave}
                title={"Создание сюжета"}
                description={"Введите название сюжета"}
            />
            <div>
                <h2>Создание сюжетов</h2>

                <Button
                    style={{ marginBottom: 20 }}
                    onClick={() => setIsTextModalOpen(true)}
                    type={"primary"}
                    loading={isLoading}
                >
                    Создать
                </Button>
            </div>

            <hr style={{ marginBottom: 20 }} />

            <StoriesTable />
        </React.Fragment>
    );
};

export default StoriesCreate;
