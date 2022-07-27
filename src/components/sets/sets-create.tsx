import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateSetDto } from "../../dtos/CreateSetDto";
import { Button } from "antd";
import SetsTable from "../sets-table/sets-table";
import TextModal from "../text-modal/text-modal";
import { SetsAPI } from "../../core/api/sets";
import { RoutePaths } from "../../routers";

const SetsCreate = () => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const handleSetSave = (title: string) => {
        let dto: CreateSetDto = {
            title,
        };

        setIsLoading(true);
        SetsAPI.createSet(dto)
            .then((response) => {
                setIsTextModalOpen(true);
                setIsLoading(false);
                navigate(RoutePaths.SETS.EDIT.replace(":id", response.data._id));
            })
            .catch(() => setIsLoading(false));
    };

    return (
        <React.Fragment>
            <TextModal
                isVisible={isTextModalOpen}
                setIsVisible={(payload) => setIsTextModalOpen(payload)}
                handleSave={handleSetSave}
                title={"Создание комплекта"}
                description={"Введите название комплекта"}
            />
            <div>
                <h2>Создание комплектов</h2>

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

            <SetsTable />
        </React.Fragment>
    );
};

export default SetsCreate;
