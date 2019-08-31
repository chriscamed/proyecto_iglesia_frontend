import React, {Component} from 'react';
import Axios from 'axios';
import Media from 'react-bulma-components/lib/components/media';
import Modal from 'react-bulma-components/lib/components/modal';
import Button from 'react-bulma-components/lib/components/button';
import Content from 'react-bulma-components/lib/components/content';
import Level from 'react-bulma-components/lib/components/level';
import TotalXPersona from './personatotal';

class ModalReporteHM extends Component {

  state = {
    data:[],
    show: false,
    cedula:'',
    fechaInicial:'2019-05-10',
    fechaFinal:'2019-12-31'
  }
  open = () => this.setState({ show: true });
  close = () => this.setState({ show: false }); 
  
  
  componentDidMount() {
   
  }

  
  onChangefechaFinal = e =>{
    this.setState({
      fechaFinal: e.target.value
    })

}

onChangefechaInicial = e =>{
  this.setState({
      fechaInicial: e.target.value
    })
}

onChangeCedula = e =>{
    this.setState({
        cedula: e.target.value
      })
  }
  

  cargarDatosPT = () => {
    const config = {
        headers: {
        'content-type': 'multipart/form-data',
        'Authorization': localStorage.getItem('id_token')
        }
        };
        //const {persona} = this.state;
        console.log('http://localhost:5000/reportes/asistenciapersona/?fechaInicio='+this.state.fechaInicial+'&fechaFin='+this.state.fechaFinal+'&cedula='+this.state.cedula)
        Axios.get('http://localhost:5000/reportes/asistenciapersona/?fechaInicio='+this.state.fechaInicial+'&fechaFin='+this.state.fechaFinal+'&cedula='+this.state.cedula, config)
        .then(response => {
            console.log(response.data);
           var data = [
               {
                   "total":response.data[0].eventos,
                   "item":"eventos"
               },
               {
                "total":response.data[0].asistencias,
                "item":"asistencias"
                }
           ]; 
          this.setState({data, show:true})
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
            <TotalXPersona data={this.state.data}/>

        )
    }  
  }



  render() {
      return (
        <div>
        <div className="column">
        <label className="label">FECHA INICIAL: </label>
          <div className="control">
          <input className="input" type="date" required value={this.state.fechaInicial}  onChange={this.onChangefechaInicial} />
      </div>
      </div>
      <div className="column">
        <label className="label">FECHA FINAL: </label>
          <div className="control">
          <input className="input" type="date" required value={this.state.fechaFinal}  onChange={this.onChangefechaFinal} />
      </div>
      </div>
      <div className="column">
        <label className="label">CEDULA: </label>
          <div className="control">
          <input className="input" type="number" required value={this.state.cedula}  onChange={this.onChangeCedula} />
      </div>
      </div>
  <Button onClick={this.cargarDatosPT} renderAs="a" className="button"> Total Asistencias</Button>
<Modal show={this.state.show} onClose={this.close} closeOnEsc={true} closeOnBlur={true} > 
<Modal.Card >
<Modal.Card.Head onClose={this.close} style={{background:`#64234A`}}>
<Modal.Card.Title className="has-text-white">Total de Asistencias VS los eventos</Modal.Card.Title>          
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
