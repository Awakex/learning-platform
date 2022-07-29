import React, { useState } from "react";
import ItemsTable from "./items-table";
import TextModal from "../text-modal/text-modal";
import { Button } from "antd";
import { ItemsAPI } from "../../core/api/items";
import { IItem } from "../../types/IItem";
import { useNavigate } from "react-router-dom";
import { RoutePaths } from "../../routers";

const ItemsCreate = () => {
    let navigate = useNavigate();
    const [isTextModalOpen, setIsTextModalOpen] = useState(false);

    const handleSave = (itemName: string) => {
        let dto: IItem = {
            name: itemName,
            type: 1,
            rarity: 1,
        };

        ItemsAPI.createItem(dto).then((response) => {
            navigate(RoutePaths.ITEMS.EDIT.replace(":id", response.data._id));
        });
    };

    return (
        <React.Fragment>
            <TextModal
                isVisible={isTextModalOpen}
                setIsVisible={(payload) => setIsTextModalOpen(payload)}
                handleSave={handleSave}
                title={"Создание предмета"}
                description={"Введите название предмета"}
            />

            <div>
                <h2>Создание предметов</h2>

                <Button
                    style={{ marginBottom: 20 }}
                    onClick={() => setIsTextModalOpen(true)}
                    type={"primary"}
                >
                    Создать
                </Button>
            </div>

            <hr style={{ marginBottom: 20 }} />

            <ItemsTable />
        </React.Fragment>
    );
};

export default ItemsCreate;
