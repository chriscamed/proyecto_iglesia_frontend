import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paginate from 'paginate-array';
import '../../fontawesome.css';
import OpenModal from './evento-model';
import OpenModaledit from './evento-model-edit';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';


//Our higher order component
import withAuth from '../withAuth';

class Eventos extends Component {
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
    fetch(`http://localhost:5000/ministerios`,config)
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
  getMinisterios = () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
    };
    fetch('http://localhost:5000/ministerios',config)
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

  mapEstado = (num) => {
    switch(num){
      case 0:
      return(
        <td>Inactivo</td>
      )
      case 1:
      return(
        <td>Activo</td>
      )
    }
  }

  render() {
    const { page, size, currPage } = this.state;
    return (
      <div class='col-md-12' style={{margin: '10px'}}>
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

        <h3 className="title has-text-centered"> GESTION DE EVENTOS</h3>

        <div style={{margin: '10px'}}>
          <div align="left">
            <OpenModal titulo="CREAR EVENTO" metodo={this.getMinisterios} subtitulo="Ministerio" className="navbar-item has-text-grey-light" style={{background: '#6D214F'}}>
            </OpenModal>
          </div>
          <br/>

          <div className="columns" style={{margin: '10px'}}>
            <div className="column">
              <table className="table is-bordered is-fullwidth" class="table table-striped" width="100%">
                <thead>
                  <tr>
                    <th>Tipo de Evento</th>
                    <th>Fecha</th>
                    <th>Hora Inicio</th>
                    <th>Hora Fin</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currPage && currPage.data.map(ministerios => (
                    <tr key={ministerios.id}>
                      <td>Culto</td>
                      <td>Hoy</td>
                      <td>9am</td>
                      <td>10am</td>
                      <td>
                        <OpenModaledit metodo={this.getMinisterios} user={ministerios} titulo="EDITAR EVENTO" subtitulo="Ministerio"/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="button is-outlined" onClick={this.previousPage}>Previous Page</button>
              <button className="button is-outlined" onClick={this.nextPage}>Next Page</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Eventos);
