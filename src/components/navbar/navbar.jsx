import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './navbar.scss';
import '../../App.css';
import '../../App.sass';
/* Once the 'Authservice' and 'withAuth' componenets are created, import them into App.js */
import AuthHelperMethods from '../AuthHelperMethods';

class Navbar extends Component {

  state = {
    USUARIO: ''
  }
  /* Create a new instance of the 'AuthHelperMethods' compoenent*/
  Auth = new AuthHelperMethods();

  _handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
  }

  //Render the protected component
  render() {
      let name = null;
      if (this.props.confirm) {
        name = this.props.confirm.USUARIO;
      }
      //let name = this.props.confirm.username;
      console.log(name)
      return(

        <nav className="navbar navbar-violet" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img alt="Logo" src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
            </a>

            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">REGISTRAR INVITADO</Link>
              <Link className="navbar-item" to="/createmin">CREAR MINISTERIO</Link>
              <Link className="navbar-item" to="/register">REGISTRAR MIEMBRO</Link>
              <Link className="navbar-item" to="/createevent">CREAR EVENTO</Link>
              <Link className="navbar-item" to="/createlog">CREAR LOGÍSTICA</Link>
              <Link className="navbar-item" to="/assistancelist">REGISTRAR ASISTENCIA</Link>
            </div>

            {!name && (
            <div className="navbar-end">
              <div className="navbar-item">
                <strong>{name}</strong>
                <div className="buttons">
                  <button className="button is-light" onClick={this._handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
            )}
          </div>
        </nav>
      );
    }
  }

export default Navbar;
