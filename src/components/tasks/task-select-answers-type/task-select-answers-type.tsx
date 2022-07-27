import React, { useState } from "react";
import styles from "./styles.module.scss";
import { Button, Select } from "antd";
import { ANSWERS_TYPE } from "../../../constants/answers-type";
import { AnswersTypeEnum } from "../../../types/AnswersTypeEnum";

const { Option } = Select;

interface IProps {
    handleSaveAnswersType: (type: AnswersTypeEnum) => void;
    taskType?: AnswersTypeEnum;
}

const TaskSelectAnswersType = ({ handleSaveAnswersType, taskType }: IProps) => {
    const [selectedAnswersType, setSelectedAnswersType] = useState(ANSWERS_TYPE.CLASSIC_TEXT.value);

    return (
        <div className={styles.taskSelectAnswersType}>
            <div>
                {taskType ? (
                    `Выбран тип: ${AnswersTypeEnum[taskType]}`
                ) : (
                    <React.Fragment>
                        <Select
                            defaultValue={selectedAnswersType}
                            onChange={setSelectedAnswersType}
                            size={"middle"}
                        >
                            <Option value={ANSWERS_TYPE.CLASSIC_TEXT.value}>
                                {ANSWERS_TYPE.CLASSIC_TEXT.label}
                            </Option>
                            <Option value={ANSWERS_TYPE.CLASSIC_IMAGE.value}>
                                {ANSWERS_TYPE.CLASSIC_IMAGE.label}
                            </Option>
                        </Select>

                        <Button
                            type={"primary"}
                            style={{ marginLeft: 10 }}
                            size={"middle"}
                            onClick={() => handleSaveAnswersType(selectedAnswersType)}
                        >
                            Выбрать
                        </Button>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default TaskSelectAnswersType;
