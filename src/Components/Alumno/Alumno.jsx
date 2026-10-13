import { useState } from "react";
import imagen from "../../assets/alumno.png";

export default function Alumno({alumno, curso}) {
    const [nombre, setNombre] = useState(alumno);
    const anio = new Date().getFullYear();
    const [mostrarImagen, setMostrarImagen] = useState(true);
  return (
    <>
        <center>
            <h1>Nombre: {nombre}</h1>
            <h2>Curso: {curso}</h2>
            <h2>Año: {anio}</h2>
            {mostrarImagen && <img src={imagen} width={100} alt="Logo ISP20" />}
            <br />
            <h2>Edad: {anio-1982}</h2>
            <br />
            <label htmlFor="nombre">Nombre: </label>
            <input type="text" id="nombre" name="nombre" value={nombre} onChange={(evento) => setNombre(evento.target.value)} />
            <br />
            <label htmlFor="mostrarImagen">Mostrar Imagen:</label>
            <input type="checkbox" id="mostrarImagen" name="mostrarImagen" checked={mostrarImagen}
              onChange={(evento) => setMostrarImagen(evento.target.checked)}
            />
            <br />
            <h2>Ir a mi github</h2>
            <a href="https://github.com/jpinformaticaok" target="_blank" rel="noopener noreferrer"> JPInformaticaOK
            </a>
        </center>
        <hr />
    </>
  )
}