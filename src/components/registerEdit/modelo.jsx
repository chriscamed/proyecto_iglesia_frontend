import React from 'react';
import axios from 'axios';
import '../../App.css';
import '../../App.sass';
import '../../estilo.css';
//import { storiesOf } from '@storybook/react';
//import Image from 'react-bulma-components/lib/components/image';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import Modal from 'react-bulma-components/lib/components/modal';
//import Dropdown from 'react-bulma-components/lib/components/dropdown';
//import Image from 'react-bulma-components/lib/components/image';
//import Media from 'react-bulma-components/lib/components/media';
import Button from 'react-bulma-components/lib/components/button';
//import Content from 'react-bulma-components/lib/components/content';
import Media from 'react-bulma-components/lib/components/media';
//import Level from 'react-bulma-components/lib/components/level';

class OpenModal extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      options: [],
      campo_id:null,
      campo:'',
      show: false,
    }
  }


  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });
  
  handleAgregar = event => {
    event.preventDefault();
    if(this.props.subtitulo==="Barrio"){
    const obj = {
        BARRIO: this.state.campo
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/barrio/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .then(alert("se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({ campo: ''})
      }
    if(this.props.subtitulo==="Profesion"){
    const obj = {
        PROFESION: this.state.campo
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/profesion/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .then(alert("se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({ campo: ''})
      }
      if(this.props.subtitulo==="Ocupacion"){
    const obj = {
        OCUPACION: this.state.campo
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/ocupacion/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .then(alert("se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({ campo: ''})
      }
      if(this.props.subtitulo==="Ministerio"){
    const obj = {
        NOMBRE: this.state.campo
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/ministerio/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .then(alert("se ha agregado exitosamente"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({ campo: ''})
      }
  
  }
  
  handleEditar = event =>{
    event.preventDefault();
    if(this.props.subtitulo==="Barrio"){
    const obj = {
        BARRIO: this.state.campo,
        ID_BARRIO: this.state.campo_id
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/barrio/editar', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .then(this.setState({[e.target.name]:''}))
        .catch(err => console.log(err))
        
  }
  if(this.props.subtitulo==="Profesion"){
    const obj = {
        PROFESION: this.state.campo,
        ID_PROFESION: this.state.campo_id
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/profesion/editar', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .catch(err => console.log(err))

  }
  if(this.props.subtitulo==="Ocupacion"){
    const obj = {
        OCUPACION: this.state.campo,
        ID_OCUPACION: this.state.campo_id
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/ocupacion/editar', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .catch(err => console.log(err))

  }
  if(this.props.subtitulo==="Ministerio"){
    const obj = {
        NOMBRE: this.state.campo,
        ID_MINISTERIO: this.state.campo_id
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/ministerio/editar', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(this.props.Actualizar)
        .catch(err => console.log(err))

  }
}
  
  render() {
    return (
      <div>
        <Button onClick={this.open} renderAs="a">+</Button>
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
                <label className="label">Seleccionar {this.props.subtitulo} (Editar): </label>
                {this.props.subtitulo==="Barrio" &&        
               <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select name="select"  onChange={e => this.setState({campo_id:e.target.value})}>
                        <option selected={true} value="">---Seleccione---</option>
                        {this.props.options.map(option => (                          
                        <option key={option.ID_BARRIO} value={option.ID_BARRIO}>
                        {option.BARRIO}
                      </option>
                    ))}
                  </select>
                      </div>
                }
                {this.props.subtitulo==="Profesion" &&        
               <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select onChange={e => this.setState({campo_id:e.target.value})}>
                        <option value="">---Seleccione---</option>
                        {this.props.options.map(option => (                          
                        <option key={option.ID_PROFESION} value={option.ID_PROFESION}>
                        {option.PROFESION}
                      </option>
                    ))}
                  </select>
                      </div>
                }
                {this.props.subtitulo==="Ocupacion" &&        
               <div className="select"  style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select onChange={e => this.setState({campo_id:e.target.value})}>
                        <option value="">---Seleccione---</option>
                        {this.props.options.map(option => (                          
                        <option key={option.ID_OCUPACION} value={option.ID_OCUPACION}>
                        {option.OCUPACION}
                      </option>
                    ))}
                  </select>
                      </div>
                }
                {this.props.subtitulo==="Ministerio" &&        
               <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                        <select  onChange={e => this.setState({campo_id:e.target.value})}>
                        <option value="">---Seleccione---</option>
                        {this.props.options.map(option => (                          
                        <option key={option.ID_MINISTERIO} value={option.ID_MINISTERIO}>
                        {option.NOMBRE}
                      </option>
                    ))}
                  </select>
                      </div>
                }
              </div>
              <br></br>
              <div className="columns">
              <label className="label">Nombre: </label>
                <div className="control">
                <input className="input" type="text" required value={this.state.campo} onChange={e => this.setState({campo:e.target.value})}  />
            </div>
              </div>
              <br></br>
              </Content>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                <div className="columns">
                  <Button onClick={this.handleAgregar} >AGREGAR</Button>
                  <Button onClick={this.handleEditar} >EDITAR</Button>
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
