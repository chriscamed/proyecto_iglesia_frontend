import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Heading from 'react-bulma-components/lib/components/heading';
import '../../estilo.css';
import '../../App.css';
import '../../App.sass';
import OpenModal from './modelo.jsx';
import Button from 'react-bulma-components/lib/components/button';
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
  if(props.campo === "text"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {(props.obligatorio===true)?(
          <div className="control">
            <input className="input" type="text" required value={props.valor} onChange={props.cambiar} maxLength={props.maximo}/>
          </div>
        ):(
          <div className="control">
            <input className="input" type="text" value={props.valor} onChange={props.cambiar} maxLength={props.maximo}/>
          </div>
        )}
      </div>
    );
  }
  if(props.campo === "number"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {(props.obligatorio===true)?(
          <div className="control">
            <input className="input" type="number" required pattern="\d*" value={props.valor} onChange={props.cambiar} />
          </div>
        ):(
          <div className="control">
            <input className="input" type="number" pattern="\d*" value={props.valor} onChange={props.cambiar} />
          </div>
        )}
      </div>
    );
  }
  if(props.campo === "email"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
          {(props.valor==='')?(
            <div className="control">
              <input className="input" type="email" required value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
              <p className="help is-grey-light">Ej: nombre@correo.com</p>
            </div>
          ):(
            (props.validar===true)?(
              <div className="control has-icons-right">
                <input className="input is-success" type="email" value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
                <span className="icon is-small is-right">
                  <i className="help is-success"><FaCheck/></i>
                </span>
                <p className="help is-success">Correo valido</p>
              </div>
            ):(
              <div className="control has-icons-right">
                <input className="input is-danger" type="email" value={props.valor} onChange={props.cambiar} onKeyUp={props.validar}/>
                <span className="icon is-small is-right">
                  <i className="help is-danger"><IoIosCloseCircleOutline/></i>
                </span>
                <p className="help is-danger">Correo invalido</p>
              </div>
            )
          )}
      </div>
    );
  }
  if(props.campo === "select"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="field has-addons">
          <div className="control">
            <div className="select" style={{border:`solid 0px rgb(143,136, 144)`}}>
              <select onChange={props.cambiar}>
                <option value="">---Seleccione---</option>
                {props.options.map(option => (
                  <option key={option.ID_MINISTERIO} value={option.ID_MINISTERIO}>
                    {option.NOMBRE}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select3"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="field has-addons">
          <div className="control">
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)`, width: '290px'}}>
              <select onChange={props.cambiar}>
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
            <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR OCUPACIÓN" subtitulo="Ocupacion" options={props.options}></OpenModal>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select6"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="control">
          <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
            <select onChange={props.cambiar}>
              <option value="">---Seleccione---</option>
              {props.options.map(option => (
                <option key={option.ID_ESTADO} value={option.ID_ESTADO}>
                  {option.ESTADO}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select5"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="field has-addons">
          <div className="control">
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)`, width: '290px'}}>
              <select onChange={props.cambiar}>
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
            <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR PROFESIÓN" subtitulo="Profesion" options={props.options}></OpenModal>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select4"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="field has-addons">
          <div className="control">
            <div className="select"style={{ border: `solid 0px rgb(143,136, 144)`, width: '290px'}}>
              <select onChange={props.cambiar}>
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
            <OpenModal Actualizar={props.metodo} titulo="AGREGAR/EDITAR BARRIO" subtitulo="Barrio" options={props.options}></OpenModal>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select8"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="control">
          <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
            <select onChange={props.cambiar}>
              <option value="">---Seleccione---</option>
              {props.options.map(option => (
                <option key={option.ID_PERSONA} value={option.ID_PERSONA} title={option.ID_PERSONA}>
                  {option.PRIMER_NOMBRE} {option.PRIMER_APELLIDO}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    );
  }
  if(props.campo === "select2"){
    return(
      <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {(props.obligatorio===true)?(
          <div className="control">
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
              <select onChange={props.cambiar} required>
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
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
              <select onChange={props.cambiar}>
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
  if(props.campo === "select52"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {(props.obligatorio===true)?(
          <div className="control">
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
              <select onChange={props.cambiar} required>
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
            <div className="select" style={{ border: `solid 0px rgb(143,136, 144)` }}>
              <select onChange={props.cambiar}>
                <option value="">---Seleccione---</option>
                {props.options.map(option => (
                  <option key={option.valor} value={option.valor}>
                    {option.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  }
  if(props.campo === "date"){
    return(
      <div className="field"  >
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="control" style={{ border: `solid 0px rgb(143,136, 144)`, width: '290px'}}>
          <input className="input" type="date"  value={props.valor} onChange={props.cambiar} max={props.maximo}/>
        </div>
      </div>
    );
  }
  if(props.campo === "date2"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="control" style={{ border: `solid 0px rgb(143,136, 144)` }}>
          <input className="input" type="date" disabled  value={props.valor} onChange={props.cambiar} max={props.maximo}/>
        </div>
      </div>
    );
  }
  if(props.campo === "radio"){
    return(
      <div className="field">
        <Nombre title={props.title} obligatorio={props.obligatorio}/>
        {(props.obligatorio===true)?(
          <div className="control" style={{ border: `solid 0px rgb(143,136, 144)` }}>
            <label className="radio">
              {props.radio1}&nbsp; &nbsp; &nbsp;
              <input type="radio" name={props.rad} value={props.radio3} onChange={props.cambiar} required/>
            </label>
            <label className="radio">
              {props.radio2} &nbsp; &nbsp; &nbsp;
              <input type="radio" name={props.rad} value={props.radio4} onChange={props.cambiar}/>
            </label>
          </div>
        ):(
          <div className="control" style={{ border: `solid 0px rgb(143,136, 144)` }}>
            <label className="radio">
              {props.radio1}&nbsp; &nbsp; &nbsp;
              <input type="radio" name={props.rad} value={props.radio3} onChange={props.cambiar}/>
            </label>
            <label className="radio">
              {props.radio2} &nbsp; &nbsp; &nbsp;
              <input type="radio" name={props.rad} value={props.radio4} onChange={props.cambiar}/>
            </label>
          </div>
        )}
      </div>
    );
  }
  if(props.campo === "file"){
    return(
      <div className="field">
      <Nombre title={props.title} obligatorio={props.obligatorio}/>
        <div className="control" style={{ border: `solid 0px rgb(143,136, 144)` }}>
          <div className="file has-name ">
            <label className="file-label">
              <input className="file-input" type="file" name="personaImage" onChange={props.cambiar}/>
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
      </div>
    );
  }
}

//componente principal
// contiene el formulario de registro de miembro, es el padre del componente Campo
class Edit extends Component {
  constructor(props){
    super(props);
    this.state = {
      persona:{
        PRIMER_NOMBRE:'',
        SEGUND_NOMBRE:'',
        PRIMER_APELLIDO:'',
        SEGUND_APELLIDO:'',
        IDENTIFICACION:null,
        TIPO_IDENTIFICACION:'',
        FECHA_NACIMIENTO:null,
        GENERO:'',
        ESTADO_CIVIL:'',
        CORREO:'',
        CELULAR_1:'',
        CELULAR_2:'',
        TELEFONO_FIJO:'',
        DIRECCION_CASA:'',
        EMPRESA:'',
        TELEFONO_EXT:'',
        FECHA_BAUTIZO:null,
        ID_OCUPACION:null,
        ID_BARRIO:null,
        ID_PROFESION:null,
        ID_MINISTERIO:null,
        FOTO_PERSONA:null,
        ID_PERSONA_INVITA:null,
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
          valor:"2",
          nombre:"CASADO"
        },
        {
          valor: "4",
          nombre: "DIVORCIADO"
        },
        {
          valor: "1",
          nombre:"SOLTERO"
        },
        {
          valor: "3",
          nombre: "UNION LIBRE"
        },
        {
          valor: "5",
          nombre: "VIUDO"
        }
        ],
      tipos_genero:[
        {
          valor: "M",
          nombre: "MASCULINO"
        },
        {
          valor: "F",
          nombre: "FEMENINO"
        }
      ],
      ocupaciones:[],
      barrios:[],
      profesiones:[],
      miembros:[],
      ministerios:[],
    }
  }

  componentDidMount(){
    this.Consultar(this.props.history.location.state.id);
    this.getOcupaciones();
    this.getBarrios();
    this.getProfesiones();
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
  getMinisterios = () => {
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
  getOcupaciones = () => {
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
  getBarrios = () => {
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
  getProfesiones = () => {
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
  getMiembros = () => {
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

    handleEditarPersona = event => {
      console.log(this.state.persona)
    }

  render() {
    if (this.props.confirm) {
      name = this.props.confirm.user;
    }
    const {persona,tipos,tipos_civil,tipos_genero,ocupaciones,barrios,profesiones,miembros,ministerios}= this.state;
    return (

      <div class="row" style={{margin: '10px'}}>
        {this.props.confirm.roll === 1 &&
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

        {this.props.confirm.roll === 0 &&
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

        {this.props.confirm.roll === 2 &&
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

        <h3 className="title has-text-centered">ACTUALIZAR PERSONA</h3>

        <div className="columns" style={{margin: '0px'}}>
          <div className="column">
          <table className="table is-bordered is-fullwidth" class="table" width="85%" align="center" >
            <tbody>
                <tr>
                  <td>
                    <label className="label">Primer nombre: <font color="red">*</font></label>
                    <div className="control">
                      <input className="input" type="text" required value={this.state.persona.PRIMER_NOMBRE} onChange={e => this.setState({PRIMER_NOMBRE:e.target.value.toUpperCase()})}/>
                    </div>
                  </td>
                  <td>
                    <label className="label">Segundo nombre:</label>
                    <div className="control">
                      <input className="input" type="text" required value={this.state.persona.SEGUND_NOMBRE} onChange={e => this.setState({SEGUND_NOMBRE:e.target.value.toUpperCase()})}/>
                    </div>
                  </td>
                  <td>
                    <label className="label">Primer apellido: <font color="red">*</font></label>
                    <div className="control">
                      <input className="input" type="text" required value={this.state.persona.PRIMER_APELLIDO} onChange={e => this.setState({PRIMER_APELLIDO:e.target.value.toUpperCase()})}/>
                    </div>
                  </td>
                  <td>
                    <label className="label">Segundo apellido:</label>
                    <div className="control">
                      <input className="input" type="text" required value={this.state.persona.SEGUND_APELLIDO} onChange={e => this.setState({SEGUND_APELLIDO:e.target.value.toUpperCase()})}/>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label className="label">Tipo identificacion: <font color="red">*</font></label>
                    <div className="select" disabled style={{border:`solid 0px rgb(134, 56, 103)`}}>
                      <select value={this.state.persona.TIPO_IDENTIFICACION} onChange={e => this.setState({TIPO_IDENTIFICACION:e.target.value})} required>
                        <option value="">---Seleccione---</option>
                        {this.state.tipos.map(option => (
                          <option key={option.valor} value={option.valor}>
                            {option.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <Campo title="Identificacion" obligatorio={true} campo="number" valor={persona.IDENTIFICACION}
                      cambiar={e => this.setState({persona: {...persona, IDENTIFICACION: e.target.value}})} maximo="11"/>
                  </td>
                  <td>
                    <label className="label">Genero: <font color="red">*</font></label>
                    <div className="select" disabled style={{border:`solid 0px rgb(134, 56, 103)`}}>
                      <select value={this.state.persona.GENERO} onChange={e => this.setState({GENERO:e.target.value})} required>
                        <option value="">---Seleccione---</option>
                        {this.state.tipos_genero.map(option => (
                          <option key={option.valor} value={option.valor}>
                            {option.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td>
                    <Campo title="Fecha Nacimiento" obligatorio={true} campo="date" valor={persona.FECHA_NACIMIENTO}
                      cambiar={e => this.setState({persona: {...persona, FECHA_NACIMIENTO: e.target.value }})} maximo={this.fechaActual()}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Campo title="Estado Civil" obligatorio={true} campo="select2" options={tipos_civil}
                      cambiar={e => this.setState({persona: {...persona, ESTADO_CIVIL: e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Direccion" obligatorio={true} campo="text" valor={persona.DIRECCION_CASA}
                      cambiar={e => this.setState({persona: {...persona, DIRECCION_CASA: e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Barrio" obligatorio={true} campo="select4" options={barrios}
                      cambiar={e => this.setState({persona: {...persona, ID_BARRIO: e.target.value}})}
                      metodo={this.getBarrios}/>
                  </td>
                  <td></td>
                </tr>
                <tr>
                  <td>
                    <Campo title="Correo electronico:" obligatorio={false} campo="email" valor={persona.CORREO} validar={this.validarEmail()}
                      cambiar={e => this.setState({persona: {...persona, CORREO: e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Telefono Celular:" obligatorio={true} campo="number" valor={persona.CELULAR1}
                      cambiar={e => this.setState({persona: {...persona, CELULAR_1: e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Telefono celular 2:" obligatorio={false} campo="number" valor={persona.CELULAR2}
                      cambiar={e => this.setState({persona: {...persona, CELULAR_2: e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Telefono fijo: " obligatorio={false} campo="number" valor={persona.TELEFONO_FIJO}
                      cambiar={e => this.setState({persona: {...persona, TELEFONO_FIJO:e.target.value}})}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Campo title="Profesion" obligatorio={false} campo="select5" options={profesiones}
                      cambiar={e => this.setState({persona: {...persona, ID_PROFESION:e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Ocupacion" obligatorio={false} campo="select3" options={ocupaciones}
                      cambiar={e => this.setState({persona: {...persona, ID_OCUPACION:e.target.value}})}/>
                  </td>
                  <td>
                    <Campo title="Empresa donde labora" obligatorio={false} campo="text" valor={persona.EMPRESA}
                      cambiar={e => this.setState({persona: {...persona, EMPRESA: e.target.value.toUpperCase()}})}/>
                  </td>
                  <td>
                    <Campo title="Telefono" obligatorio={false} campo="number" valor={persona.TELEFONO_EXT}
                      cambiar={e => this.setState({persona: {...persona, TELEFONO_EMPRESA: e.target.value}})}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Campo title="Fecha bautismo" obligatorio={false} campo="date" valor={persona.FECHA_BAUTIZO}
                      cambiar={e => this.setState({persona: {...persona, FECHA_BAUTIZO: e.target.value}})} maximo={this.fechaActual()}/>
                  </td>
                  <td width='50px'>
                    <Campo title="Ministerio" obligatorio={true} campo="select" options={ministerios}
                      cambiar={e => this.setState({persona: {...persona, ID_MINISTERIO:e.target.value}})}
                      style={{ border: 'solid 0px rgb(143,136, 144)'}}/>
                  </td>
                  <td>
                    <Campo title="Invitado por:" obligatorio={false} campo="select8" options={miembros}
                      cambiar={e => this.setState({persona: {...persona, ID_PERSONA_INVITA: e.target.value}})}
                      style={{ border: 'solid 0px rgb(143,136, 144)'}}/>
                  </td>
                  <td width= '50px'>
                    <Campo title="Foto" obligatorio={false} campo="file" valor={persona.fotopersona}
                      cambiar={e => this.setState({persona: {...persona, FOTO_PERSONA:e.target.files[0]}})}/>
                  </td>
                </tr>
            </tbody>
          </table>
          </div>
        </div>
        <br/>

        <div>
          <div align="center">
            <div className="columns">
              <div className="column">
                <Button onClick={this.handleEditarPersona} className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }}>ACTUALIZAR</Button>
              </div>
              <div className="column">
                <Link to="/personas">
                  <Button className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }}>CANCELAR</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Edit);
