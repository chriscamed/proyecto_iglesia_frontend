import React, { Component } from 'react';
import axios from 'axios';
import '../../App.css';
import '../../App.sass';
import '../../estilo.css';
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
      ACTIVIDAD : '',
      EVENTO : null,
      RESPONSABLE : null,
      personas : [],
      eventos: [],
      show: false,
      size: 5,
      page: 1,
     
    }
  }
  Auth = new AuthHelperMethods(); 
 
  componentDidMount(){
     this.getEventos();
    this.getMiembros();
  }
  getEventos= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/eventos',config)
    .then(response => response.json())
    .then(datos => this.setState({eventos: datos}))
    .catch(err => console.log(err))
  }
  getMiembros= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/personas', config)
    .then(response => response.json())
    .then(datos => this.setState({personas: datos}))
    .catch(err => console.log(err))
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
   open = () => this.setState({ show: true });
  close = () => this.setState({ show: false }); 
  
  handleAgregar = event => {
    event.preventDefault();
    const obj = {
        ACTIVIDAD: this.state.ACTIVIDAD,
        EVENTO: this.state.EVENTO,
        RESPONSABLE: this.state.RESPONSABLE,
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/logistica/crear', obj,config)        
        .then(response=>console.log(response.data,obj))
        .then(this.props.logisticas)
        .then(alert("Se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({ACTIVIDAD: '', EVENTO: '', RESPONSABLE:''})
  }

  render() { 
    this.state.ACTIVIDAD.substr()
    return (
      <div>
          <Button onClick={this.open} renderAs="a" className="button is-normal">Crear Logistica</Button>
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
                <label className="label">ACTIVIDAD: </label>
                <input className="input" type="text" required value={this.state.ACTIVIDAD} onChange={e => this.setState({ACTIVIDAD:e.target.value.toUpperCase()})} />
              </div>
              </div>
              <div className="columns">
              <div className="column is-full">
              <label className="label">EVENTO: </label>                       
              <div className="select is-full" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select name="select is-full" value={this.state.EVENTO} onChange={e => this.setState({EVENTO:e.target.value})}>
                        <option selected={true} value="">---Seleccione---</option>
                        {this.state.eventos.map(option => (                          
                        <option key={option.ID_EVENTO} value={option.ID_EVENTO} title={option.HORA_INICIO+' '+option.HORA_FIN}>
                        {option.NOMBRE +' '+ option.FECHA_EVENTO.substr(0,10)}
                      </option>
                    ))}
                  </select>
                      </div>
                
            </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">RESPONSABLE: </label>
                <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select name="select" value={this.state.RESPONSABLE}  onChange={e => this.setState({RESPONSABLE:e.target.value})}>
                        <option selected={true} value="">---Seleccione---</option>
                        {this.state.personas.map(option => (                          
                        <option key={option.ID_MIEMBRO} value={option.ID_MIEMBRO} title={option.IDENTIFICACION}>
                        {option.PRIMER_NOMBRE +' '+ option.SEGUND_NOMBRE+' '+option.PRIMER_APELLIDO+' '+option.SEGUND_APELLIDO}
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
