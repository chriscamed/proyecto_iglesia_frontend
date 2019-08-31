import React, { Component } from "react";
import { IoIosLock } from "react-icons/io";
import { FaUser } from 'react-icons/fa';
/* We want to import our 'AuthHelperMethods' component in order to send a login request */
import AuthHelperMethods from './components/AuthHelperMethods';
import './login.css';
import './estilo.css';
import './App.css';



class Login extends Component {

    /* In order to utilize our authentication methods within the AuthService class, we want to instantiate a new object */
    Auth = new AuthHelperMethods();

    state = {
        USUARIO: "",
        PASS: ""
    }

    /* Fired off every time the use enters something into the input fields */
    _handleChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit = (e) => {
        
        e.preventDefault();
        const _this = this;
        /* Here is where all the login logic will go. Upon clicking the login button, we would like to utilize a login method that will send our entered credentials over to the server for verification. Once verified, it should store your token and send you to the protected route. */
        this.Auth.login(this.state.USUARIO, this.state.PASS)
            .then(res => {                
                console.log(res);
                if (res.success === false) {
                    _this.setState({
                       USUARIO: "",
                       PASS: ""
                    });
                    return alert("Credenciales inválidas");
                }
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
                console.log(err);
            })
    }

    componentWillMount() {
        /* Here is a great place to redirect someone who is already logged in to the protected route */
        if (this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-wrapper">
                    <div className="box">
                        <div className="box-header">
                            <h1>Bienvenido</h1>
         
                        </div>
                        <figure class="image is-128x128">
  <img src="public/imagenes/logo.jpg" />
</figure>
<br></br>
                        <form className="box-form">
                        <div className="control has-icons-left">
                        <input
                                className="el"
                                placeholder="usuario"
                                name="USUARIO"
                                type="text"
                                onChange={this._handleChange}
                            />
            <span className="icon  is-left">
              <i className="help"><FaUser/></i>
            </span>
            </div>
            <div className="control has-icons-left">
            <input
                               className="el"
                                placeholder="contraseña"
                                name="PASS"
                                type="password"
                                onChange={this._handleChange}
                            />
            <span className="icon is-large  is-left">
              <i className="icon is-large"><IoIosLock/></i>
            </span>
            </div>
                            
                            
                            <button  onClick={this.handleFormSubmit}>INGRESAR</button>
                        </form>                        
                    </div>
                    {/* <div className="signiture">
                        <h1>Template Built & Designed by Roman Chvalbo</h1>
                    </div> */}
                </div>
                
            </React.Fragment>
        );
    }

}

export default Login;