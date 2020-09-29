import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form";
import BtnDr from '../components/BtnDr';
import { notifyError, notifySuccess } from '../helpers/notifications';
import { getAllStates, getStateBySigla, loggedUser } from '../helpers/utils';
import api from "../services/api"

function Profile() {
    const { register, handleSubmit, errors } = useForm();
    const [ country, setCountry] = useState({});
    const [ currentAddress, setAddress] = useState(null);/* setAddress */

    useEffect(() => {
        getCurrentAddress();
    }, []);
    
    const getCurrentAddress = async () => {
        const theUser = await loggedUser(); 
        await api.get(`/users/${theUser.id}/addresses`).then(res => {
            console.log("Sucesso");
            console.log(res);
            if(res.data.addresses[0]){
                selectState(res.data.addresses[0].state)
                setAddress(res.data.addresses[0]);
            }else {
                setAddress({});
            }

            
        }).catch(error => {
            console.log("Falha no envio");
            console.log(error);
            notifyError({title: "Falha", message: "Falha ao consultar seu endereço atual"});
            setAddress({});
        });

    }
    const onSubmit = async (data) => {
        console.log(data);
        const user = await loggedUser();

        const adressForm = {
            "state": data.state,
            "city": data.city, 
            "zipcode": data.zipcode,
            "street": data.street,
            "neigh": data.neigh,
        };
        if(currentAddress.id){
            await api.put(`/users/${user.id}/addresses/${currentAddress.id}`, adressForm).then(res => {
                console.log("Sucesso");
                console.log(res);
                /* postUserAdress(res.data.id, adressForm); */
                notifySuccess({ title: "sucesso", message: "Endereço atualizado com sucesso" });

            }).catch(error => {
                console.log("Falha no envio");
                console.log(error);
                notifyError({title: "Falha", message: "Erro ao atualizar seu endereço"});
            });

        }else{
            await api.post(`/users/${user.id}/addresses`, adressForm).then(res => {
                console.log("Sucesso");
                console.log(res);
                /* postUserAdress(res.data.id, adressForm); */
                notifySuccess({ title: "sucesso", message: "Endereço atualizado com sucesso" });

            }).catch(error => {
                console.log("Falha no envio");
                console.log(error);
                notifyError({title: "Falha", message: "Erro ao atualizar seu endereço"});
            });
        }


    };

    const selectState = (state) => {
        setCountry(getStateBySigla(state))
    }
    if(!currentAddress){
        return (<></>)
    }
    return (
                <Form style={{maxWidth: 500, marginTop: 160}} className="drspa-form mx-auto" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group controlId="form-state">
                        <Form.Control onChange={(event)=>{selectState(event.target.value)}} defaultValue={currentAddress.state} as="select" name="state" ref={register({ required: true })}>
                            <Options list={getAllStates()} />
                        </Form.Control>
                        {errors.state && errors.state.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-city">
                        <Form.Control as="select" name="city" defaultValue={currentAddress.city} ref={register({ required: true })}>
                            <option  value="">Cidade... </option>
                            <OptionsCities list={country.cidades} />
                        </Form.Control>
                        {errors.city && errors.city.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-cep">
                        <Form.Control placeholder="Cep" name="zipcode" type="number" defaultValue={currentAddress.zipcode} ref={register({ required: true })}/>
                        {errors.zipcode && errors.zipcode.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-street">
                        <Form.Control placeholder="Rua" name="street" defaultValue={currentAddress.street} ref={register({ required: true })}/>
                        {errors.street && errors.street.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <Form.Group controlId="form-neigh">
                        <Form.Control placeholder="Bairro" name="neigh" defaultValue={currentAddress.neigh} ref={register({ required: true })}/>
                        {errors.neigh && errors.neigh.type === "required" && <span>Campo necessário</span>}

                    </Form.Group>
                    <BtnDr type="submit">
                        Registrar
                    </BtnDr>
                </Form>
    )
}

function Options({list}) {
    if(!list){
        return null;
    }
    return(
        <>
            <option  value="">Estado... </option>
            {list.map((item, index) => (
                <option key={`state-${index}`} value={item.sigla}> {item.nome} </option>
            ))}
    
        </>
    )
}
function OptionsCities({list}) {
    if(!list){
        return null;
    }
    return(
        <>
            {list.map((item, index) => (
                <option key={`city-${index}`} value={item}> {item} </option>
            ))}
    
        </>
    )
}

export default Profile
