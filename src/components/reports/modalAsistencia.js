import React, {Component} from 'react';
import Axios from 'axios';
import Asistencia from './asistencias';
import Media from 'react-bulma-components/lib/components/media';
import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';

class ModalReporteHM extends Component {

  state = {
    data:[],
    show: false,
  }
  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false }); 
  
  
  componentDidMount() {
   
  }

  cargarDatosHM = () => {
    const config = {
        headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('id_token')
        }
        };
        //const {persona} = this.state;
        Axios.get('http://localhost:5000/reportes/totalgeneros', config)
        .then(response => {
            
          this.setState({data:response.data, show:true})
        })
        .catch(err => console.log(err))
  
  }

  cambiardatos = () =>{
    if(this.state.data.length <= 0){

        return(
            <div>Cargando...</div>
        )
    }else{
    
        return(
            <Asistencia data={this.state.data}/>

        )
    }  
  }



  render() {
      return (
        <div>
        <Button onClick={this.cargarDatosHM} renderAs="a" className="button">Reporte H y M</Button>
    <Modal show={this.state.show} onClose={this.close} closeOnEsc={true} closeOnBlur={true} > 
      <Modal.Card >
<Modal.Card.Head onClose={this.close} style={{background:`#64234A`}}>
      <Modal.Card.Title className="has-text-white">Total de hombres y mujeres registrados</Modal.Card.Title>          
</Modal.Card.Head>
    <Modal.Card.Body>
      <Media>
        <Media.Item>
          <Content>
            {this.cambiardatos()}
          </Content>
          <Level breakpoint="mobile">
            <Level.Side align="left">
            <div className="columns">
            <div className="column">
              <Button onClick={this.close} >Cerrar</Button>
              </div>
              </div>
            </Level.Side>
          </Level>
        </Media.Item>
      </Media>
    </Modal.Card.Body>
    <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
      
    </Modal.Card.Foot>
  </Modal.Card>
    </Modal>
    </div>       


      );
  }
}

export default ModalReporteHM;
