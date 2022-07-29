import React, { useEffect, useState } from "react";
import ItemConstructor from "./item-constructor";
import { useParams } from "react-router-dom";
import { ItemsAPI } from "../../../core/api/items";
import { IItem } from "../../../types/IItem";
import { toast } from "react-toastify";
import { Spin } from "antd";

const ItemConstructorContainer = () => {
    let { id } = useParams();
    const [item, setItem] = useState<IItem | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        handleLoadItem();
    }, [id]);

    const handleLoadItem = () => {
        if (!id) return;
        setIsLoading(true);

        ItemsAPI.getItem(id)
            .then((response) => setItem(response.data))
            .finally(() => setIsLoading(false));
    };

    const handleSaveItem = (item: IItem) => {
        if (!id) return;

        ItemsAPI.editItem(id, item).then((response) => {
            setItem(response.data);
            toast.success("Предмет обновлен");
        });
    };

    return (
        <React.Fragment>
            {isLoading ? (
                <Spin tip="Загрузка..." size={"large"} />
            ) : (
                <ItemConstructor item={item} handleSaveItem={handleSaveItem} />
            )}
        </React.Fragment>
    );
};

export default ItemConstructorContainer;
