import React, { Component } from 'react';
import axios from 'axios';
import { FaEye } from "react-icons/fa";
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
      persona:[],
      show: false,
      source: null,
     
    }
  }
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
   open = () => this.setState({ show: true },this.Consultar());
  close = () => this.setState({ show: false });
  
  componentDidMount(){
      
  }
  
  Consultar(){
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    
    fetch('http://localhost:5000/persona/simple/'+this.props.id,config)
    .then(response => response.json())
    .then(datos => this.setState({persona: datos},this.Traerimagen))
    .then(console.log(this.state.persona.fotopersona))
    .then(this.setState({tempo:true}))   
    .catch(err => console.log(err))  
    
  }
  Traerimagen(){
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),
        
        },
        responseType: 'arraybuffer'

        };
    const foto= this.state.persona.fotopersona;  
    axios.get('http://localhost:5000/uploads/'+foto,config)
        .then(response => {
          let imageNode = this.state.source;
          let blob = new Blob(
            [response.data], 
            {type: response.headers['content-type']}
          )
          console.log(blob);
          let imgUrl = URL.createObjectURL(blob)
          console.log(imgUrl);
          imageNode = imgUrl;
          this.setState({source: imageNode})
          })
          .catch(error => {
          console.log(error)
          })
  }
  fecha(date){
    var fecha = ""+date;
   return fecha.substr(0,10);
    
  }

  render() {    
      const {persona}= this.state;
    return (
      <div>
          <Button onClick={this.open} renderAs="a" className="button is-medium"><FaEye/></Button>
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
                <label className="label">FOTO: </label>                
              </div>
                <div className="column">
                <p className="subtitle is-6"><img src={this.state.source} /></p>                
              </div>
              </div>
                <div className="columns">
                <div className="column">
                <label className="label">PRIMER NOMBRE: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.PRIMER_NOMBRE} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">SEGUNDO NOMBRE: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.SEGUND_NOMBRE} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">PRIMER APELLIDO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.PRIMER_APELLIDO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">SEGUNDO APELLIDO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.SEGUND_APELLIDO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">TIPO IDENTIFICACION: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.TIPO_IDENTIFICACION} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">IDENTIFICACION: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.IDENTIFICACION} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">NACIMIENTO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.FECHA_NACIMIENTO?persona.FECHA_NACIMIENTO.substr(0,10):""} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">GENERO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.GENERO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">ESTADO CIVIL: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.ESTADO_CIVIL} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">CORREO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.CORREO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">CELULAR: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.CELULAR1} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">CELULAR (OTRO): </label>                
              </div>
                <div className="column">
                <label className="label">{persona.CELULAR2} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">TEL. FIJO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.TELEFONO_FIJO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">BARRIO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.BARRIO} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">DIRECCION: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.DIRECCION_CASA} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">EMPRESA: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.EMPRESA} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">TEL. EMPRESA: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.TELEFONO_EXT} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">BAUTIZO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.FECHA_BAUTIZO?persona.FECHA_BAUTIZO.substr(0,10):""} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">PROFESION: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.PROFESION} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">OCUPACION: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.OCUPACION} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">MINISTERIO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.NOMBRE} </label>                
              </div>
              </div>
              <div className="columns">
                <div className="column">
                <label className="label">ESTADO: </label>                
              </div>
                <div className="column">
                <label className="label">{persona.ESTADO} </label>                
              </div>
              </div>              
              </Content>              
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
