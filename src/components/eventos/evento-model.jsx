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
import { link } from 'fs';

class OpenModal extends Component {
  constructor(props){
    super(props);

    this.state={
      ID_TIPO_EVENTO:'',
      FECHA:'',
      HORA_INICIO:'',
      HORA_FIN: '',
      show: false,
      tipoeventos:[],
    }
  }
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  componentDidMount(){
    this.getTiposEvento();
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

  handleAgregar = event => {
    event.preventDefault();
    const obj = {
      ID_TIPO_EVENTO: this.state.ID_TIPO_EVENTO,
      FECHA: this.state.FECHA,
      HORA_INICIO: this.state.HORA_INICIO,
      HORA_FIN: this.state.HORA_FIN
    };
    // console.log(obj);
    if (obj.ID_TIPO_EVENTO == '' || obj.FECHA == '' ||
        obj.HORA_INICIO == '' || obj.HORA_FIN == '') {
      return alert("Favor diligenciar todos los campos");
    }else{
      // console.log(obj);
      const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('id_token')
        }
      };

      axios.post('http://localhost:5000/evento/crear', obj, config)
      .then(response=>console.log(response.data,obj))
      .then(this.props.metodo)
      .then(alert("Se ha agregado el evento"))
      .then(this.close)
      .catch(err => console.log(err))
    }
    this.setState({ID_TIPO_EVENTO: '', FECHA: '', HORA_INICIO: '', HORA_FIN: ''})
  }

  render() {
    return (
      <div>
        <div align="left">
          <Button onClick={this.open} renderAs="a" className="navbar-item has-text-grey-light"
            style={{ background: `#6D214F` }}>CREAR EVENTO</Button>
        </div>

        <Modal show={this.state.show} onClose={this.close} closeOnEsc={true} closeOnBlur={true}>
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
                        <div className="select" style={{border:`solid 0px rgb(134, 56, 103)`}}>
                          <select value={this.state.ID_TIPO_EVENTO} onChange={e => this.setState({ID_TIPO_EVENTO:e.target.value})} required>
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
                        <div className="control">
                          <input className="input" type="date" required value={this.state.FECHA} onChange={e => this.setState({FECHA:e.target.value.toUpperCase()})}/>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">HORA INICIO:</label>
                        <div className="control">
                          <input className="input" type="time" required value={this.state.HORA_INICIO} onChange={e => this.setState({HORA_INICIO:e.target.value.toUpperCase()})}/>
                        </div>
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">HORA FIN:</label>
                        <div className="control">
                          <input className="input" type="time" required value={this.state.HORA_FIN} onChange={e => this.setState({HORA_FIN:e.target.value.toUpperCase()})}/>
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
                      <Button onClick={this.handleAgregar} className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }}>CREAR</Button>
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

export default OpenModal;
