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
      NOMBRE:'',
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
      NOMBRE: this.state.NOMBRE
    };
    // console.log(obj);
    if (obj.NOMBRE == '') {
      // console.log('prueba false');
      return alert("Favor diligenciar todos los campos");
    }else{
      console.log(obj);
      const config = {
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('id_token')
        }
      };

      axios.post('http://localhost:5000/tipoevento/crear', obj, config)
      .then(response=>console.log(response.data,obj))
      .then(this.props.metodo)
      .then(alert("Se ha agregado el Tipo de Evento"))
      .then(this.close)
      .catch(err => console.log(err))
    }
    this.setState({NOMBRE: ''})
  }

  render() {
    return (
      <div>
        <div align="left">
          <Button onClick={this.open} renderAs="a" className="navbar-item has-text-grey-light"
            style={{ background: `#6D214F` }}>CREAR TIPO DE EVENTO</Button>
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
                        <label className="label">NOMBRE:</label>
                        <div className="control">
                          <input className="input" type="text" required value={this.state.NOMBRE} onChange={e => this.setState({NOMBRE:e.target.value.toUpperCase()})}/>
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
