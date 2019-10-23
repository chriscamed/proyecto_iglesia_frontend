import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './index.css';
import Home from './components/home/Home';
import Register from './components/register/Register';
import Logistics from './components/logistics/Logistics';
import EventList from './components/eventos/Eventos';
import Assistance from './components/assistance/form/Assistance';
import AssistanceList from './components/assistance/Assistance-List';
import Usuarios from './components/usuarios/usuarios';
import Ministerios from './components/ministerios/ministerios';
import TipoEvento from './components/tipoevento/tipoevento';
import Personas from './components/personas/personas';
import NotFound from './components/404';
import Login from './login';
import Reports from './components/reports/reportes';
import Edit from './components/registerEdit/register';
import Generar from './components/qr/generar';

const App = () => (

  <div>
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/createlog" exact component={Logistics} />
          <Route path="/eventos" exact component={EventList} />
          <Route path="/reports" exact component={Reports} />
          <Route path="/createassi/:event_id/:event_name" exact component={Assistance} />
          <Route path="/editpersona" exact component={Edit}/>
          <Route path="/assistancelist" exact component={AssistanceList} />
          <Route path="/usuarios" exact component={Usuarios} />
          <Route path="/ministerios" exact component={Ministerios} />
          <Route path="/tipoevento" exact component={TipoEvento} />
          <Route path="/generarqr" exact component={Generar}/>
          <Route path="/personas" exact component={Personas} />
          <Route component={NotFound} />
        </Switch>

    </Router>
  </div>
);

export default App;
