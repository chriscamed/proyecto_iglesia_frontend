import React, { Component } from 'react';
import './events.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';
import Media from 'react-bulma-components/lib/components/media';
import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';

//Our higher order component
import withAuth from '../withAuth';

class OpenModal extends Component {
  constructor(props){
    super(props);
    
    this.state={
      NOMBRE : '',
      FECHA_EVENTO : '',
      HORA_INICIO : '',
      HORA_FIN : '',
      show: false,
     
    }
  }
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
   open = () => this.setState({ show: true });
  close = () => this.setState({ show: false }); 
  
  handleAgregar = event => {
    event.preventDefault();
    const obj = {
        NOMBRE: this.state.NOMBRE,
        FECHA_EVENTO: this.state.FECHA_EVENTO,
        HORA_INICIO: this.state.HORA_INICIO,
        HORA_FIN: this.state.HORA_FIN,
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/evento/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("Se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({NOMBRE: '', FECHA_EVENTO: '', HORA_INICIO:'',HORA_FIN:''})
  }

  render() {    
    return (
      <div>
          <Button onClick={this.open} renderAs="a" className="button is-normal">Crear evento</Button>
        <Modal show={this.state.show} onClose={this.close} closeOnEsc={true} closeOnBlur={true} > 
          <Modal.Card >
    <Modal.Card.Head onClose={this.close} style={{background:`#64234A`}}>
          <Modal.Card.Title className="has-text-white">{this.props.titulo}</Modal.Card.Title>          
    </Modal.Card.Head>
        <Modal.Card.Body>
          <Media>
            <Media.Item>
              <Content>
                <div className="columns">
                <div className="column">
                <label className="label">NOMBRE: </label>
                <input className="input" type="text" required value={this.state.NOMBRE} onChange={e => this.setState({NOMBRE:e.target.value.toUpperCase()})} />
              </div>
              </div>
              <div className="columns">
              <div className="column">
              <label className="label">FECHA: </label>
                <div className="control">
                <input className="input" type="date" required value={this.state.FECHA_EVENTO} onChange={e => this.setState({FECHA_EVENTO:e.target.value})} />
            </div>
            </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">HORA DE INICIO: </label>
                <input className="input" type="time" required value={this.state.HORA_INICIO} onChange={e => this.setState({HORA_INICIO:e.target.value})} />                
              </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">HORA DE FIN: </label>
                <input className="input" type="time" required value={this.state.HORA_FIN} onChange={e => this.setState({HORA_FIN:e.target.value})} />                
              </div>
              </div>
              </Content>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                <div className="columns">
                <div className="column">
                  <Button onClick={this.handleAgregar} >AGREGAR</Button>
                  </div>
                  </div>
                </Level.Side>
              </Level>
            </Media.Item>
          </Media>
        </Modal.Card.Body>
        <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
          
        </Modal.Card.Foot>
      </Modal.Card>
        </Modal>        
      </div>
    );
  }
}

export default OpenModal;
