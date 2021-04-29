import React from 'react';
import Cookies from 'universal-cookie';

function Detalle(props) {

    const cookies = new Cookies();
    console.log(cookies.get('aut_id'));

    const resultado = props.respuesta_json;
    return (
        <div>
            <h1>Resultado</h1>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th className="encabezado-detalle">Id</th>
                        <th className="encabezado-detalle">Usuario</th>
                        <th className="encabezado-detalle">Descripcion</th>
                        <th className="encabezado-detalle">Fecha Limite</th>
                        <th className="encabezado-detalle">Estado</th>
                        <th className="encabezado-detalle"></th>
                        <th className="encabezado-detalle"></th>
                    </tr>
                </thead>
            
                <tbody>
                {!resultado ? <tr><td>cargando...</td></tr> : resultado.map((tarea, index) => {
                    return <tr key={index}>
                                <td>{tarea.id}</td>
                                <td>{tarea.idusuario}</td>
                                <td>{tarea.descripcion}</td>
                                <td>{tarea.fechalimite}</td>
                                <td>{tarea.estado==0 ? "Pendiente" : "Terminada"}</td>
                                {
                                cookies.get('aut_id')==tarea.idusuario ?

                                    <td><button onClick={()=>props.editar(tarea.id)}>Editar</button></td>
                                : <td></td>
                                }
                                {
                                cookies.get('aut_id')==tarea.idusuario ?

                                    <td><button onClick={()=>props.eliminar(tarea.id)}>Eliminar</button></td>
                                : <td></td>
                                }
                            </tr>
                            
                })}
                </tbody>
            </table>
        </div>
    )
}

export default Detalle
