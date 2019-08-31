import React, { Component } from 'react';
import OpenModal from './invited-modal.jsx';
import './assistance.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../../AuthHelperMethods';

//Our higher order component
import withAuth from '../../withAuth';
import Select from "react-dropdown-select";

class Assistance extends Component {
  constructor(props){
    super(props);
    
    this.state={
      cedula: null,
      persona: [],
      tempo: false,
      source: null,
     
    }
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  } 
  componentDidMount(){
    (function() {
        var burger = document.querySelector('.burger');
        var nav = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function(){
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
        });
      })();
  }
  
  Consultar = event =>{
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    event.preventDefault();
    fetch('http://localhost:5000/persona/'+this.state.cedula,config)
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
          console.log("something goes wrong! Maybe image url broken, try another img url.")
          })
  }

  RegistrarAsistente = event =>{
      event.preventDefault();
      if(this.state.tempo===true){
      const obj={
        INVITADO: 'NO',
        ASISTENTE: this.state.persona.ID_MIEMBRO,
        
        EVENTO: this.props.match.params.event_id,
      };
      const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token'),        
        }
        };
      axios.post('http://localhost:5000/asistencia/crear',obj,config)
        .then(response=>console.log(response.data,obj))
        .then(alert("Se ha registrado el asistente"))      
        .catch(err => console.log(err))
        this.setState({ tempo: false, persona: [], source: null, cedula: ''})

      }
      else{
        alert("Por favor busque un miembro");
      }

  }
  
  


  render() {
      console.log(this.props)
    let event_id = this.props.match.params.event_id;
    let event_name = this.props.match.params.event_name;

    console.log(event_id);
    console.log(event_name);
    const{cedula, persona,tempo,source}= this.state;
    return (
      <div>
        {this.props.history.location.state.roll===1 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="/public/imagenes/logo.jpg" />
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/" className="navbar-item has-text-grey-light">INICIO</Link>

      <Link to="/register" className="navbar-item has-text-grey-light">REGISTRAR PERSONAS</Link>
      <Link to="/assistancelist" className="navbar-item has-text-grey-light">REGISTRAR ASISTENCIA</Link>
      <Link to="/createevent" className="navbar-item has-text-grey-light">EVENTOS</Link>
      <Link to="/createlog" className="navbar-item has-text-grey-light">LOGISTICAS</Link>
      <Link to="/personas" className="navbar-item has-text-grey-light">PERSONAS</Link>
      <Link to="/usuarios" className="navbar-item has-text-grey-light">USUARIOS</Link>  
      <Link to="/reports" className="navbar-item has-text-grey-light">REPORTES</Link>   
  </div>
  <div className="navbar-end">
        <div className="navbar-item">
          <strong className="has-text-grey-light">{name+"     "}</strong>
        </div>
      <div className="navbar-item">            
          <div className="buttons">   
      <button className="button is-info is-inverted is-outlined" onClick={this._handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
      
  </div>
</nav>
      }
      {this.props.history.location.state.roll===0 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="/public/imagenes/logo.jpg" />
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu ">
    <div className="navbar-start">
    <div className="navbar-item">
      <Link to="/" className="navbar-item has-text-grey-light">INICIO</Link>
      <Link to="/assistancelist" className="navbar-item has-text-grey-light">REGISTRAR ASISTENCIA</Link> 
      </div>   
  </div>
  <div className="navbar-end">
  <div className="navbar-item"> 
      <div className="buttons" >              
            <strong className="has-text-grey-light">{name}</strong>      
        </div>
      </div>
      <div className="navbar-item"> 
      <div className="buttons">                    
      <button className="button is-info is-inverted is-outlined" onClick={this._handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
      }
      {this.props.history.location.state.roll===2 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="/public/imagenes/logo.jpg" />
    </a>

    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link to="/" className="navbar-item has-text-grey-light">INICIO</Link>
      <Link to="/register" className="navbar-item has-text-grey-light">REGISTRAR PERSONA</Link>
      <Link to="/assistancelist" className="navbar-item has-text-grey-light">REGISTRAR ASISTENCIA</Link>
      <Link to="/createevent" className="navbar-item has-text-grey-light">EVENTOS</Link>    
         
  </div>
  <div className="navbar-end">
        <div className="navbar-item">
          <strong className="has-text-grey-light">{name+"     "}</strong>
        </div>
      <div className="navbar-item">            
          <div className="buttons">   
      <button className="button is-info is-inverted is-outlined" onClick={this._handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
      }
        <h3 className="title has-text-centered">REGISTRAR ASISTENTE EN EVENTO {event_name.toUpperCase()}</h3>
        <div className="columns">
          <div className="column">
            <div className="card" style={{maxWidth: '75%'}}>
              <div className="card-image">
                <figure className="image is-4by3">
                  {
                      (tempo===true&& source!=null)?(
                        <p className="subtitle is-6"><img src={source} /></p>
                      ):(<img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />)
                    }
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">Información Basica:</p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Nombre:</p>
                    {
                      (tempo===true)?(
                        <p className="subtitle is-6">{persona.PRIMER_NOMBRE+" "+persona.SEGUND_NOMBRE+" "+ persona.PRIMER_APELLIDO+" "+persona.SEGUND_APELLIDO}</p>
                      ):(<p className="subtitle is-6">nombre completo</p>)
                    }
                    
                  </div>
                </div>
                <div className="media">
                  <div className="media-content">
                    <p className="title is-5">Cédula:</p>
                     {
                      (tempo===true)?(
                        <p className="subtitle is-6">{persona.IDENTIFICACION}</p>
                      ):(<p className="subtitle is-6">numero de cedula</p>)
                    }
                   
                  </div>
                </div>
                <br/>
                
              </div>
            </div>
          </div>
          <div className="column">
            <label>ASISTENTE <font color="red">*</font></label>
            <input className="input" placeholder="Buscar por Cedula" type="number" required value={cedula} id="identificacion" onChange={e => this.setState({cedula:e.target.value})} />
    
          </div>
          <div className="column">
            <button type="button" className="button is-rounded is-medium is-fullwidth" onClick={this.Consultar} style={{backgroundColor:`#64234A`, color: `#FFF`, marginTop: '5%'}}>Buscar</button>
            <button type="button" onClick={this.RegistrarAsistente} className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF`, marginTop: '5%'}}>Registrar Asistente</button>
          <hr className="separator-violet"/>
        <span>Si el asistente es invitado, por favor diligenciar la siguiente información</span><br/><br/>
        <OpenModal titulo="Registrar Invitado" evento_id={this.props.match.params.event_id} subtitulo="INFORMACIÓN BÁSICA"></OpenModal>
          <br/><br/><Link to="/assistancelist" className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF` }}>CANCELAR</Link>
          
          </div>
          
          
        </div>

        <br/>
        
      </div>
    );
  }
}

export default Assistance;
