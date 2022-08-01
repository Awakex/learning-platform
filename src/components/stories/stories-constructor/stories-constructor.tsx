import React from "react";
import { IStory } from "../../../types/IStory";
import styles from "./styles.module.scss";
import { Button, Form, Input, Steps } from "antd";
import { StoryDto } from "../../../dtos/StoryDto";
import Story, { IStoryAttachSubstory } from "../story";
import { ISubstoryForm } from "../../../types/ISubstoryForm";

const { Step } = Steps;

interface IProps {
    story: IStory | undefined;
    currentStep: number;
    setCurrentStep: (payload: number) => void;
    handleSaveInformation: (payload: StoryDto) => void;
    storyModalIsOpen: boolean;
    setStoryModalIsOpen: (payload: boolean) => void;
    handleSaveSubstory: (substory: ISubstoryForm, payload?: IStoryAttachSubstory) => void;
}

const StoriesConstructor = ({
    story,
    currentStep,
    setCurrentStep,
    handleSaveInformation,
    setStoryModalIsOpen,
    storyModalIsOpen,
    handleSaveSubstory,
}: IProps) => {
    return (
        <div className={styles.StoriesConstructorWrapper}>
            <div className={styles.StoriesConstructor}>
                <Steps
                    type="navigation"
                    current={currentStep}
                    onChange={setCurrentStep}
                    className="site-navigation-steps"
                >
                    <Step status="process" title="Информация" />
                    <Step status="process" title="Сюжет" />
                    <Step status="process" title="Награда" />
                </Steps>

                {currentStep === 0 && (
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={handleSaveInformation}
                        autoComplete="off"
                        className={styles.StoriesConstructorForm}
                    >
                        <Form.Item
                            label="Название сюжета"
                            name="name"
                            initialValue={story?.name}
                            rules={[{ required: true, message: "Заполните поле названия сюжета" }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={styles.StoriesConstructorButton}
                                size={"large"}
                            >
                                Сохранить
                            </Button>
                        </Form.Item>
                    </Form>
                )}

                {currentStep === 1 && (
                    <React.Fragment>
                        {story ? (
                            <Story
                                story={story}
                                isEdit={true}
                                storyModalIsOpen={storyModalIsOpen}
                                setStoryModalIsOpen={setStoryModalIsOpen}
                                handleSaveSubstory={handleSaveSubstory}
                            />
                        ) : (
                            <p>Нет сюжета</p>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default StoriesConstructor;
