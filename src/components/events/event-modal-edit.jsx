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
import { FaEdit } from "react-icons/fa";
//Our higher order component
import withAuth from '../withAuth';

class OpenModaledit extends Component {
  constructor(props){
    super(props);
    
    this.state={
      
      show: false,
      evento:{
          NOMBRE: '',
          FECHA_EVENTO: '',
          HORA_INICIO: '',
          HORA_FIN:'',
      }
     
    }
  }
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
   open = () => this.setState({ show: true });
  close = () => this.setState({ show: false}); 

  componentDidMount(){
      this.getEvento()
  }

  getEvento= () => {
     const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        }; 
    fetch('http://localhost:5000/evento/'+this.props.id,config)
    .then(response => response.json())
    .then(datos => {
        datos.FECHA_EVENTO=this.fechaActual(datos.FECHA_EVENTO);        
        this.setState({evento:datos})})    
    .catch(err => console.log(err))
  } 
  fechaActual(FECHA_EVENTO){
    var d = new Date(FECHA_EVENTO);
     var   month = '' + (d.getMonth() + 1);
      var  day = '' + (d.getDate());
        var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
 

  }
  fechaDos(variable){
      const {evento}=this.state;
    var d = new Date(variable);
     var   month = '' + (d.getMonth() + 1);
      var  day = '' + (d.getDate()+1);
        var year = d.getFullYear();
       
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
 this.setState({evento: {...evento,FECHA_EVENTO:[year, month, day].join('-')}});
  
  }
  onChangefechaActual = e =>{
      this.fechaDos(e.target.value);
         
         

  }
  
  handleEditar = event => {
    event.preventDefault();
    const obj = {
        ID_EVENTO: this.props.id,
        NOMBRE: this.state.evento.NOMBRE,
        FECHA_EVENTO: this.state.evento.FECHA_EVENTO,
        HORA_INICIO: this.state.evento.HORA_INICIO,
        HORA_FIN: this.state.evento.HORA_FIN,
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/evento/editar', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("Se ha editado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))
  }

  render() {
     
  
      const {evento}= this.state;
    return (
      <div>
          <Button onClick={this.open} renderAs="a"><FaEdit/></Button>
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
                <input className="input" type="text" required value={evento.NOMBRE} onChange={e => this.setState({evento: {...evento,NOMBRE:e.target.value.toUpperCase()}})} />
              </div>
              </div>
              <div className="columns">
              <div className="column">
              <label className="label">FECHA: </label>
                <div className="control">
                <input className="input" type="date" required value={this.state.evento.FECHA_EVENTO}  onChange={this.onChangefechaActual} />
            </div>
            </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">HORA DE INICIO: </label>
                <input className="input" type="time" required value={evento.HORA_INICIO} onChange={e => this.setState({evento: {...evento,HORA_INICIO:e.target.value}})} />                
              </div>
              </div>
              <div className="columns">
              <div className="column">
                <label className="label">HORA DE FIN: </label>
                <input className="input" type="time" required value={evento.HORA_FIN} onChange={e => this.setState({evento: {...evento,HORA_FIN:e.target.value}})} />                
              </div>
              </div>
              </Content>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                <div className="columns">
                <div className="column">
                  <Button onClick={this.handleEditar} >Editar</Button>
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

export default OpenModaledit;
