import ReactDOM from 'react-dom';
import firebase from "firebase/app";
function Contenido(props){
  function salir(e){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    window.reload();
  }).catch(function(error) {
    // An error happened.
  });

  }
if(props.name){
return (
  <div className="Contenido">
<h3 >Aquí está el contenido que Raziel dejó para ti</h3>
<a  className="App-link" href="./simuladores/radiografia/">Radiografía financiera</a>
<br/>
Test financiero básico de todas mis asesorías.
<br/><br/>
<a  className="App-link" href="./simuladores/comparativa/">Comparativa</a>
<br/>
Comparativa de costos entre un ahorro y un crédito.
<br/><br/>
<a  className="App-link" href="./simuladores/empiezaAhora/">Empieza con lo que tengas</a>
<br/>
Define la curva de inversiones necesaria para lograr tus metas.
<br/><br/>
<a  className="App-link" href="./simuladores/historico/">Histórico financiero</a>
<br/>
¿Realmente crees que el hubiera no existe?<br/> Pos yo sí, pero esta herramienta te va a evitar
seguir cometiendo los errores del pasado.
<br/><br/>
<a  className="App-link" href="./simuladores/inflacion/">Inflación</a>
<br/>
Microapp de cuando estaba peleado con los bancos y sus pseudoinversiones.
Te ayudará a identificar lo dañina que puede ser la inflación, por si no lo habías hecho ya.
<br/><br/>
<a  className="App-link" href="./simuladores/metas/">Simulación simplista de metas</a>
<br/>
El simulador más simplista de cuánto te costará llegar a tus metas con una inversión constante.
<br/><br/>
<br/>
<br/>
Vuelve pronto.
<br/>
<a className="App-link" onClick={salir}>Salir</a>
  </div>
);
}
else{
  return (
  <div className="ContenidoBloqueado">

  </div>
);
}
}

export default Contenido;
