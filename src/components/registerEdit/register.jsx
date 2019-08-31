import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Heading from 'react-bulma-components/lib/components/heading';
import '../../estilo.css';
import '../../App.css';
import '../../App.sass';
import OpenModal from './modelo.jsx';
import { FaCheck } from 'react-icons/fa';
import { IoIosCloseCircleOutline } from "react-icons/io";
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';

//Our higher order component
import withAuth from '../withAuth';

//Componente que hace referencia al titulo de cada campo, se reciben parametros de titulo y si el campo es obligatorio
function Nombre(props){
  if(props.obligatorio===true)
        return <label className="label">{props.title} <font color="red">*</font></label>;
  else
        return <label className="label">{props.title} </label>;
}
// Componente que hace referencia a todo el campo, es padre del componente Nombre
// aqui se deduce que tipo de campo se quiere text, select, radio, button, field, etc
//recibe varios parametros segun sea el campo requerido
// por ejemplo si quiero un campo radio debo enviar parametros de cada radio (femenino- masculino)
function Campo(props){
  if(props.campo==="text"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      {
          (props.obligatorio===true)?(
           <div className="control">
           <input className="input" type="text" required value={props.valor} onChange={props.cambiar} maxLength={props.maximo} />
            </div>
          ):(
            <div className="control">
           <input className="input" type="text" value={props.valor} onChange={props.cambiar} maxLength={props.maximo} />
            </div>
          )

        }
  </div>);
  }
  if(props.campo==="number"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      {
        (props.obligatorio===true)?(
           <div className="control">
           <input className="input" type="number" required pattern="\d*" value={props.valor} onChange={props.cambiar} />
          </div>
          ):(

            <div className="control">
           <input className="input" type="number" pattern="\d*" value={props.valor} onChange={props.cambiar} />
          </div>
          )
      }

  </div>);
  }
  if(props.campo==="email"){
    return(
    <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      {
        (props.valor==='')?(
          <div className="control">
           <input className="input" type="email"   value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
            <p className="help is-grey-light">Ej: nombre@correo.com</p>
          </div>
        ):(
          (props.validar===true)?(
            <div className="control has-icons-right">
            <input className="input is-success" type="email"   value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
            <span className="icon is-small is-right">
              <i className="help is-success"><FaCheck/></i>
            </span>
            <p className="help is-success">Correo valido</p>
            </div>
          ):(
            <div className="control has-icons-right">
            <input className="input is-danger" type="email"   value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
            <span className="icon is-small is-right">
              <i className="help is-danger"><IoIosCloseCircleOutline/></i>
            </span>
            <p className="help is-danger">Correo invalido</p>
            </div>

          )
        )
      }

    </div>);
  }
  if(props.campo==="select"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="field has-addons">
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor} onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_MINISTERIO} value={option.ID_MINISTERIO}>
            {option.NOMBRE}
          </option>
        ))}
      </select>
           </div>          
      </div>
       <div className="control">
      <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR MINISTERIO" subtitulo="Ministerio" options={props.options}
       ></OpenModal>
      </div>
      </div>
  </div>
  );
  }
  if(props.campo==="select3"){
  return(

  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="field has-addons">
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_OCUPACION} value={option.ID_OCUPACION}>
            {option.OCUPACION}
          </option>
        ))}
      </select>
           </div>           
      </div>
      <div className="control">
      <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR OCUPACIÓN" subtitulo="Ocupacion" options={props.options}
       ></OpenModal>
      </div>
      </div>
  </div>);
  }
  if(props.campo==="select6"){
  return(

  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_ESTADO} value={option.ID_ESTADO}>
            {option.ESTADO}
          </option>
        ))}
      </select>
           </div>
      </div>
  </div>);
  }
  if(props.campo==="select5"){
  return(

  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="field has-addons">
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_PROFESION} value={option.ID_PROFESION}>
            {option.PROFESION}
          </option>
        ))}
      </select>
           </div>          
      </div>
       <div className="control">
      <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR PROFESIÓN" subtitulo="Profesion" options={props.options}
       ></OpenModal>
      </div>
      </div>
  </div>);
  }
  if(props.campo==="select4"){
  return(

  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="field has-addons">
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option selected value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_BARRIO} value={option.ID_BARRIO}>
            {option.BARRIO}
          </option>
        ))}
      </select>
      
           </div>
          
      </div>
      <div className="control">
      <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR BARRIO" subtitulo="Barrio" options={props.options}
       ></OpenModal>
      </div>
      </div>
    </div>);
  }
  if(props.campo==="select8"){
  return(

  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="control">
           <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.ID_MIEMBRO} value={option.ID_MIEMBRO} title={option.IDENTIFICACION}>
            {option.PRIMER_NOMBRE}  {option.PRIMER_APELLIDO}
          </option>
        ))}
      </select>
           </div>         
      </div>
    </div>);
  }
  if(props.campo==="select2"){
    return(
      <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {
          (props.obligatorio===true)?(
           <div className="control">
          <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar} required>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.valor} value={option.valor}>
            {option.nombre}
          </option>
        ))}
      </select>
          </div>
        </div>
          ):(
            <div className="control">
          <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
            <select value={props.valor}  onChange={props.cambiar}>
            <option value="">---Seleccione---</option>
            {props.options.map(option => (
            <option key={option.valor} value={option.valor}>
            {option.nombre}
          </option>
        ))}
      </select>
          </div>
        </div>)
        }

      </div>
    );
  }
  if(props.campo==="date"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="control">
           <input className="input" type="date"  value={props.valor} onChange={props.cambiar} max={props.maximo}/>
      </div>
  </div>);
  }
  if(props.campo==="date2"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="control">
           <input className="input" type="date" disabled  value={props.valor} onChange={props.cambiar} max={props.maximo}/>
      </div>
  </div>);
  }
  if(props.campo==="radio"){
  return(
  <div className="field">
      <Nombre title={props.title} />
      {
        (props.obligatorio===true)?(
            <div className="control">
          <label className="radio">
          {props.radio1}&nbsp; &nbsp; &nbsp;
            <input type="radio" name={props.rad} value={props.radio3} onChange={props.cambiar}/>
          </label>
          <label className="radio">
          {props.radio2} &nbsp; &nbsp; &nbsp;
            <input type="radio" name={props.rad} value={props.radio4} onChange={props.cambiar}/>
          </label>
      </div>):
      (
        <div className="control">
          <label className="radio">
          {props.radio1}&nbsp; &nbsp; &nbsp;
            <input type="radio" name={props.rad} value={props.radio3} onChange={props.cambiar}/>
          </label>
          <label className="radio">
          {props.radio2} &nbsp; &nbsp; &nbsp;
            <input type="radio" name={props.rad} value={props.radio4} onChange={props.cambiar}/>
          </label>
      </div>
      )
      }
  </div>);
  }

  if(props.campo==="file"){
  return(
  <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
      <div className="control">
          <div className="file has-name ">
            <label className="file-label">
              <input className="file-input" type="file" name="fotopersona" onChange={props.cambiar}/>
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">
                  Buscar archivo
                </span>
              </span>
              <span className="file-name">
                 {(() => {
                if (props.valor!=null) {
                  return props.valor.name
                }
                })()}
              </span>
            </label>
          </div>
      </div>
  </div>);
  }
}

//componente principal
// contiene el formulario de registro de miembro, es el padre del componente Campo
class Edit extends Component {
  constructor(props){
    super(props);
    //this.fechaActual=this.fechaActual.bind(this);
    this.state = {
     persona:{
       ID_MIEMBRO:null,
      PRIMER_NOMBRE:'',
      SEGUND_NOMBRE:'',
      PRIMER_APELLIDO:'',
      SEGUND_APELLIDO:'',
      IDENTIFICACION:null,
      TIPO_IDENTIFICACION:null,
      FECHA_NACIMIENTO:null,
      GENERO:null,
      ESTADO_CIVIL:null,
      CORREO:'',
      CELULAR1:'',
      CELULAR2:'',
      TELEFONO_FIJO:'',
      DIRECCION_CASA:'',
      EMPRESA:'',
      TELEFONO_EXT:'',
      FECHA_BAUTIZO:null,
      OCUPACION:null,
      BARRIO:null,
      PROFESION:null,
      ESTADO:null,
      MINISTERIO:null,
      fotopersona:null,
      invitado_por:null,
      },
      temporal:{
         BAUTIZADO:'',
         validar_correo:null,
      },
      tipos:[
        {
          valor: "CC",
          nombre: "CEDULA DE CIUDADANIA"
        },
        {
          valor: "TI",
          nombre: "TARJETA DE IDENTIDAD"
        },
        {
          valor: "RC",
          nombre: "REGISTRO CIVIL"
        },
        {
          valor: "PS",
          nombre: "PASAPORTE"
        }
      ],
      tipos_civil:[
        {
          valor:"CASADO",
          nombre:"CASADO"
        },
        {
          valor: "DIVORCIADO",
          nombre: "DIVORCIADO"
        },
        {
          valor: "SOLTERO",
          nombre:"SOLTERO"
        },
        {
          valor: "UNION LIBRE",
          nombre: "UNION LIBRE"
        },
        {
          valor: "VIUDO",
          nombre: "VIUDO"
        }
      ],
      ocupaciones: [],
      barrios: [],
      profesiones: [],
      estados: [],
      miembros:[],
      ministerios:[],
      isChecked: true,
    }

  }
  componentDidMount(){   
    this.Consultar(this.props.history.location.state.cedula);
    this.getOcupaciones();
    this.getBarrios();
    this.getProfesiones();
    this.getEstados();
    this.getMiembros();
    this.getMinisterios();
    (function() {
        var burger = document.querySelector('.burger');
        var nav = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function(){
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
        });
      })();
  }
  Consultar(id){
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/persona/'+id,config)
    .then(response => response.json())
    .then(data => this.setState({persona:data})) 
    .catch(err => console.log(err))  
    
  }
  getMinisterios= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/ministerios',config)
    .then(response => response.json())
    .then(datos => this.setState({ministerios: datos}))
    .catch(err => console.log(err))
  }
  getOcupaciones= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/ocupaciones',config)
    .then(response => response.json())
    .then(datos => this.setState({ocupaciones: datos}))
    .catch(err => console.log(err))
  }
  getBarrios= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/barrios',config)
    .then(response => response.json())
    .then(datos => this.setState({barrios: datos}))
    .catch(err => console.log(err))
  }
  getProfesiones= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/profesiones',config)
    .then(response => response.json())
    .then(datos => this.setState({profesiones: datos}))
    .catch(err => console.log(err))
  }
  getEstados= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/estados',config)
    .then(response => response.json())
    .then(datos => this.setState({estados: datos}))
    .catch(err => console.log(err))
  }
  getMiembros= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/personas',config)
    .then(response => response.json())
    .then(datos => this.setState({miembros: datos}))
    .catch(err => console.log(err))
  }
  fechaActual(){
    var d = new Date();
     var   month = '' + (d.getMonth() + 1);
      var  day = '' + d.getDate();
        var year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');

  }
  validarEmail(){

  var texto = this.state.persona.CORREO;
  var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
   if (regex.test(texto)) {
    return true
  } else {
    return false
  }

}
Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  //Render the protected component
  handleSubmit = event => {
    event.preventDefault();
    if(this.state.persona.GENERO==null){
      this.setState({persona: {...persona,GENERO:this.props.history.location.state.genero}});
      console.log(this.state.persona.GENERO)
    }
    
    if(this.state.persona.fotopersona===null||this.state.persona.fotopersona===""){    
        const {persona}=this.state;
        const obj={
          
            ID_MIEMBRO: persona.ID_MIEMBRO,
            PRIMER_NOMBRE:persona.PRIMER_NOMBRE,
            SEGUND_NOMBRE:persona.SEGUND_NOMBRE,
            PRIMER_APELLIDO:persona.PRIMER_APELLIDO,
            SEGUND_APELLIDO:persona.SEGUND_APELLIDO,
            IDENTIFICACION:persona.IDENTIFICACION,
            TIPO_IDENTIFICACION:persona.TIPO_IDENTIFICACION,
            FECHA_NACIMIENTO:persona.FECHA_NACIMIENTO,
            GENERO:this.props.history.location.state.genero,
            ESTADO_CIVIL:persona.ESTADO_CIVIL,
            CORREO:persona.CORREO,
            CELULAR1:persona.CELULAR1,
            CELULAR2:persona.CELULAR2,
            TELEFONO_FIJO:persona.TELEFONO_FIJO,
            DIRECCION_CASA:persona.DIRECCION_CASA,
            EMPRESA:persona.EMPRESA,
            TELEFONO_EXT:persona.TELEFONO_EXT,
            FECHA_BAUTIZO:persona.FECHA_BAUTIZO,
            OCUPACION:persona.OCUPACION,
            BARRIO:persona.BARRIO,
            PROFESION:persona.PROFESION,
            ESTADO:persona.ESTADO,
            MINISTERIO:persona.MINISTERIO,
            invitado_por:persona.invitado_por
          
        }
        const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
        //const {persona} = this.state;
        axios.post('http://localhost:5000/persona/editar', obj,config)
        .then(response => console.log(response))
        .then(alert("Se ha actualizado la persona"))
        .then(this.props.history.replace('/personas'))
        .catch(err => console.log(err))
      }
      else{
        const formData = new FormData();
        formData.append('persona',JSON.stringify(this.state.persona));
        if(this.state.persona.fotopersona!=null){
        formData.append('fotopersona',this.state.persona.fotopersona);
        }
        const config = {
        headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('id_token')
        }
        };
        //const {persona} = this.state;
        axios.post('http://localhost:5000/persona/editar/conarchivo', formData,config)
        .then(response => console.log(response,formData))
        .then(alert("Se ha actualizado la persona"))
        .then(this.props.history.replace('/personas'))
        .catch(err => console.log(err))
      }
    }
    
  render() {
    if (this.props.confirm) {
      name = this.props.confirm.user;
    }
    const {persona,tipos,tipos_civil,ocupaciones,barrios,profesiones,estados,temporal,isChecked,miembros,ministerios}= this.state;
    return (
      <div className="is-center">

      {this.props.confirm.roll===1 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="public/imagenes/logo.jpg" />
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
      {this.props.confirm.roll===0 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="public/imagenes/logo.jpg" />
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
      {this.props.confirm.roll===0 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="public/imagenes/logo.jpg" />
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
      {this.props.confirm.roll===2 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="public/imagenes/logo.jpg" />
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
      {this.props.confirm.roll===2 && 
      <nav className="navbar" style={{background: `#6D214F`}} role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="/">
      <img src="public/imagenes/logo.jpg" />
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
        <div className="navbar-end">
      <div className="navbar-item">              
            <strong className="has-text-grey-light">{name+"     "}</strong>
          <div className="buttons">   
      <button className="button is-info is-inverted is-outlined" onClick={this._handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
      
    
  </div>
  </div>
</nav>
      }
      <Heading size="3" weight="semibold" spaced={false} heading={false} className="has-text-centered title">
        REGISTRAR PERSONA
      </Heading>
      <form onSubmit={this.handleSubmit}>
      <div className="container is-widescreen section">
      <div className="columns">
        <div className="column">
          <Campo title="PRIMER NOMBRE" obligatorio={true} campo="text" valor={persona.PRIMER_NOMBRE}
           cambiar={e => this.setState({persona: {...persona,PRIMER_NOMBRE:e.target.value.toUpperCase()}})} maximo="60" />
        </div>
        <div className="column">
          <Campo title="SEGUNDO NOMBRE" obligatorio={false} campo="text" valor={persona.SEGUND_NOMBRE}
           cambiar={e => this.setState({persona: {...persona,SEGUND_NOMBRE:e.target.value.toUpperCase()}})} maximo="60" />
        </div>
        <div className="column">
          <Campo title="PRIMER APELLIDO" obligatorio={true} campo="text" valor={persona.PRIMER_APELLIDO}
           cambiar={e => this.setState({persona: {...persona,PRIMER_APELLIDO:e.target.value.toUpperCase()}})} maximo="60" />
        </div>
        <div className="column">
          <Campo title="SEGUNDO APELLIDO" obligatorio={false} campo="text" valor={persona.SEGUND_APELLIDO}
           cambiar={e => this.setState({persona: {...persona,SEGUND_APELLIDO:e.target.value.toUpperCase()}})} maximo="60" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Campo title="TIPO IDENTIFICACION" obligatorio={true} campo="select2" options={tipos} valor={persona.TIPO_IDENTIFICACION}
           cambiar={e => this.setState({persona: {...persona,TIPO_IDENTIFICACION:e.target.value}})}/>
        </div>
        <div className="column">
          <Campo title="NUMERO IDENTIFICACION" obligatorio={true} campo="number" valor={persona.IDENTIFICACION}
           cambiar={e => this.setState({persona: {...persona,IDENTIFICACION:e.target.value}})} maximo="60" />
        </div>
        <div className="column">
          <Campo title="FECHA NACIMIENTO" obligatorio={false} campo="date" valor={persona.FECHA_NACIMIENTO}
           cambiar={e => this.setState({persona: {...persona,FECHA_NACIMIENTO:e.target.value}})} maximo={this.fechaActual()} />
        </div>
        <div className="column">
          <Campo title="GENERO" obligatorio={true} campo="radio" radio1="FEMENINO" radio2="MASCULINO" rad="genero" valor={persona.GENERO}
          cambiar={e => this.setState({persona: {...persona,GENERO:e.target.value}})} radio3="F" radio4="M" />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Campo title="ESTADO CIVIL" obligatorio={true} campo="select2" options={tipos_civil} valor={persona.ESTADO_CIVIL}
           cambiar={e => this.setState({persona: {...persona,ESTADO_CIVIL:e.target.value}})} />
        </div>
        <div className="column">
          <Campo title="CELULAR 1" obligatorio={true} campo="number" valor={persona.CELULAR1}
           cambiar={e => this.setState({persona: {...persona,CELULAR1:e.target.value}})} />
        </div>
        <div className="column">
          <Campo title="CELULAR 2" obligatorio={false} campo="number" valor={persona.CELULAR2}
           cambiar={e => this.setState({persona: {...persona,CELULAR2:e.target.value}})} />
        </div>
        <div className="column">
          <Campo title="TELEFONO FIJO" obligatorio={false} campo="number" valor={persona.TELEFONO_FIJO}
           cambiar={e => this.setState({persona: {...persona,TELEFONO_FIJO:e.target.value}})} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Campo title="CORREO ELECTRONICO" obligatorio={false} campo="email" valor={persona.CORREO} validar={this.validarEmail()}
           cambiar={e => this.setState({persona: {...persona,CORREO:e.target.value}})} />
        </div>
        <div className="column is-half">
          <Campo title="DIRECCION RESIDENCIA" obligatorio={true} campo="text" valor={persona.DIRECCION_CASA}
           cambiar={e => this.setState({persona: {...persona,DIRECCION_CASA:e.target.value}})} />
        </div>
        <div className="column">
          <Campo title="BARRIO" obligatorio={false} campo="select4" options={barrios} valor={persona.BARRIO}
           cambiar={e => this.setState({persona: {...persona,BARRIO:e.target.value}})} 
           metodo={this.getBarrios}
           />
           
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Campo title="PROFESIÓN" obligatorio={false} campo="select5" options={profesiones} valor={persona.PROFESION}
           cambiar={e => this.setState({persona: {...persona,PROFESION:e.target.value}})}
           metodo={this.getProfesiones}/>
        </div>
        <div className="column">
          <Campo title="OCUPACIÓN" obligatorio={false} campo="select3" options={ocupaciones} valor={persona.OCUPACION}
           cambiar={e => this.setState({persona: {...persona,OCUPACION:e.target.value}})}
           metodo={this.getOcupaciones} />
        </div>
        <div className="column">
          <Campo title="EMPRESA" obligatorio={false} campo="text" valor={persona.EMPRESA}
           cambiar={e => this.setState({persona: {...persona,EMPRESA:e.target.value.toUpperCase()}})} />
        </div>
        <div className="column">
          <Campo title="TELEFONO EMPRESA" obligatorio={false} campo="number" valor={persona.TELEFONO_EXT}
           cambiar={e => this.setState({persona: {...persona,TELEFONO_EXT:e.target.value}})} />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <Campo title="BAUTIZADO" obligatorio={false} campo="radio" radio1="SI" radio2="NO" rad="bautizado"
          cambiar={e => this.setState({temporal: {...temporal,BAUTIZADO:e.target.value}})} radio3="SI" radio4="NO"/>
        </div>
        {
          (temporal.BAUTIZADO==="NO")?(
            <div className="column">
            <Campo title="FECHA BAUTISMO" obligatorio={false} campo="date2" valor={persona.FECHA_BAUTIZO}
            cambiar={e => this.setState({persona: {...persona,FECHA_BAUTIZO:e.target.value}})} maximo={this.fechaActual()} />
        </div>
        ):(
          <div className="column">
          <Campo title="FECHA BAUTISMO" obligatorio={false} campo="date" valor={persona.FECHA_BAUTIZO}
           cambiar={e => this.setState({persona: {...persona,FECHA_BAUTIZO:e.target.value}})} maximo={this.fechaActual()} />
          </div>
        )}
        <div className="column">
          <Campo title="ESTADO" obligatorio={false} campo="select6" options={estados} valor={persona.ESTADO}
           cambiar={e => this.setState({persona: {...persona,ESTADO:e.target.value}})}/>
        </div>  
        <div className="column">
          <Campo title="MINISTERIO" obligatorio={false} campo="select" options={ministerios} valor={persona.MINISTERIO}
           cambiar={e => this.setState({persona: {...persona,MINISTERIO:e.target.value}})}
           metodo={this.getMinisterios} />
        </div>
      </div>
      <div className="columns">
        <div className="column ">
          <Campo title="ADJUNTAR FOTO" obligatorio={false} campo="file" valor={persona.fotopersona}
          cambiar={e => this.setState({persona: {...persona,fotopersona:e.target.files[0]}})}/>
        </div>
        <div className="column">
          <Campo title="INVITADO POR" obligatorio={false} campo="select8" options={miembros} valor={persona.invitado_por}
           cambiar={e => this.setState({persona: {...persona,invitado_por:e.target.value}})}/>
        </div>
      </div>     
      <div className="columns">
        <div className="column is-half">
        <div className="field">
          <div className="control">
          <button type="submit" className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF` }}>ACTUALIZAR PERSONA</button>
          </div>
          </div>
        </div>
        <div className="column is-half">
         <div className="field">
          <div className="control">
          <Link to="/personas" className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF` }}> CANCELAR</Link>
          </div>
            </div>
        </div>
      </div>
      </div>
     </form>
        
      </div>
    );
  }
}

export default withAuth(Edit);
