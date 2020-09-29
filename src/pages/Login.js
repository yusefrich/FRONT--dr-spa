import React from 'react';
import { Col, Row, Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import { notifyError, notifySuccess } from '../helpers/notifications';
import api from "../services/api"
import BgLeft from "../components/BgLeft"
import FormTitle from '../components/FormTitle';
import BtnDr from '../components/BtnDr';
import FormSpan from '../components/FormSpan';



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
            <BgLeft/>
            <Col sm={4}>
                <div className="mx-5 position-relative text-center">

                    <img className="mt-5 pt-5" src={require("../img/d-brand.png")} width="190px" height="auto" alt=""/>
                    <h1 className="text-white mt-5 font-weight-light">LOGIN</h1>
                </div>
            </Col>
            <Col sm={8}>
                <Form style={{maxWidth: 500, marginTop: 160}} className="drspa-form mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <FormTitle><p style={{color: "#fafafa"}} className="mb-0 text-uppercase font-weight-bold">Seus Dados</p></FormTitle>
                    <Form.Group controlId="form-email">
                        <Form.Control placeholder="Email cadastrado" name="email" ref={register({ required: true })}/>
                        {errors.email && errors.email.type === "required" && <FormSpan>Campo necessário*</FormSpan>}

                    </Form.Group>
                    <Form.Group controlId="form-password">
                        <Form.Control placeholder="********" type="password" name="password" ref={register({ required: true })}/>
                        {errors.password && errors.password.type === "required" && <FormSpan>Campo necessário*</FormSpan>}

                    </Form.Group>

                    <BtnDr type="submit">
                        Login
                    </BtnDr>
                </Form>
            </Col>
        </Row>
    )
}

/* export default Login */
