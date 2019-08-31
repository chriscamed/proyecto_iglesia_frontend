import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paginate from 'paginate-array';
import '../../fontawesome.css';
import OpenModal from './event-modal';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';

import { FaEdit } from "react-icons/fa";
//Our higher order component
import withAuth from '../withAuth';
import OpenModaledit from './event-modal-edit';

class EventList extends Component {
  constructor(props){
    super(props);
    this.state={
      //eventos:[],
       todos: [],
      size: 5,
      page: 1,
      currPage: null
    }
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  componentDidMount(){
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch(`http://localhost:5000/eventos`,config)
      .then(response => response.json())
      .then(todos => {
        const { page, size } = this.state;

        const currPage = paginate(todos, page, size);

        this.setState({
          ...this.state,
          todos,
          currPage
        });
      });
      (function() {
        var burger = document.querySelector('.burger');
        var nav = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function(){
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
        });
      })();
  }
  previousPage() {
    const { currPage, page, size, todos } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(todos, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, todos } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(todos, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }
  handleChange(e) {
    const { value } = e.target;
    const { todos, page } = this.state;

    const newSize = +value;
    const newPage = 1;
    const newCurrPage = paginate(todos, newPage, newSize);

    this.setState({
      ...this.state,
      size: newSize,
      page: newPage,
      currPage: newCurrPage
    });
  }
  getOcupaciones= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/eventos',config)
    .then(response => response.json())
    .then(todos => {
        
        const currPage = paginate(todos, 1, 5);

        this.setState({
          ...this.state,
          todos,
          currPage
        });
      })
    .catch(err => console.log(err))
  }
  
  /*
  getEventos= () => {
    fetch('http://localhost:5000/eventos')
    .then(response => response.json())
    .then(datos => this.setState({eventos: datos}))
    .catch(err => console.log(err))
  }*/
  render() {
    const { page, size, currPage } = this.state;
    return (
      <div>
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
        <h3 className="title has-text-centered">EVENTOS</h3>
        
        <hr/>

        
        <div className="columns">
          <div className="column">
            <OpenModal  titulo="AGREGAR EVENTO" metodo={this.getOcupaciones} subtitulo="Evento" ></OpenModal>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div>pagina: {page}</div>        
        <div>
          <label for="size">N° filas</label>
          <select name="size" id="size" onChange={this.handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Nombre del evento</th>
                  <th>Fecha</th>
                  <th>Hora inicio</th>
                  <th>Hora fin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                   {currPage &&
                currPage.data.map(eventos => (
                    
                  <tr key={eventos.ID_EVENTO}>
                    <td>{eventos.NOMBRE}</td>
                    <td>{eventos.FECHA_EVENTO.substr(0,10)}</td>
                    <td>{eventos.HORA_INICIO}</td>
                    <td>{eventos.HORA_FIN}</td>
                    <td style={{textAlign: 'center'}}><OpenModaledit metodo={this.getOcupaciones} id={eventos.ID_EVENTO} titulo="EDITAR EVENTO" subtitulo="Evento"/></td>
                  </tr>
        
        ))
      }  
            
              </tbody>
            </table>
       
          
       
        <button className="button is-outlined" onClick={this.previousPage}>Previous Page</button>
        <button className="button is-outlined" onClick={this.nextPage}>Next Page</button>

          </div>
        </div>

      </div>
    );
  }
}

export default withAuth(EventList);