import React, { useState } from 'react';
import axios from 'axios';
import Detalle from './Detalle';

function Home() {

    const [pantalla, setPantalla] = useState('Consultar');
    const [detalle, setDetalle] = useState([]);

    const [datos, setDatos] = useState({
        usuario: '',
        descripcion: '',
        fechalimite: '',
        estado: '',
        id: ''
    });

    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name]: event.target.value
        })
    }

    const enviarDatos = async(event) => {
        event.preventDefault();

        if(pantalla === "Buscar"){

            const UrlConsultar = `http://localhost:8000/api/tareas/consultar`;
            await axios.post(UrlConsultar,  { 
                idusuario: datos.usuario,
                descripcion: datos.descripcion,
                fechalimite: datos.fechalimite,
                estado: datos.estado
            })
            .then(response => {
                
                const responseJSON = response.data;
                console.log(responseJSON);
                setDetalle(responseJSON);
            })
            
        }else if(pantalla === "Nuevo"){

            const UrlGuardar = `http://localhost:8000/api/tareas/crear`;
            await axios.post(UrlGuardar,  { 
                idusuario: datos.usuario,
                descripcion: datos.descripcion,
                fechalimite: datos.fechalimite,
                estado: 0,
                metodo: 'Guardar'
            })
            .then(response => {
                
                alert('Se guardo correctamente la tarea');
                
                setDatos({
                    ...datos,
                    usuario: '',
                    descripcion: '',
                    fechalimite: '',
                    estado: ''
                })
                
                
            })
            
        }else if(pantalla === "Editar"){

            const UrlEditar = `http://localhost:8000/api/tareas/actualizar`;
            await axios.post(UrlEditar,  { 
                idusuario: datos.usuario,
                descripcion: datos.descripcion,
                fechalimite: datos.fechalimite,
                estado: datos.estado,
                id: datos.id
            })
            .then(response => {
                
                alert('Se actualizo correctamente la tarea');
                
                setDatos({
                    ...datos,
                    usuario: '',
                    descripcion: '',
                    fechalimite: '',
                    estado: '',
                    id: ''
                })
                
                
            })
        }
    }

    const cambiarPantalla = (e) => {
        setPantalla(e.target.value);
    }

    const editar = async(codigo) => {
        //alert("editar "+codigo);
        setPantalla("Editar");

        const UrlConsulta = `http://localhost:8000/api/tareas/consultar`;
        await axios.post(UrlConsulta,  { 
            id: codigo
        })
        .then(response => {
            const respuesta = response.data;
            //console.log(respuesta);
            respuesta.map((dato, index) => {
                return <div key={index}>
                {setDatos({
                    ...datos,
                    usuario: dato.idusuario,
                    descripcion: dato.descripcion,
                    fechalimite: dato.fechalimite,
                    estado: dato.estado,
                    id: dato.id
                })}
                </div>
            })
        })
    }

    const eliminar = async(codigo) => {
        //alert("editar "+codigo);

        const UrlEliminar = `http://localhost:8000/api/tareas/borrar`;
        await axios.post(UrlEliminar,  { 
            id: codigo
        })
        .then(response => {
            alert("Se elimino la tarea "+codigo);
        })
    }
    
    return (
        <div>
            <h1> Tareas </h1>
            <form className="row m-3" onSubmit={enviarDatos}  >
                <div className="col-md-3 p-2">
                    <label className="form-label"><b>Usuario</b></label>
                    <input type='text' name="usuario" className="form-control" value={datos.usuario} onChange={handleInputChange} />
                </div>
                <div className="col-md-3 p-2">
                    <label className="form-label"><b>Descripcion</b></label>
                    <input type='text' name="descripcion" className="form-control" value={datos.descripcion} onChange={handleInputChange} />
                </div>
                <div className="col-md-3 p-2">
                    <label className="form-label"><b>Estado</b></label>
                    <select name="estado" className="form-select" value={datos.estado} onChange={handleInputChange} >
                        <option value=""></option>
                        <option value="0">Pendiente</option>
                        <option value="1">Terminada</option>
                    </select>
                </div>
                <div className="col-md-3 p-2">
                    <label className="form-label"><b>Fecha limite</b></label>
                    <input type='date' name="fechalimite" className="form-control" value={datos.fechalimite} onChange={handleInputChange} />
                </div>

                {
                pantalla === "Nuevo" ?
                    <div className="col-md-5 m-2">
                        <button className="btn btn-dark m-2" type="button" name="pantalla" value="Consultar" onClick={cambiarPantalla} >Consultar</button>
                        <button className="btn btn-dark m-2" type="submit" name="pantalla" value="Guardar" >Guardar</button>
                    </div>
                : pantalla === "Consultar" || pantalla === "Buscar" ?
                    <div className="col-md-5 m-2">
                        <button className="btn btn-dark m-2" type="button" name="pantalla" value="Nuevo" onClick={cambiarPantalla} >Nuevo</button>
                        <button className="btn btn-dark m-2" type="submit" name="pantalla" value="Buscar" onClick={cambiarPantalla} >Buscar</button>
                    </div>
                : pantalla === "Editar" ?
                    <div className="col-md-5 m-2">
                        <button className="btn btn-dark m-2" type="button" name="pantalla" value="Consultar" onClick={cambiarPantalla} >Consultar</button>
                        <button className="btn btn-dark m-2" type="submit" name="pantalla" value="Guardar" >Actualizar</button>
                    </div>
                : ""
                }
            </form>
            {pantalla === "Buscar" ? <Detalle respuesta_json={detalle} editar={editar} eliminar={eliminar} /> : "" }
        </div>
    )
}

export default Home;
