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
import { FaEdit } from "react-icons/fa";
//Our higher order component
import withAuth from '../withAuth';

class OpenModaledit extends Component {
  constructor(props){
    super(props);
    this.state={
      show: false,
        ID_TIPO_EVENTO: this.props.event.ID_TIPO_EVENTO,
        FECHA: this.props.event.FECHA,
        HORA_INICIO: this.props.event.HORA_INICIO,
        HORA_FIN: this.props.event.HORA_FIN,
      tipoeventos:[]
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
    this.getTiposEvento();
    this.getEvento()
  }

  getEvento = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch('http://localhost:5000/evento/' + this.props.event.ID_EVENTO,config)
    .then(response => response.json())
    .then(datos => this.setState({evento:datos}))
    .catch(err => console.log(err))
    console.log(this.props);
  }

  getTiposEvento = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch('http://localhost:5000/tiposevento',config)
    .then(response => response.json())
    .then(datos => this.setState({tipoeventos:datos}))
    .catch(err => console.log(err))
  }

  handleEditar = event => {
    event.preventDefault();
    const obj = {
      ID_EVENTO: this.props.event.ID_EVENTO,
      ID_TIPO_EVENTO: this.state.ID_TIPO_EVENTO,
      // FECHA: this.state.evento.FECHA,
      FECHA: this.state.FECHA,
      HORA_INICIO: this.state.HORA_INICIO,
      HORA_FIN: this.state.HORA_FIN
    };
    console.log(obj);
    if (obj.FECHA == '' || obj.HORA_INICIO == '' || obj.HORA_INICIO == '') {
      return alert("Favor diligenciar todos los campos");
    }else{
      const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('id_token')
        }
      };
      axios.post('http://localhost:5000/evento/editar', obj, config)
      // console.log(response.data);
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("se ha editado el evento"))
        .then(this.close)
        .catch(err => console.log(err))
    }
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
                        <label className="label">TIPO DE EVENTO:</label>
                        <div className="select"  style={{border:`solid 0px rgb(134, 56, 103)`}}>
                          <select disabled value={this.state.ID_TIPO_EVENTO} onChange={e => this.setState({ID_TIPO_EVENTO:e.target.value})} required>
                            <option value="">---Seleccione---</option>
                            {this.state.tipoeventos.map(option => (
                              <option key={option.ID_TIPO_EVENTO} value={option.ID_TIPO_EVENTO}>
                                {option.NOMBRE}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">FECHA:</label>
                          <input className="input" type="date" required value={this.state.FECHA} onChange={e => this.setState({FECHA:e.target.value})} required/>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">HORA INICIO:</label>
                        <div className="control">
                          <input className="input" type="time" required value={this.state.HORA_INICIO} onChange={e => this.setState({HORA_INICIO:e.target.value})} required/>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">HORA FIN:</label>
                        <div className="control">
                          <input className="input" type="time" required value={this.state.HORA_FIN} onChange={e => this.setState({HORA_FIN:e.target.value})} required/>
                        </div>
                      </div>
                    </div>
                  </Content>

                </Media.Item>
              </Media>
            </Modal.Card.Body>
            <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                  <div className="columns">
                    <div className="column">
                      <Button onClick={this.handleEditar} className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }}>EDITAR</Button>
                    </div>
                  </div>
                </Level.Side>
              </Level>
            </Modal.Card.Foot>
          </Modal.Card>
        </Modal>
      </div>
    );
  }
}

export default OpenModaledit;
