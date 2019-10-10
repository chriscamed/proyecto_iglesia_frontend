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
      usuario: {
        USUARIO: this.props.user.USUARIO,
        PASSWORD: '',
        ROL: this.props.user.ROL,
        ESTADO: this.props.user.ESTADO
      },
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
        }],
      estados:[
        {
          id:1,
          nombre:"Activo"
        },
        {
          id:0,
          nombre:"Inactivo"
        }
      ]
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

  getEvento = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch('http://localhost:5000/user/individual/' + this.props.user.ID_USER,config)
    .then(response => response.json())
    .then(datos => this.setState({usuario:datos}))
    .catch(err => console.log(err))
    //console.log(this.props);
  }

  handleEditar = event => {
    event.preventDefault();
    const obj = {
      USER_ID: this.props.user.ID_USER,
      PASSWORD: this.state.usuario.PASSWORD,
      ROL: this.state.usuario.ROL,
      ESTADO: this.state.usuario.ESTADO,
    };
    // console.log(obj);
    if (obj.PASSWORD == undefined || obj.PASSWORD == '' || obj.ROL == '' || obj.ESTADO == '') {
      // console.log('prueba false');
      return alert("Favor diligenciar todos los campos");
    }else{
      // console.log('prueba true');
      const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('id_token')
        }
      };
      axios.post('http://localhost:5000/user/update', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("se ha editado el usuario"))
        .then(this.close)
        .catch(err => console.log(err))
    }
  }

  render() {

    const {usuario}= this.state;
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
                        <label className="label">USUARIO: </label>
                        <input className="input" type="text" disabled={true} value={usuario.USUARIO} onChange={e => this.setState({usuario: {...usuario,USUARIO:e.target.value.toUpperCase()}})} />
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">PASSWORD: </label>
                        <input className="input" type="password" required value={usuario.PASSWORD} onChange={e => this.setState({usuario: {...usuario,PASSWORD:e.target.value.toUpperCase()}})} />
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">ROL: </label>
                        <div className="control">
                          <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                            <select value={this.state.usuario.ROL}  onChange={e => this.setState({usuario: {...usuario,ROL:e.target.value.toUpperCase()}})} required>
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
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">ESTADO: </label>
                        <div className="control">
                          <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                            <select value={this.state.usuario.ESTADO}  onChange={e => this.setState({usuario: {...usuario,ESTADO:e.target.value.toUpperCase()}})} required>
                              <option value="">---Seleccione---</option>
                              {this.state.estados.map(option => (
                                <option key={option.id} value={option.id}>
                                  {option.nombre}
                                </option>
                              ))}
                            </select>
                          </div>
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
                      <Button onClick={this.handleEditar} className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }}> EDITAR </Button>
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
