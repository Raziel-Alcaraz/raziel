import $ from "jquery";
import Pie from "react-chartjs-2";
import logo from '../img/logo1.png';



function Radiografia() {
  var data1;
  // label: wat, data: [sup,cre,rec,gh],
  data1= {
     labels: ['Necesidades básicas', 'Inversión', 'Estilo de vida', 'No contabilizados'],
     datasets: [{
         label: "wat",
        data: [1,2,3,4],
         backgroundColor: [
             'rgba(255, 12, 12, 0.7)',
             'rgba(2, 255, 2, 0.7)',
             'rgba(255, 206, 86, 0.7)',
             'rgba(200, 200, 200, 0.7)'

         ],
         borderColor: [
             'rgba(255, 12, 12, 1)',
             'rgba(2, 255, 2, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(200, 200, 200, 1)'

         ],
         borderWidth: 1
     }]
  };
  var options1;
  function calcular(e){
     e.preventDefault();    console.log('The link was clicked.');
    console.log("Calculando alv...");}
  function calcular2(e){

    console.log("Calculando alv...");
      var sobrevivencia, crecimiento, recreacion;
      sobrevivencia=0;
      crecimiento=0;
      recreacion=0;
      var divsobrevivencia, divcrecimiento, divrecreacion;
      divsobrevivencia = document.getElementById("sobrevivencia");
      divcrecimiento = document.getElementById("crecimiento");
      divrecreacion = document.getElementById("recreacion");
      var cortables = parseFloat(0);
      for(var i=0;i< document.getElementsByClassName("cortable").length;i++){
          if($.isNumeric(document.getElementsByClassName("cortable")[i].value)){
          cortables += parseFloat(document.getElementsByClassName("cortable")[i].value);

      }
  }
      for(var i=0;i< divsobrevivencia.querySelectorAll("input").length;i++){
          if($.isNumeric(divsobrevivencia.querySelectorAll("input")[i].value)){
          sobrevivencia += parseFloat(divsobrevivencia.querySelectorAll("input")[i].value);

      }
      }
      for(var i=0;i< divcrecimiento.querySelectorAll("input").length;i++){
          if($.isNumeric(divcrecimiento.querySelectorAll("input")[i].value)){
          crecimiento += parseFloat(divcrecimiento.querySelectorAll("input")[i].value);

      }
      }
      for(var i=0;i< divrecreacion.querySelectorAll("input").length;i++){
          if($.isNumeric(divrecreacion.querySelectorAll("input")[i].value)){
          recreacion += parseFloat(divrecreacion.querySelectorAll("input")[i].value);

      }
      }
      var gastos = parseFloat(sobrevivencia)+parseFloat(crecimiento)+parseFloat(recreacion);
      var total = parseFloat(0);
      if($.isNumeric(document.getElementById("ingresoFijo").value)){
        total+=parseFloat(document.getElementById("ingresoFijo").value);
      }
      if($.isNumeric(document.getElementById("ingresoVariable").value)){
        total+=parseFloat(document.getElementById("ingresoVariable").value);
      }
      console.log("Sobrevivencia: "+ sobrevivencia);
      console.log("crecimiento: "+ crecimiento);
      console.log("recreacion: "+ recreacion);
      var porcsobrevivencia, porccrecimiento, porcrecreacion, gh, porcgh;
      porcsobrevivencia =100* (parseFloat(sobrevivencia)/parseFloat(total));
      porccrecimiento =100* (parseFloat(crecimiento)/parseFloat(total));
      porcrecreacion =100* (parseFloat(recreacion)/parseFloat(total));
      gh = total-gastos;
      porcgh = 100*gh/total;


  var textoresultados = "<div class='texto'>El resultado de tu radiografía financiera es el siguiente:<br>";
  textoresultados+= "<br>Estás invirtiendo el <b>"+porccrecimiento.toFixed(1)+"%</b> de tu poder adquisitivo." ;
  textoresultados+= " Gastas el <b>"+porcsobrevivencia.toFixed(1)+"%</b> de tus ingresos en necesidades básicas, " ;
  textoresultados+= "el <b>"+porcrecreacion.toFixed(1)+"%</b> en mantener tu estilo de vida" ;
  if(porcgh.toFixed(1)>0){
  textoresultados+= ", y el <b>"+porcgh.toFixed(1)+"%</b> no sabes ni en qué te los gastas. " ;
  }
  else if(porcgh.toFixed(1)<0){
  textoresultados+= "<br>Y no sabes ni de dónde sacas otros<b> $"+parseInt(-1*gh)+"</b> para seguir gastando. " ;
  }
  else {

  textoresultados+= ".<br></br>No tienes ni un peso de gasto horimga, <b>¡FELICIDADES!</b>. " ;
  }
  var eficiencia = 100-porcgh;

  if(eficiencia>95 && eficiencia<=100){
  textoresultados+="Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>Excelente</b>. Tienes \n\
  poco o nulo gasto no contabilizado. ¡Sigue así!<br>";
  }
  else if(eficiencia>80 && eficiencia<=95){
  textoresultados+="Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>Buena</b>. Tienes \n\
  poco gasto no contabilizado. Puedes mejorar llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día.<br>";
  }
  else if(eficiencia>65 && eficiencia<=80){
  textoresultados+="Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>Regular</b>. Tienes \n\
  muchos gastos no contabilizados. Puedes mejorar llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día.<br>";
  }
  else if(eficiencia>30 && eficiencia<=65){
  textoresultados+="Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>Mala</b>. Tienes \n\
  demasiados gastos no contabilizados. Puedes mejorar llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día.<br>";
  }
  else if(eficiencia>0 && eficiencia<=30){
  textoresultados+="<br></br>Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>tan mala que parece un error del sistema</b>. Tienes \n\
  demasiados gastos no contabilizados. Puedes mejorar llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día. Te recomiendo revisar la información que\n\
  registraste e intentar de nuevo si crees que se trata de un error<br>";
  }
  else if( eficiencia<=0){
  textoresultados+="<br></br>Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>tan mala que parece un error del sistema</b>. Tienes \n\
  demasiados gastos no contabilizados. Puedes mejorar llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día. Te recomiendo revisar la información que\n\
  registraste e intentar de nuevo si crees que se trata de un error<br>";
  }
  else if( eficiencia>100){
  textoresultados+="<br></br>Tu eficiencia financiera de "+eficiencia.toFixed(1)+"% es <b>tan buena que parece un error del sistema</b>. Tienes \n\
  pocos o nulos gastos no contabilizados. Puedes mejorar\n\
  los cálculos llevando un registro de gastos diario. La salud financiera comienza\n\
  por las decisiones aparentemente pequeñas que tomamos día a día. Te recomiendo revisar la información que\n\
  registraste e intentar de nuevo si crees que se trata de un error<br>";
  }
  textoresultados+="</div><div class='contenedor-1' > <canvas id='graph1'></canvas> \n\
  <canvas id='graph2'></canvas> </div>";


  console.log(data1);
  textoresultados+="<div class='texto'>Puedes comparar el manejo de tu poder adquisitivo con \n\
  la distribución de ingresos ideal recomendada a nivel mundial usando las gráficas de arriba.</div>";
  textoresultados+="<div class='texto'> El análisis automático indica que puedes \n\
  ahorrar entre <b>$"+((cortables+gh)/2).toFixed(2)+"</b> y <b>$"+((cortables+gh)).toFixed(2)+"</b> sin embargo\n\
  aún estoy desarrollando una herramienta de inteligencia artificial que permita hacerlo realmente preciso.</div>";
  textoresultados+="<div class='texto'></div>";
  document.getElementById("resultados"). innerHTML = textoresultados;
      window.location.hash = "resultados";
      hacerchart1(sobrevivencia,crecimiento,recreacion,gh, 'graph1', "Distribución de ingresos");
      hacerchart1(33,33,33,1, 'graph2', "Distribución de ingresos ideal");
      document.getElementById("calcular").style.right="1%";
    //  document.getElementById("calcular").style.width="2em";
      document.getElementById("calcular").style.height="2em";
      document.getElementById("calcular").innerHTML="<img class='recarga' src='https://razielalcaraz.com/resources/reload.png' width='16px' height='16px'>";
  }
  function validar(){
      console.log("validando");
      if($.isNumeric(document.getElementById("ingresoFijo").value) ||
              $.isNumeric(document.getElementById("ingresoVariable").value)){
        //  document.getElementById('calcular').disabled=false;
          console.log(document.getElementById('calcular').disabled);
          console.log("valido");
      }else if(!$.isNumeric(document.getElementById("ingresoFijo").value) ||
              !$.isNumeric(document.getElementById("ingresoVariable").value)){
        //document.getElementById('calcular').disabled=true;
      }
  }
  function hacerchart1(sup,cre,rec,gh, donde, wat)
  {

  var ctx = document.getElementById(donde).getContext('2d');

options1={
   title:{
       display: true,
       text: wat
   }};
  var myChart = new Pie(ctx,

  {data1, options1}
  );

  //-------------------------------------------------------------------------------------
  }
  return (
    <div className="App">
    <div className="resaltar">
        Radiografía financiera
    </div>
    <div className="topcontainer">
        <label>Ingresos fijos</label><br></br>
            <input type="number" id='ingresoFijo' onChange={validar}/><br></br>
            <label>Ingreso variable promedio</label><br></br>
            <input type="number" id='ingresoVariable' onChange={validar}/><br></br>

    </div>
    <div className="inputDiv">
        <div className="triples" id="sobrevivencia">
            <label>Colegiaturas</label><br></br>
            <input type="number"/><br></br>
            <label>Luz</label><br></br>
            <input type="number"/><br></br>
            <label>Renta</label><br></br>
            <input type="number"/><br></br>
            <label>Agua</label><br></br>
            <input type="number"/><br></br>
            <label>Mantenimiento</label><br></br>
            <input type="number"/><br></br>
            <label>Gas</label><br></br>
            <input type="number"/><br></br>
            <label>Supermercado</label><br></br>
            <input type="number"/><br></br>
            <label>Ropa</label><br></br>
            <input type="number"  className="cortable"/><br></br>
            <label>Teléfono fijo</label><br></br>
            <input type="number"/><br></br>
            <label>Internet</label><br></br>
            <input type="number"/><br></br>
            <label>Cable</label><br></br>
            <input type="number"/><br></br>
            <label>Celular</label><br></br>
            <input type="number"/><br></br>
            <label>Gasolina</label><br></br>
            <input type="number"/><br></br>
            <label>Transporte</label><br></br>
            <input type="number"/><br></br>
            <label>Automóvil/mantenimiento</label><br></br>
            <input type="number"/><br></br>
            <label>Imprevistos</label><br></br>
            <input type="number"/><br></br>
            <label>Impuestos</label><br></br>
            <input type="number"/><br></br>
            <label>Otros</label><br></br>
            <input type="number"/><br></br>

        </div>
        <div className="triples" id="recreacion">
            <label>Servicio doméstico</label><br></br>
            <input type="number"/><br></br>
            <label>Deportes</label><br></br>
            <input type="number"/><br></br>
            <label>Diversión</label><br></br>
            <input type="number"/><br></br>
            <label>Vacaciones</label><br></br>
            <input type="number"/><br></br>
            <label>Cursos/posgrados</label><br></br>
            <input type="number"/><br></br>
            <label>Entretenimiento</label><br></br>
            <input type="number"/><br></br>
            <label>Tarjeta de crédito</label><br></br>
            <input type="number"/><br></br>
            <label>Crédito hipotecario</label><br></br>
            <input type="number"/><br></br>
            <label>Otros creditos</label><br></br>
            <input type="number"/><br></br>
            <label>Golosinas y refrescos</label><br></br>
            <input type="number"  className="cortable"/><br></br>
            <label>Agua embotellada</label><br></br>
            <input type="number" className="cortable"/><br></br>
            <label>Salidas</label><br></br>
            <input type="number"/><br></br>
            <label>Alimentos fuera de casa</label><br></br>
            <input type="number" className="cortable"/><br></br>
            <label>Otros</label><br></br>
            <input type="number"/><br></br>

        </div>
        <div className="triples" id="crecimiento">
            <label>Fondos de inversión</label><br></br>
            <input type="number"/><br></br>
            <label>Inmuebles</label><br></br>
            <input type="number"/><br></br>
            <label>Negocios</label><br></br>
            <input type="number"/><br></br>
            <label>Acciones</label><br></br>
            <input type="number"/><br></br>
            <label>Ahorro bancario</label><br></br>
            <input type="number"/><br></br>
            <label>CETES/bonos</label><br></br>
            <input type="number"/><br></br>
            <label>Seguro de ahorro</label><br></br>
            <input type="number"/><br></br>
            <label>Seguro de retiro</label><br></br>
            <input type="number"/><br></br>
            <label>Seguro con inversión</label><br></br>
            <input type="number"/><br></br>
            <label>Seguro educativo</label><br></br>
            <input type="number"/><br></br>
            <label>Otros</label><br></br>
            <input type="number"/><br></br>
        </div>

</div>
          <button id='calcular' onClick={calcular2} >Calcular!</button>
          <div id='resultados'>



          </div>


    </div>

  );
}

export default Radiografia;
