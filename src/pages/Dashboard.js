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
import BgLeftSm from '../components/BgLeftSm';
import DrPlaceholder from '../components/DrPlaceholder';
  

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
    const prevent = (e) =>{
        e.preventDefault();
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
            <BgLeftSm/>
            <Col sm={3}>
            <div className="mx-5 position-relative text-center">

                <img style={{borderRadius: 90, marginTop: 90}} src={require("../img/profile-default.jpg")} width="80" height="auto" alt=""/>
                <h2 className="text-white mt-5 font-weight-light">Yusef Richard</h2>
            </div>
                <ul className="list-unstyled mt-5">
                    <li>
                        <Link className="drspa-btn-block text-uppercase" to={`${url}/perfil`}>Perfil</Link>
                    </li>
                    <li>
                        <Link className="drspa-btn-block text-uppercase disabled">Mensagens</Link>{/* to={`${url}/mensagens` */}
                    </li>
                    <li hidden={isAdmin()}>
                        <Link  className="drspa-btn-block text-uppercase disabled" >Agendar Consulta</Link>{/* to={`${url}/agendar`} */}
                    </li>
                    <li hidden={isAdmin()}>
                        <Link className="drspa-btn-block text-uppercase disabled" >Minhas Consultas</Link>{/* to={`${url}/consultas`} */}
                    </li>
                    <li>
                        <Link className="drspa-btn-block text-uppercase disabled" >Eventos</Link>{/* to={`${url}/eventos`} */}
                    </li>
                    <li hidden={!isAdmin()}>
                        <Link className="drspa-btn-block text-uppercase" to={`${url}/clientes`}>Clientes</Link>
                    </li>
                </ul>
            </Col>
            <Col sm={9}>
                <Switch>
                    <Route exact path={path}>
                        <DrPlaceholder>Seu dashboard.</DrPlaceholder>
                    </Route>
                    <Route path={`${path}/perfil`}>
                        <Profile/>
                    </Route>
                    <Route path={`${path}/mensagens`}>
                        <DrPlaceholder>Em desenvolvimento...</DrPlaceholder>
                    </Route>
                    <PrivateRoute hasPerm={!isAdmin()} path={`${path}/agendar`}>
                        <DrPlaceholder>Em desenvolvimento...</DrPlaceholder>
                    </PrivateRoute>
                    <PrivateRoute hasPerm={!isAdmin()} path={`${path}/consultas`}>
                        <DrPlaceholder>Em desenvolvimento...</DrPlaceholder>
                    </PrivateRoute>
                    <Route path={`${path}/eventos`}>
                        <DrPlaceholder>Em desenvolvimento...</DrPlaceholder>
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
