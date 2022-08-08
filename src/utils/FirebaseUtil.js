// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import {collection, getDocs,setDoc, getFirestore, deleteDoc, doc} from "firebase/firestore";
import {uuid} from 'uuidv4';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export function firebaseConfig(){
  const config = {
    apiKey: "AIzaSyDXsRriywhvh_jMzm5meSkVwFaImnaEEhg",
    authDomain: "sistema-77ce8.firebaseapp.com",
    projectId: "sistema-77ce8",
    storageBucket: "sistema-77ce8.appspot.com",
    messagingSenderId: "423996090911",
    appId: "1:423996090911:web:b1081f5d95dd8e9630432a",
    measurementId: "G-0TJ30KWC7S"
  };

  // Initialize Firebase
  const app = initializeApp(config);
  const analytics = getAnalytics(app);
}


export function firebaseRegistrarUsuario(email, password){
  createUserWithEmailAndPassword( getAuth(), email, password)
    .then(credenciales =>{
    //  credenciales.user.email
  })
}

export async function firebaseIniciarSesion(email, password){
  try{
    let credenciales =  await signInWithEmailAndPassword(getAuth(), email, password);
    //credenciales.user
  } catch(e){
    return false;
  }
  return true;
}

export async function firebaseBuscar(coleccionaBuscar){
  let listado=[];
  let consulta = collection(getFirestore(), coleccionaBuscar);
  let resultado = await getDocs(consulta);
  resultado.forEach(documento=>{
      let objeto = documento.data();
      objeto.id= documento.id;
      listado.push(objeto);
  });
  return listado; 
}

export function firebaseCrear(coleccion, objeto){
  objeto.id = uuid();
  let referencia = doc(getFirestore(), coleccion, objeto.id);
  setDoc(referencia, objeto);
}

export async function firebaseEliminar(coleccion, id) {
  await deleteDoc(doc(getFirestore(), coleccion,id))
}
