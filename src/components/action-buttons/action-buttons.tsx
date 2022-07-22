import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import React from "react";
import styles from "./styles.module.scss";

interface IProps {
    handleEdit?: (payload: any) => void;
    handleDelete?: (payload: any) => void;
}

const ActionButtons = ({ handleDelete, handleEdit }: IProps) => {
    return (
        <div className={styles.actionButtons}>
            {handleEdit && (
                <div className={styles.actionItem} onClick={handleEdit}>
                    <EditTwoTone />
                </div>
            )}
            {handleDelete && (
                <div className={styles.actionItem} onClick={handleDelete}>
                    <DeleteTwoTone />
                </div>
            )}
        </div>
    );
};

export default ActionButtons;
