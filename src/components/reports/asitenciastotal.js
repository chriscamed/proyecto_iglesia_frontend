import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


am4core.useTheme(am4themes_animated);

class AsistenciaTOTAL extends Component {


  
  
  componentDidMount(){
    
    var data = this.props.data;
  
   
    //let chart = am4core.create("chartdiv", am4charts.XYChart);
    //var chart = am4core.create("chartdiv", am4charts.PieChart3D);
    var chart = am4core.create("chartdiv", am4charts.XYChart);
    // ... chart code goes here ...
    am4core.ready(function() {

        // Themes begin
      //  am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create chart instance
      
        
        // Add data
        chart.data = data;
        
        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";
        
        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "Cant_asistencias";
        series.dataFields.dateX = "fecha";
        series.tooltipText = "{evento} H:{Cant_Hombres} , M: {Cant_Mujeres}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        
        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        
        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;
        
        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();
        
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        
        chart.events.on("ready", function () {
          dateAxis.zoom({start:0.79, end:1});
        });
        
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
        <ExcelFile>
                <ExcelSheet data={this.props.data} name="Asistencias">
                    <ExcelColumn label="Evento" value="evento"/>
                    <ExcelColumn label="Numero de asistencias" value="Cant_asistencias"/>
                    <ExcelColumn label="Numero de Hombres" value="Cant_Hombres"/>
                    <ExcelColumn label="Numero de Mujeres" value="Cant_Mujeres"/>
                    <ExcelColumn label="Fecha del evento" value="fecha"/>
                </ExcelSheet>
                
            </ExcelFile>
    </div>
          

      );
  }
}

export default AsistenciaTOTAL;
