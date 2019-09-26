import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import paginate from 'paginate-array';
import '../../fontawesome.css';
import OpenModal from './usuario-model';
import OpenModaledit from './usuario-model-edit';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';


//Our higher order component
import withAuth from '../withAuth';

class Usuarios extends Component {
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
    fetch(`http://localhost:5000/user/alluser`,config)
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
  getOcupaciones= () => {
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    fetch('http://localhost:5000/user/alluser',config)
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
  mapRol = (num) =>{
    switch(num){
    case 0:
    return(
    <td>registrador de asistencias</td>
    )
    case 1:
    return(
    <td>administrador</td>
    )
    case 2:
    return(
    <td>registrador de personas</td>
    )
    }
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

        <h3 className="title has-text-centered"> GESTION DE USUARIOS</h3>




            <table border="0">
                <tr>
                    <th>
                    </th>
                    <th>
        <div className="columns">
          <div className="column">
            <OpenModal  titulo="CREAR USUARIO" metodo={this.getOcupaciones} subtitulo="Usuario" ></OpenModal>
                            </div>
                        </div>
                    </th>


                    </tr>
            </table>




        <div className="columns">
          <div className="column">
        <table className="table is-bordered is-fullwidth">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                                <th> Estado</th>
                                <th></th>
                </tr>
              </thead>
              <tbody>
                   {currPage &&
                currPage.data.map(usuarios => (
                  <tr key={usuarios.id}>
                    <td>{usuarios.USUARIO}</td>
                                    {this.mapRol(usuarios.ROL)}
                                    <td>ACTIVO</td>
                                    <td>


                                        <img style={{ width: '30px', height: '30px', margin: '5px' }} src="public/imagenes/edit.png" />
                                                <OpenModaledit metodo={this.getOcupaciones}
                                                id={usuarios.id} titulo="EDITAR USUARIO" subtitulo="Usuario"/>

                                    </td>
                  </tr>

                            )
                            )
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

export default withAuth(Usuarios);
