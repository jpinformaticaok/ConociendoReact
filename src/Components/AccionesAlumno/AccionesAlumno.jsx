import { useState } from "react";

export default function AccionesAlumno() {
    const [mostrarAcciones, setMostrarAcciones] = useState(true);

    const mostrarAlertaAlumno = () => {
        console.log("Alumno: Juan Pablo Agüero");
    };
    const mostrarAlertaEditar = () => {
        console.log("Editar Alumno: Juan Pablo Agüero");
    }
    const mostrarAlertaEliminar = () => {
        console.log("Eliminar Alumno: Juan Pablo Agüero");
    }
  return (
    <>
            <br />
            <label htmlFor="mostrarAcciones">Mostrar acciones:</label>
            <input type="checkbox" id="mostrarAcciones" name="mostrarAcciones" checked={mostrarAcciones}
              onChange={(evento) => setMostrarAcciones(evento.target.checked)}
            />
            {mostrarAcciones && <h1>Acciones del Alumno</h1>}
            <button onClick={mostrarAlertaAlumno}>Ver alumno</button>
            <br />
            <button onClick={mostrarAlertaEditar}>Editar alumno</button>
            <br />
            <button onClick={mostrarAlertaEliminar}>Eliminar alumno</button>
    </>
);
}