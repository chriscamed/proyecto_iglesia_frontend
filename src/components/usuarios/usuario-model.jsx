import React, { Component } from 'react';
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
      USUARIO:'',
      PASSWORD:'',
      ROL: null,
      show: false,
      roles:[
        {
          id:0,
          nombre:"Registrador de asistencias"
        },
        {
          id:1,
          nombre:"Administrador"
        },
        {
          id:2,
          nombre:"Registrador de personas"
        }]
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
        USUARIO: this.state.USUARIO,
        PASS: this.state.PASSWORD,
        ROL: this.state.ROL        
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/user/create', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("Se ha agregado el usuario"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({USUARIO: '', PASSWORD: '', ROL:''})
  }

  render() {    
    return (
      <div>
          <Button onClick={this.open} renderAs="a" className="button is-normal">Crear usuario</Button>
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
                <label className="label">USUARIO: </label>
                <input className="input" type="text" required value={this.state.USUARIO} onChange={e => this.setState({USUARIO:e.target.value.toUpperCase()})} />
              </div>
              </div>
              <div className="columns">
              <div className="column">
              <label className="label">PASSWORD: </label>
                <div className="control">
                <input className="input" type="password" required value={this.state.PASSWORD} onChange={e => this.setState({PASSWORD:e.target.value})} />
            </div>
            </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">ROL: </label>   
                <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>            
                    <select value={this.state.ROL} onChange={e => this.setState({ROL:e.target.value})} required>
                    <option value="">---Seleccione---</option>
                    {this.state.roles.map(option => (
                    <option key={option.id} value={option.id}>
                    {option.nombre}
                </option>
                ))}
            </select> 
            </div>                 
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
