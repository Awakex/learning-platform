import { Button, Form, Input, Steps } from "antd";
import React from "react";
import { ISet } from "../../types/ISet";
import TaskTransfer from "../tasks/task-transfer/task-transfer";
import styles from "./styles.module.scss";
import RewardConstructor from "../reward-constructor/reward-constructor";
import { IReward } from "../../types/IReward";

const { Step } = Steps;

interface IProps {
    set: ISet | undefined;
    currentStep: number;
    handleSaveTasks: (taskIds: string[]) => void;
    setCurrentStep: (payload: number) => void;
    handleSaveInformation: (payload: ISet) => void;
    handleAddRewardItem: (reward: IReward) => void;
}

const SetConstructor = ({
    set,
    handleSaveTasks,
    currentStep,
    setCurrentStep,
    handleSaveInformation,
    handleAddRewardItem,
}: IProps) => {
    return (
        <div className={styles.SetConstructorWrapper}>
            <div className={styles.SetConstructor}>
                <h2>Редактирование комплета</h2>

                <Steps
                    type="navigation"
                    current={currentStep}
                    onChange={setCurrentStep}
                    className="site-navigation-steps"
                >
                    <Step status="process" title="Информация" />
                    <Step status="process" title="Задания" />
                    <Step status="process" title="Награда" />
                </Steps>

                {currentStep === 0 && (
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleSaveInformation}
                        autoComplete="off"
                        className={styles.SetConstructorForm}
                    >
                        <Form.Item
                            label="Название комплекта"
                            name="title"
                            initialValue={set?.title}
                            rules={[
                                { required: true, message: "Заполните поле названия комплекта" },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.SetConstructorButton}
                                size={"large"}
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                {currentStep === 1 && (
                    <TaskTransfer
                        className={styles.TaskTransfer}
                        listStyle={{ minHeight: 600, width: 400 }}
                        handleSave={handleSaveTasks}
                        set={set}
                    />
                )}

                {currentStep === 2 && (
                    <RewardConstructor handleAddItem={handleAddRewardItem} rewards={set?.rewards} />
                )}
            </div>
        </div>
    );
};

export default SetConstructor;
