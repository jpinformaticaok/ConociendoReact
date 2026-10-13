import Cliente from "../Cliente/Cliente";
import useClientesApi from "../../Hooks/useClientesApi"; 
import { CircularProgress } from "@mui/material";


export default function ClienteList() {
  const { clientes, cargando, error, eliminarCliente } = useClientesApi();

  return (

    <div>
      {cargando && <CircularProgress />}
      {error && <p>Error al cargar clientes</p>}
      {!cargando && !error && (
        <ul>
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <Cliente
                firstname={cliente.firstname}
                lastname={cliente.lastname}
                dni={cliente.dni}
                address={cliente.address}
                id={cliente.id}
                onEliminar={eliminarCliente}
              />
            </li>
          ))}
        </ul>
        
      )}
    </div>
  );
}
