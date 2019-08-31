import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paginate from 'paginate-array';
import '../../fontawesome.css';
import OpenModal from './logistic-modal';
import Button from 'react-bulma-components/lib/components/button';
import { FaTrashAlt } from "react-icons/fa";
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';


//Our higher order component
import withAuth from '../withAuth';
function Modelo(props){
  return(
    <OpenModal  titulo="AGREGAR LOGISTICA" logisticas={props.metodo} subtitulo="Logistica" ></OpenModal>
  );
}
class Logistics extends Component {
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
    this.addActiveClass= this.addActiveClass.bind(this);
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  componentDidMount(){
    this.getLogisticas();
    (function() {
        var burger = document.querySelector('.burger');
        var nav = document.querySelector('#'+burger.dataset.target);
        burger.addEventListener('click', function(){
          burger.classList.toggle('is-active');
          nav.classList.toggle('is-active');
        });
      })();
    
  }
  getLogisticas(){
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch(`http://localhost:5000/logisticas`,config)
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
  addActiveClass(id) {
    const config = {
        headers: {
        'content-type': 'application/json',
        'authorization': localStorage.getItem('id_token')
        },
        method: 'DELETE'
        };
    fetch('http://localhost:5000/logistica/eliminar/'+id,config)
    .then(response => response.json())
    .then(this.getOcupaciones)
    .then(alert("Se ha eliminado exitosamente"))
    .then(this.close)     
    .catch(err => console.log(err))  

  }
  getOcupaciones= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/logisticas',config)
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
        <h3 className="title has-text-centered">LOGISTICAS</h3>
        
        <hr/>

        
        <div className="columns">
          <div className="column">
            <Modelo metodo={this.getOcupaciones}/>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div>pagina: {page}</div>        
        <div>
          <label htmlfor="size">N° filas</label>
          <select name="size" id="size" onChange={this.handleChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
          </select>
        </div>
        <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>ACTIVIDAD</th>
                  <th>NOMBRE EVENTO</th>
                  <th>FECHA EVENTO</th>
                  <th>HORA EVENTO</th>
                  <th>NOMBRE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                   {currPage &&
                currPage.data.map(logisticas => (
                    
                  <tr key={logisticas.ID_LOGISTICA}>
                    <td>{logisticas.ACTIVIDAD}</td>
                    <td>{logisticas.EVENTO_NOMBRE}</td>
                    <td>{logisticas.EVENTO_FECHA}</td>
                    <td>{logisticas.HORA_INICIO}</td>
                    <td>{logisticas.NOMBRE}</td>
                    
                    <td style={{textAlign: 'center'}}><button className="button is-normal" onClick={() => this.addActiveClass(logisticas.ID_LOGISTICA)} ><FaTrashAlt/></button></td>
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

export default withAuth(Logistics);