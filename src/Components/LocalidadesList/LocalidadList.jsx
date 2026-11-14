import Localidad from "../Localidad/Localidad";
import useLocalidadesApi from "../../Hooks/useLocalidadesApi"; 
import { CircularProgress } from "@mui/material";


export default function LocalidadList() {
  const { localidades, cargando, error, eliminarLocalidad } = useLocalidadesApi();

  return (

    <div>
      <h1>Lista de Localidades</h1>
      {cargando && <CircularProgress />}
      {error && <p>Error al cargar localidades</p>}
      {!cargando && !error && (
        <ul>
          {localidades.map((localidad) => (
            <li key={localidad.id}>
              <Localidad
                name={localidad.name}
                id={localidad.id}
                onEliminar={eliminarLocalidad}
              />
            </li>
          ))}
        </ul>
        
      )}
    </div>
  );
}
