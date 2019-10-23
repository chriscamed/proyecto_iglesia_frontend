import React, { Component } from 'react';
import Heading from 'react-bulma-components/lib/components/heading';
import { Link } from 'react-router-dom';
import '../../App.css';
import './home.css';
import '../../App.sass';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';

//Our higher order component
import withAuth from '../withAuth';

class Home extends Component {

  state = {
    USUARIO: ''
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }
  componentDidMount() {
    (function () {
      var burger = document.querySelector('.burger');
      var nav = document.querySelector('#' + burger.dataset.target);
      burger.addEventListener('click', function () {
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
      });
    })();
  }

  //Render the protected component
  render() {
    //let name = null;
    if (this.props.confirm) {
      name = this.props.confirm.user;
    }
    //let name = this.props.confirm.username;
    console.log(this.props.confirm.roll)
    return (
      <div>
        {this.props.confirm.roll === 1 &&
          <div>
            <nav className="navbar" style={{ background: `#6D214F` }} role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              </div>
              <div id="navbarBasicExample" className="navbar-menu">
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
          </div>
        }

        {this.props.confirm.roll === 0 &&
          <nav className="navbar" style={{ background: `#6D214F` }} role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="/">
                <img class='circular--square' src="public/imagenes/logo.jpg" />
              </a>
              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu ">
              <div className="navbar-start">
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
                <img class='circular--square' src="public/imagenes/logo.jpg" />
              </a>
              <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
              <div className="navbar-start">
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

        <br />

       
        <div class="maxtitulos">

<div class="titulosdiv"><span class="titulos" ><br />SAMI Sistema de Administracion Ministerial</span></div>
<div clas="imgtitulo"><img class="redondos" src="public/imagenes/logo.jpg" height="180" width="130" /> </div>
</div>



        



        {this.props.confirm.roll === 1 &&
          <div>
            <div class="content has-text-centered">
              <table border="0">
                <tr>
                  <th>
                    <div class="content has-text-centered">
                      <Link to="/usuarios">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/boy.png" />
                        <h5>USUARIOS</h5>
                      </Link>
                    </div>
                  </th>
                  <th>
                    <div class="content has-text-centered">
                      <Link to="/personas">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/team.png" />
                        <h5>PERSONAS</h5>
                      </Link>
                    </div>
                  </th>
                  <th>
                    <div class="content has-text-centered">
                      <Link to="/ministerios">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/ministerios.png" />
                        <h5>MINISTERIOS</h5>
                      </Link>
                    </div>
                  </th>
                  <th>
                    <div class="content has-text-centered">
                      <Link to="/createevent">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/calendar.png" />
                        <h5>EVENTOS</h5>
                      </Link>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td>
                    <div class="content has-text-centered">
                      <Link to="/assistancelist">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/clipboard.png" />
                        <h5>ASISTENCIA</h5>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div class="content has-text-centered">
                      <Link to="/reports">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/rol.png" />
                        <h5>INFORMES</h5>
                      </Link>
                    </div>
                  </td>
                  <td>
                    <div class="content has-text-centered">
                      <Link to="/">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/coin.png" />
                        <h5>DONACIONES</h5>
                      </Link>
                    </div>
                  </td>


                  <td>
                    <div class="content has-text-centered">
                      <Link to="/tipoevento">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/tipoEvento.png" />
                        <h5>TIPO EVENTO</h5>
                      </Link>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td>
                    <div class="content has-text-centered">
                      <Link to="/logistica">
                        <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/logistica.png" />
                        <h5>LOGISTICAA</h5>
                      </Link>
                    </div>
                  </td>

                </tr>
              </table>
            </div>
          </div>
        }

        <div class="content has-text-centered">
          {this.props.confirm.roll === 0 &&
            <Link to="/assistancelist">
              <img style={{ width: '150px', height: '150px', margin: '10px' }} src="public/imagenes/clipboard.png" />
              <div class="content has-text-centered"> <h5>ASISTENCIA</h5> </div>
            </Link>
          }
        </div>

        <div class="content has-text-centered">
          {this.props.confirm.roll === 2 &&
            <Link to="/personas">
              <img style={{ width: '150px', height: '150px', margin: '5x' }} src="public/imagenes/team.png" />
              <div class="content has-text-centered"> <h5>PERSONAS</h5> </div>
            </Link>
          }
        </div>
      </div>
    );
  }
}

export default withAuth(Home);
