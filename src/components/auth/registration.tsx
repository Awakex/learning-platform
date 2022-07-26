import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { RegistrationDto } from "../../dtos/RegistrationDto";
import { useAppSelector } from "../../hooks/redux";

interface IProps {
    onFinish: (values: RegistrationDto) => void;
    onShowLogin: () => void;
}

const Registration = ({ onFinish, onShowLogin }: IProps) => {
    const { isLoginLoading } = useAppSelector((state) => state.app);

    const onFinishFailed = (errorInfo: any) => {
        toast.error(errorInfo);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Nickname"
                name="nickname"
                rules={[{ required: true, message: "Please input your nickname!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Age"
                name="age"
                rules={[{ required: true, message: "Please input your age!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="FirstName"
                name="firstName"
                rules={[{ required: true, message: "Please input your firstName!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="LastName"
                name="lastName"
                rules={[{ required: true, message: "Please input your lastName!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please input your email!" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={isLoginLoading}>
                    Регистрация
                </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                {" "}
                <p>
                    У вас уже есть аккаунт?{" "}
                    <span className="link" onClick={onShowLogin}>
                        Вход
                    </span>
                </p>
            </Form.Item>
        </Form>
    );
};

export default Registration;
