import logo from './img/logo1.png';
import Radiografia from './simuladores/radiografia.js';
import Contenido from './content/contenido.js';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import ReactDOM from 'react-dom';

var uid;
var db;
var username;
var telefono;
var code;
var confirmationResult;
var turno="tel";
var appVerifier;
var userObj;
function Welcome(props) {
  console.log("props en welcome");
  console.log(props);
  function ingresarNombre(e){

db = firebase.firestore();
if(!document.getElementById("nombre").value){
  return false;
}
db.collection("users").doc(uid).set({
    nombre: document.getElementById("nombre").value,
    tel: userObj.phoneNumber
})
.then(function() {
    console.log("Document successfully written!");
    bajarNombre();
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
  }

  if(props.uid){
  if(props.name){
  return (<div className="Saludo"><h5>Hola de nuevo, {props.name}</h5>
  Desliza hacia abajo para ver el contenido.
  </div>);
}
else{
  return (
    <div id="registrar">
    <label>Nombre:</label> <br/>
    <input type="text" id="nombre"/><br/><br/>
  <a
    className="App-link"
    onClick={ingresarNombre}
  >
    Entrar
  </a>
  </div>
);
}
}
else{
  console.log("El uid en props: "+ props.uid);
  return(
  <Loguear turno={turno}/>
);
}
}
function Loguear(props){
  function getPhoneNumberFromUserInput(){
    if(document.getElementById("tel")){
      telefono = "+52"+document.getElementById("tel").value;
    }
    return telefono;
  }
  function getCodeFromUserInput(){
    if(document.getElementById("code")){
      code = document.getElementById("code").value;
    }
    return code;
  }
  function onSignInSubmit(){
    console.log("onSignInSubmit");
    const phoneNumber = getPhoneNumberFromUserInput();
//  const appVerifier = window.recaptchaVerifier;

  firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((cr) => {
        confirmationResult = cr;
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        turno="code";
        window.confirmationResult = confirmationResult;
        bajarNombre();

        // ...
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        window.alert("Raziel es medio flojo para corregir estos errores:"+error);
      });

  }
  var recordado=true;
  function clickLogin(e){
    console.log("clicklogin");
    getPhoneNumberFromUserInput();
if(telefono.length===13){
onSignInSubmit();
}else{
  if(recordado){
  window.alert("Pon tu número de celular a 10 dígitos en el campo ");
  recordado = false;
}
  document.getElementById("tel").focus();
}
  }
  function clickCode(e){
    const code = getCodeFromUserInput();
    if(code.length>3){
      console.log("enviar code");

  confirmationResult.confirm(code).then((result) => {
    // User signed in successfully.
    const user = result.user;
    uid = user.uid;
    userObj = user;
    console.log(userObj);
  bajarNombre();
    // ...
  }).catch((error) => {
    // User couldn't sign in (bad verification code?)
    // ...
    window.alert("Raziel es medio flojo para corregir estos errores, no pudimos ingresar. Error:"+error);
  });
    }else{
      if(!recordado){
      window.alert("Pon el código que te mandamos a tu cel.");
      recordado = true;
    }
      document.getElementById("code").focus();
    }


  }
  if(props.turno === "tel"){
  return(
  <p id="loguear">
  <label>
  </label>
<input id="tel" type="tel"/><br/><br/>
<a className="App-link" id="sign-in-button"  onClick={clickLogin}>Solicitar código via SMS</a>
  </p>);
}else if(props.turno === "code"){
  return(
  <p id="loguear">
  <label>Código:</label>
<input id="code" type="number"/><br/><br/>
<a className="App-link"  id="sign-in-button" onClick={clickCode}>Ingresar</a>
  </p>);
}
}
function bajarNombre(){
db = firebase.firestore();
  var docRef = db.collection("users").doc(uid);

docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        username = doc.data()["nombre"];
        ReactDOM.render(
  <Welcome  uid={uid} name={username}/>,  document.getElementById('bienvenue')
);
ReactDOM.render(
<Contenido  uid={uid} name={username}/>,  document.getElementById('contenedordelContenido')
);
    } else {
        // doc.data() will be undefined in this case
        ReactDOM.render(
  <Welcome  uid={uid} name={username}/>,  document.getElementById('bienvenue')
);
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
}
function App() {
  var firebaseConfig = {
  apiKey: "AIzaSyDX0wiYD7udXt1EOt49yk_FDMi3FWzxOLA",
  authDomain: "razielalcaraz360.firebaseapp.com",
  databaseURL: "https://razielalcaraz360.firebaseio.com",
  projectId: "razielalcaraz360",
  storageBucket: "razielalcaraz360.appspot.com",
  messagingSenderId: "660764830560",
  appId: "1:660764830560:web:349262eb3f27ba6b"
};
// Initialize Firebase

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}
firebase.auth().languageCode = 'es';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    uid = user.uid;
    bajarNombre();
    console.log("El uid es: " + uid);
    userObj = user;
    console.log(userObj);
    // ...
  } else {
    // User is signed out
    // ...
    appVerifier = new firebase.auth.RecaptchaVerifier('bienvenue2', {
    'size': 'invisible',
    'callback': (response) => {
    // reCAPTCHA solved, allow signInWithPhoneNumber.
    console.log("verificado!!");
    }
    });

  }
});
console.log(username);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Estás en el lugar indicado.
          <a id="bienvenue2"/>
        </p>
        <div id="bienvenue">

<Welcome uid={uid} name={username}/>
</div>
      </header>
      <div id="contenedordelContenido">
<Contenido uid={uid} name={username}/>
</div>
    </div>
  );
}

export default App;
