import Cliente from "../Cliente/Cliente";
import useClientesApi from "../../Hooks/useClientesApi"; 
import { Button, CircularProgress, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { useState } from "react";
import Modal from "../Modal/Modal";


export default function ClienteList() {
  const { clientes, 
          cargando, 
          error, 
          eliminarCliente, 
          crearCliente,
          clienteSeleccionado,
          actualizarCliente,
          obtenerClientes,
          obtenerClientesEliminados,
          setClienteSeleccionado,
          restaurarCliente
        } = useClientesApi();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarEliminados, setMostrarEliminados] = useState(false);

  return (

    <div>
      {mostrarFormulario && (
        <Modal>
          <Card>
            <CardHeader title="Agregar/Editar Cliente" />   
              <CardContent>
                  <label htmlFor="firstname">Nombre:</label>
                  <input type="text" id="firstname" name="firstname"
                  defaultValue={clienteSeleccionado ? clienteSeleccionado.firstname : ""}
                  />
                  <br />
                  <label htmlFor="lastname">Apellido:</label>
                  <input type="text" id="lastname" name="lastname"
                  defaultValue={clienteSeleccionado ? clienteSeleccionado.lastname : ""}
                  />
                  <br />  
                  <label htmlFor="dni">DNI:</label>
                  <input type="text" id="dni" name="dni" 
                  defaultValue={clienteSeleccionado ? clienteSeleccionado.dni : ""}
                  />
                  <br />
                  <label htmlFor="address">Dirección:</label>
                  <input type="text" id="address" name="address"
                  defaultValue={clienteSeleccionado ? clienteSeleccionado.address : ""}
                  />
                  <br />
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                  <Button variant="contained" onClick={async () => {
                    const nuevoCliente = {
                      firstname: (document.getElementById("firstname")).value,
                      lastname: (document.getElementById("lastname")).value,
                      dni: (document.getElementById("dni")).value,
                      address: (document.getElementById("address")).value,
                      localidadId: 1,
                    };
                    if(clienteSeleccionado) {
                    await actualizarCliente(clienteSeleccionado.id, {...nuevoCliente, id: clienteSeleccionado.id  });
                    setClienteSeleccionado(null);
                    } else {
                      await crearCliente(nuevoCliente);
                    }
                  }}>
                    Guardar
                  </Button>

                  <Button variant="outlined" onClick={() => setMostrarFormulario(false)}>
                    Cerrar
                  </Button>
                </CardActions>
              </Card>
        </Modal>
      )}
      {cargando && <CircularProgress />}
      {error && <p>Error al cargar clientes</p>}
      {!cargando && !error && (
        <ul>
          <Button variant="contained" color="primary" onClick={() => {setClienteSeleccionado(null); setMostrarFormulario(true)}}>
            Agregar Cliente
          </Button>

          <Button variant="outlined" color="secondary" onClick={async () => {
                setMostrarEliminados(!mostrarEliminados)
                if(mostrarEliminados) {
                  await obtenerClientes();
                } else {
                  await obtenerClientesEliminados();
                }
              }
          }>
          {mostrarEliminados ? "Ver Activos" : "Ver Eliminados"}
          </Button>

          {clientes.length === 0 && <p>No hay clientes disponibles</p>}
          {clientes.length > 0 && <h1>Lista de Clientes</h1>}
          {clientes.map((cliente) => (
            <li key={cliente.id}>
              <Cliente
                cliente={cliente}
                onEliminar={eliminarCliente}
                onSeleccionar={setClienteSeleccionado}
                onModificar={setMostrarFormulario}
                mostrarEliminados={mostrarEliminados}
                onRestaurar = {restaurarCliente}
              />
            </li>
          ))}
        </ul>
        
      )}
    </div>
  );
}
