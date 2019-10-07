import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paginate from 'paginate-array';
import '../../fontawesome.css';
import { FaTrashAlt } from "react-icons/fa";
import Button from 'react-bulma-components/lib/components/button';
import OpenModal from './persona-modal';
import { FaEdit } from "react-icons/fa";
//import OpenModaledit from './event-modal-edit';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';


//Our higher order component
import withAuth from '../withAuth';

class Personas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //eventos:[],
      todos: [],
      size: 5,
      page: 1,
      currPage: null
    }
    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addActiveClass = this.addActiveClass.bind(this);
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  componentDidMount() {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch(`http://localhost:5000/personas`, config)
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
    (function () {
      var burger = document.querySelector('.burger');
      var nav = document.querySelector('#' + burger.dataset.target);
      burger.addEventListener('click', function () {
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
  addActiveClass(id) {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': localStorage.getItem('id_token')
      },
      method: 'DELETE'
    };
    fetch('http://localhost:5000/persona/eliminar/' + id, config)
      .then(response => response.json())
      .then(this.getOcupaciones)
      .then(alert("Se ha eliminado exitosamente"))
      .then(this.close)
      .catch(err => console.log(err))

  }
  getOcupaciones = () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
      }
    };
    fetch('http://localhost:5000/personas', config)
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

  render() {
    const { page, size, currPage } = this.state;
    return (
      <div>
        {this.props.confirm.roll === 1 &&
          <nav className="navbar" style={{ background: `#6D214F` }} role="navigation" aria-label="main navigation">
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
              </div>
              <div className="navbar-end">
                <div className="navbar-item">
                  <strong className="has-text-grey-light">{name + "     "}</strong>
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
          <nav className="navbar" style={{ background: `#6D214F` }} role="navigation" aria-label="main navigation">
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

        {this.props.confirm.roll === 2 &&
          <nav className="navbar" style={{ background: `#6D214F` }} role="navigation" aria-label="main navigation">
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
                  <strong className="has-text-grey-light">{name + "     "}</strong>
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

        <h3 className="title has-text-centered">GESTION DE PERSONAS</h3>

        <div align="Left">
          <Link to="/register">
            <Button className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }} > CREAR PERSONA </Button>
          </Link>
        </div>

        <div align="right">
          <Link to="/">
            <Button className="navbar-item has-text-grey-light" style={{ background: `#6D214F` }} > MENU </Button>
          </Link>
        </div>

        <hr />

        <div className="columns">
          <div className="column"></div>
        </div>
        <div className="columns">
          <div className="column">


            <table className="table is-bordered is-fullwidth" class="table table-striped" width="100%">
              <thead>
                <tr>
                  <th>Identificacion</th>
                  <th>Tipo</th>
                  <th>Nombre 1</th>
                  <th>Apellido 1</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currPage && currPage.data.map(personas => (
                  <tr key={personas.ID_MIEMBRO}>
                    <td>{personas.IDENTIFICACION}</td>
                    <td>MIEMBRO</td>
                    <td>{personas.PRIMER_NOMBRE}</td>
                    <td>{personas.PRIMER_APELLIDO}</td>
                    <td style={{ textAlign: 'center' }} >
                      <div className="columns is-variable is-one-third is-2-mobile is-0-tablet is-0-desktop">
                        <div className="column">
                          <OpenModal titulo="INFORMACION DE PERSONA" id={personas.ID_MIEMBRO} subtitulo="Persona" >
                          </OpenModal>
                        </div>
                        <div className="column ">
                          <Link className="button is-medium" to={{ pathname: '/editpersona', state: { cedula: personas.IDENTIFICACION, genero: personas.GENERO } }}><FaEdit />
                          </Link>
                        </div>
                        <div className="column">
                          <Button className="button is-medium" renderAs="a" onClick={() => this.addActiveClass(personas.ID_MIEMBRO)} ><FaTrashAlt />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(Personas);
