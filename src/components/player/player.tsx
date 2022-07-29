import React, { useEffect, useState } from "react";
import TaskConstructorContainer from "../tasks/task-constructor-container";
import { PLAYER_CONFIG } from "./config/player-config";
import { useParams } from "react-router-dom";
import { SetsAPI } from "../../core/api/sets";
import { toast } from "react-toastify";
import { ISet } from "../../types/ISet";
import { AxiosResponse } from "axios";
import { Spin, Steps } from "antd";
import styles from "./styles.module.scss";

const { Step } = Steps;

const Player = () => {
    let { setId } = useParams();
    const [currentTaskId, setCurrentTaskId] = useState<string | undefined>(undefined);
    const [currentStep, setCurrentStep] = useState(-1);
    const [set, setSet] = useState<ISet | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getSet();
    }, [setId]);

    const getSet = () => {
        if (!setId) {
            toast.error("Ошибка получения комплекта");
            return;
        }

        setIsLoading(true);
        SetsAPI.getSet(setId)
            .then((response: AxiosResponse<ISet>) => {
                setSet(response.data);
                setCurrentStep(0);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (set?.tasks && set?.tasks[currentStep]) {
            setCurrentTaskId(set?.tasks[currentStep]);
        }
    }, [currentStep]);

    return (
        <React.Fragment>
            {isLoading ? (
                <Spin tip="Загрузка..." size={"large"} />
            ) : (
                <React.Fragment>
                    {currentTaskId ? (
                        <div className={styles.Player}>
                            <Steps
                                current={currentStep}
                                onChange={setCurrentStep}
                                className={styles.PlayerStepper}
                                responsive={true}
                                direction={"vertical"}
                            >
                                {set?.tasks?.map((task, index) => (
                                    <Step key={task} />
                                ))}
                            </Steps>

                            <TaskConstructorContainer
                                config={PLAYER_CONFIG}
                                taskIdForLoad={currentTaskId}
                                setId={setId}
                            />
                        </div>
                    ) : (
                        <h2>Нет данных</h2>
                    )}
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default Player;
