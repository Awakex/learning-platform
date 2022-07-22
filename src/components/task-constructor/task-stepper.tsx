import { Steps } from "antd";
import React, { memo } from "react";
const { Step } = Steps;

interface IProps {
    currentStep: number;
    setCurrentStep: (step: number) => void;
}

const TaskStepper = memo(({ currentStep, setCurrentStep }: IProps) => {
    return (
        <Steps
            type="navigation"
            current={currentStep}
            onChange={setCurrentStep}
            className="site-navigation-steps"
        >
            <Step status="process" title="Создание" />
            <Step status="process" title="Проверка" />
            <Step status="process" title="Загрузка" />
        </Steps>
    );
});

export default TaskStepper;
