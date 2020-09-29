import React, { useState } from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import BgLeft from '../components/BgLeft';
import BtnDr from '../components/BtnDr';
import FormSpan from '../components/FormSpan';
import FormTitle from '../components/FormTitle';
import { notifyError, notifySuccess } from '../helpers/notifications';
import api from "../services/api"

function Register() {
    const { register, handleSubmit, errors } = useForm();
    const [redirect, setRedirect] = useState(null);

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
            notifyError({ title: "Falha", message: "Houve um erro durante o cadastro tente novamente" });

        });

    };

    if (redirect) {
        return <Redirect to={redirect} />
    }
    return (
        <Row>
            <BgLeft/>
            <Col sm={4}>
                <div className="mx-5 position-relative text-center">
                    <img className="mt-5 pt-5" src={require("../img/d-brand.png")} width="190px" height="auto" alt="" />
                    <h1 className="text-white mt-5 font-weight-light">REGISTRO</h1>
                </div>
            </Col>
            <Col sm={8}>
                <Form style={{ maxWidth: 500, marginTop: 160 }} className="drspa-form mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <FormTitle><p style={{color: "#fafafa"}} className="mb-0 text-uppercase font-weight-bold">Seus Dados</p></FormTitle>
                    <Form.Group controlId="form-name">
                        <Form.Control placeholder="Seu nome" name="name" ref={register({ required: true })} />
                        {errors.name && errors.name.type === "required" && <FormSpan>Campo necessário</FormSpan>}

                    </Form.Group>
                    <Form.Group controlId="form-email">
                        <Form.Control placeholder="Seu melhor Email" name="email" ref={register({ required: true })} />
                        {errors.email && errors.email.type === "required" && <FormSpan>Campo necessário</FormSpan>}

                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Control type="password" placeholder="********" name="password" ref={register({ required: true })} />
                        {errors.password && errors.password.type === "required" && <FormSpan>Campo necessário</FormSpan>}

                    </Form.Group>

                    <Form.Group id="formGridCheckbox">
                        <Form.Check type="checkbox" label="Concordo com os termos de uso" name="agreed" ref={register({ required: true })} />
                        {errors.agreed && errors.agreed.type === "required" && <FormSpan>Campo necessário</FormSpan>}
                    </Form.Group>

                    <BtnDr type="submit">
                        Registrar
                    </BtnDr>
                </Form>
            </Col>
        </Row>
    )
}

export default Register
