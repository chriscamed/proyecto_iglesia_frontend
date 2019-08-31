import React, {Component} from 'react';
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class AsistenciaInvitados extends Component {


  
  
  componentDidMount(){
    
  }
  


  render() {
      return (
        <div>
        <ExcelFile>
                <ExcelSheet data={this.props.data} name="Invitados">
                    <ExcelColumn label="Evento" value="NOMBRE"/>
                    <ExcelColumn label="Fecha" value="FECHA_EVENTO"/>
                    <ExcelColumn label="Nombre invitado" value="NOMBRE_INVITADO"/>
                    <ExcelColumn label="Telefono" value="TELEFONO_INVITADO"/>
                </ExcelSheet>
                
            </ExcelFile>
    </div>
          

      );
  }
}

export default AsistenciaInvitados;
