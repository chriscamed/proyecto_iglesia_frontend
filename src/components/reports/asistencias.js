import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


am4core.useTheme(am4themes_animated);

class AsistenciaRPT extends Component {


  
  componentDidMount(){
    
    var data = this.props.data;
    //let chart = am4core.create("chartdiv", am4charts.XYChart);
    var chart = am4core.create("chartdiv", am4charts.PieChart3D);

    // ... chart code goes here ...
    am4core.ready(function() {

      // Themes begin
      //am4core.useTheme(am4themes_animated);
      // Themes end
      
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
      
      chart.legend = new am4charts.Legend();
      
      chart.data = data;
      
      var series = chart.series.push(new am4charts.PieSeries3D());
      series.dataFields.value = "catidad_registrados";
      series.dataFields.category = "genero";
      
      }); // end am4core.ready()
    //ESto tambien va
    this.chart = chart;
  }

  


  render() {
      return (
        <div>
      
      <div style={{width:"100%", height:"500px"}}>
        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        </div>
        <div>  
          <ExcelFile>
                <ExcelSheet data={this.props.data} name="Hombres y mujeres">
                    <ExcelColumn label="genero" value="genero"/>
                    <ExcelColumn label="catidad" value="catidad_registrados"/>
                </ExcelSheet>
            </ExcelFile>
            
        </div>

    </div>
          

      );
  }
}

export default AsistenciaRPT;
