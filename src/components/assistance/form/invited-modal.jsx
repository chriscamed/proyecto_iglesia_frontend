import React from 'react';
import '../../../App.css';
import '../../../App.sass';
import '../../../estilo.css';
import axios from 'axios';
import Media from 'react-bulma-components/lib/components/media';
import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';

class OpenModal extends React.Component {
  constructor(props){
    super(props);
    
    this.state={
      nombre: '',
      telefono: '',
      invitado: null,
      invitadoPor: [],
     
    }
  }
  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false });

  componentDidMount(){
    this.getMiembros()
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
    .then(datos => this.setState({invitadoPor: datos}))
    .catch(err => console.log(err))
  }

  handleAgregar = event => {
    event.preventDefault();
    const obj = {
        INVITADO: 'SI',        
        NOMBRE_INVITADO: this.state.nombre,
        TELEFONO_INVITADO: this.state.telefono,
        EVENTO: this.props.evento_id,
        INVITADO_POR: this.state.invitado,
        };
    const config = {
        headers: {
        'content-type': 'application/json',
        'Authorization': localStorage.getItem('id_token')
        }
        };
    axios.post('http://localhost:5000/asistencia/crear', obj,config)
        .then(response=>console.log(response.data,obj))
        .then(alert("se ha registrado el invitado"))
        .then(this.close)
        .catch(err => console.log(err))

        this.setState({nombre: '', telefono: '', invitado:''})
  }
  render() {
    return (
      <div>
        <Button onClick={this.open} renderAs="button" className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF`}}>{this.props.titulo}</Button>
        <Modal show={this.state.show} onClose={this.close} closeOnEsc={true} closeOnBlur={true} >
          <Modal.Card >
          <Modal.Card.Head onClose={this.close} style={{background:`#64234A`}}>
            <Modal.Card.Title className="has-text-white">{this.props.titulo.toUpperCase()}</Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <Media>
              <Media.Item>
                <Content>
                <div className="columns">
                  <div className="column">
                    <label>NOMBRE INVITADO <font color="red">*</font></label>
                    <input className="input" type="text" required value={this.state.nombre} onChange={e => this.setState({nombre:e.target.value})}  />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <label>TELEFONO INVITADO <font color="red">*</font></label>
                    <input className="input" type="text" required value={this.state.telefono} onChange={e => this.setState({telefono:e.target.value})} />
                  </div>
                </div>

                <div className="columns">
                  <div className="column">
                    <label>INVITADO POR <font color="red">*</font></label>
                    <div className="control">
                         <div className="select" style={{border:`solid 2px rgb(134, 56, 103)`}}>
                          <select value={this.state.invitado} onChange={e => this.setState({invitado:e.target.value})} >
                            <option selected={true} value="">---Seleccione---</option>
                            {this.state.invitadoPor.map(option => (                          
                                <option key={option.ID_MIEMBRO} value={option.ID_MIEMBRO}>
                                {option.PRIMER_NOMBRE+" "+option.SEGUND_NOMBRE+" "+ option.PRIMER_APELLIDO+" "+option.SEGUND_APELLIDO}
                              </option>
                            ))}
                          </select>
                        </div>
                    </div>
                  </div>
                </div>
                </Content>
                <div className="columns">
                  <div className="column">
                    <Button onClick={this.handleAgregar} className="button is-rounded is-medium is-fullwidth" style={{backgroundColor:`#64234A`, color: `#FFF`}}>REGISTRAR</Button>
                  </div>
                </div>
                {/*<Level breakpoint="mobile">
                  <Level.Side align="center">
                  </Level.Side>
                </Level>*/}
            </Media.Item>
          </Media>
          </Modal.Card.Body>
          {/*<Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}></Modal.Card.Foot>*/}
          </Modal.Card>
        </Modal>
      </div>
    );
  }
}
export default OpenModal;
