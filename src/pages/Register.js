import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import { notifyError, notifySuccess } from '../helpers/notifications';
import api from "../services/api"

function Register() {
    const { register, handleSubmit, errors } = useForm();
    const [ redirect, setRedirect] = useState(null);

    const onSubmit = async (data) => {
        console.log(data);
        const userForm = {
            "name": data.name, 
            "email": data.email,
            "password": data.password,
        };

        await api.post('/client/signup', userForm).then(res => {
            console.log("Sucesso");
            console.log(res);
            notifySuccess({ title: "sucesso", message: "Usuário cadastrado com sucesso, Faça o login para entrar em sua conta" });
            setRedirect("/login");

        }).catch(error => {
            console.log("Falha no envio");
            console.log(error);
            notifyError({title: "Falha", message: "Houve um erro durante o cadastro tente novamente"});

        });

    };

    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <Row>
            <Col sm={3}>
                <h1>Registro</h1>
            </Col>
            <Col sm={9}>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <Form.Group controlId="form-name">
                        <Form.Label>Nome Completo:</Form.Label>
                        <Form.Control placeholder="Seu nome" name="name" ref={register({ required: true })}/>
                        {errors.name && errors.name.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-email">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control placeholder="Seu melhor Email" name="email" ref={register({ required: true })}/>
                        {errors.email && errors.email.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" placeholder="********" name="password" ref={register({ required: true })}/>
                        {errors.password && errors.password.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Concordo com os termos de uso" name="agreed" ref={register({ required: true })} />
                        {errors.agreed && errors.agreed.type === "required" && <span>Campo necessário</span>}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Registrar
                    </Button>
                </Form>
            </Col>
        </Row>
    )
}

export default Register
