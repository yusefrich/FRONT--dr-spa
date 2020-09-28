import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from '../helpers/notifications';
import api from "../services/api"

export default function Login (props) {

    const { register, handleSubmit, errors } = useForm();

    const onSubmit = async (data) => {
        const form = {
            "email": data.email,
            "password": data.password,
        };

        await api.post('/signin', form).then(res => {
            notifySuccess({ title: "Logado com sucesso", message: "" });
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            props.login();

        }).catch(error => {
            console.log("Falha no envio");
            console.log(error);
            notifyError({title: "Falha", message: "Email ou senha invalidos..."});

        });

    };
    return (
        <Row>
            <Col sm={3}>
                <h1>LOGIN</h1>
            </Col>
            <Col sm={9}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="form-email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control placeholder="Email cadastrado" name="email" ref={register({ required: true })}/>
                        {errors.email && errors.email.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control placeholder="********" type="password" name="password" ref={register({ required: true })}/>
                        {errors.password && errors.password.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

/* export default Login */
