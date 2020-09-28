import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap'
import { loggedUser } from '../helpers/utils';

import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    Redirect
  } from "react-router-dom";
import Profile from './Profile';
import ClientsList from './ClientsList';
  

function PrivateRoute({ children, hasPerm, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
        hasPerm ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/dashboard",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  
function Dashboard() {
    const [ user, setUser] = useState(null);

    useEffect(() => {
        getUser()
    }, []);

    const getUser = async () =>{
        var theUser = await loggedUser();
        setUser(theUser);
        console.log(theUser);

    }

    let { path, url } = useRouteMatch();

    var isAdmin = () => {
        return (user.role.name === "admin")? true: false; 
    }

    if(!user){
        return (<></>)
    }

    return (
        <Row>
            <Col sm={3}>
                <h1>dashboard</h1>
                <ul>
                    <li>
                        <Link to={`${url}/perfil`}>Perfil</Link>
                    </li>
                    <li>
                        <Link to={`${url}/mensagens`}>Mensagens</Link>
                    </li>
                    <li hidden={isAdmin()}>
                        <Link  to={`${url}/agendar`}>Agendar Consulta</Link>
                    </li>
                    <li hidden={isAdmin()}>
                        <Link to={`${url}/consultas`}>Minhas Consultas</Link>
                    </li>
                    <li>
                        <Link to={`${url}/eventos`}>Eventos</Link>
                    </li>
                    <li hidden={!isAdmin()}>
                        <Link to={`${url}/clientes`}>Clientes</Link>
                    </li>
                </ul>
            </Col>
            <Col sm={9}>
                <Switch>
                    <Route exact path={path}>
                        <h3>Seu dashboard.</h3>
                    </Route>
                    <Route path={`${path}/perfil`}>
                        <Profile/>
                    </Route>
                    <Route path={`${path}/mensagens`}>
                        <h3>Em desenvolvimento...</h3>
                    </Route>
                    <PrivateRoute hasPerm={!isAdmin()} path={`${path}/agendar`}>
                        <h3>Em desenvolvimento...</h3>
                    </PrivateRoute>
                    <PrivateRoute hasPerm={!isAdmin()} path={`${path}/consultas`}>
                        <h3>Em desenvolvimento...</h3>
                    </PrivateRoute>
                    <Route path={`${path}/eventos`}>
                        <h3>Em desenvolvimento...</h3>
                    </Route>
                    <PrivateRoute hasPerm={isAdmin()} path={`${path}/clientes`}>
                        <ClientsList/>
                    </PrivateRoute>
                </Switch>
            </Col>
        </Row>

    )
}

export default Dashboard
