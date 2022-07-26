import { Button, Form, Input } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { LoginDto } from "../../dtos/LoginDto";
import { useAppSelector } from "../../hooks/redux";

interface IProps {
    onFinish: (values: LoginDto) => void;
    onShowRegistration: () => void;
}

const Login = ({ onFinish, onShowRegistration }: IProps) => {
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
                    Вход
                </Button>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <p>
                    У вас нет аккаунта?{" "}
                    <span className="link" onClick={onShowRegistration}>
                        Регистрация
                    </span>
                </p>
            </Form.Item>
        </Form>
    );
};

export default Login;
