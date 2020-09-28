
import { Table } from 'react-bootstrap'
import React, { useState, useEffect } from 'react';
import api from "../services/api"

function ClientsList() {
    const [ users, setUsers] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        await api.get(`/users`).then(res => {
            console.log("Sucesso");
            setUsers(res.data);
            
        }).catch(error => {
            console.log("Falha no envio");
            console.log(error);
        });
    }

    function UsersTable({list}) {
        if(!list){
            return null;
        }
        return(
            <>
                {list.map((item, index) => (
                    <tbody>
                        <tr>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role.name}</td>
                            <td>{item.addresses[0]?.state} - {item.addresses[0]?.city}</td>
                        </tr>
                    </tbody>
                ))}
        
            </>
        )
    }
    

    return (

        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Endereço</th>
                </tr>
            </thead>
            {users && 
             <UsersTable list={users}/>
            }

        </Table>
    )
}

export default ClientsList
