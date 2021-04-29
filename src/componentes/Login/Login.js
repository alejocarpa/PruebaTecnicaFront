import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

function Login() {

    const cookies = new Cookies();

    const [datos, setDatos] = useState({
        usuario: '',
        password: ''
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const iniciarSesion = async(event) => {
        event.preventDefault();
 
        const baseUrl = `http://localhost:8000/api/autenticacion`;
        //alert(this.state.form.usuario);
        await axios.post(baseUrl,  { usuario: datos.usuario, clave : datos.password  } )
        .then(response => {
            console.log(response.data);
            return response.data;
        })
        .then(response => {
          if(response.length>0){
            var respuesta = response[0];
            cookies.set('aut_id', respuesta.id, { path : "/" });
            window.location.href="./../Home/";
          }else{
            alert("Usuario o contraseña incorrectos");
          }
        })
        .catch(error => {
          console.log(error);
        })
    }

    return (
        <div>
            <form onSubmit={iniciarSesion}>
                <input type="text" name="usuario" autoFocus="autofocus" placeholder="Usuario" onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Contraseña" onChange={handleInputChange} />
                <button type="submit" className="login-boton"> Ingresar </button>
          </form>
        </div>
    )
}

export default Login
