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
      ministerio:{
        IDENTIFICACION: this.props.user.IDENTIFICACION,
        NOMBRE: this.props.user.NOMBRE,
        DESCRIPCION: this.props.user.DESCRIPCION,
        ESTADO: this.props.user.ESTADO
      },
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
    console.log(this.props);
      this.getEvento()
  }

  getEvento = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch('http://localhost:5000/ministerio/' + this.props.user.ID_MINISTERIO,config)
    .then(response => response.json())
    .then(datos => this.setState({ministerio:datos}))
    .catch(err => console.log(err))
    // console.log(this.props);
  }

  handleEditar = event => {
    event.preventDefault();
    const obj = {
      ID_MINISTERIO: this.props.user.ID_MINISTERIO,
      NOMBRE: this.state.ministerio.NOMBRE,
      ESTADO: this.state.ministerio.ESTADO
    };
    // console.log(obj);
    if (obj.NOMBRE == '' || obj.ESTADO == '') {
      return alert("Favor diligenciar todos los campos");
    }else{
      const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('id_token')
        }
      };
      axios.post('http://localhost:5000/ministerio/editar', obj, config)
      // console.log(response.data);
        .then(response=>console.log(response.data,obj))
        .then(this.props.metodo)
        .then(alert("se ha editado el ministerio"))
        .then(this.close)
        .catch(err => console.log(err))
    }
  }

  render() {
    const {ministerio}= this.state;
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
                        <input className="input" type="text" value={ministerio.NOMBRE} onChange={e => this.setState({ministerio: {...ministerio,NOMBRE:e.target.value.toUpperCase()}})} />
                      </div>
                    </div>
                    <div className="columns">
                      <div className="column">
                        <label className="label">ESTADO: </label>
                        <div className="control">
                          <div className="select" style={{border:`solid 0px rgb(134, 56, 103)`}}>
                            <select value={this.state.ministerio.ESTADO}  onChange={e => this.setState({ministerio: {...ministerio,ESTADO:e.target.value.toUpperCase()}})} required>
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
