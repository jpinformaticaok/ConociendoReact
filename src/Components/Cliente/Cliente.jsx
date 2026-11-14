import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Card, CardHeader, CardContent, CardActions } from "@mui/material";


export default function Cliente({cliente, 
                                 onEliminar,
                                 onSeleccionar,
                                 onModificar,
                                 mostrarEliminados,
                                 onRestaurar
                                }) {
    const SwalWithReact = withReactContent(Swal);
    const configuracionVentana = {
        title: "¿Estás seguro?",
        text: "No podrás revertir esto",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    };
    const onClickEliminarAdvertencia = (id) => {
        SwalWithReact.fire(configuracionVentana).then((result) => {
            if (result.isConfirmed) {
                onEliminar(id);
                SwalWithReact.fire(
                    "Eliminado",
                    "El cliente ha sido eliminado",
                    "success"
                );
            }
        });
    };
    return (

<Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardHeader title={`${cliente.firstname} ${cliente.lastname}`} />
      <CardContent>
        <p>DNI: {cliente.dni}</p>
        <p>Dirección: {cliente.address}</p>
      </CardContent>
      <CardActions>
        {mostrarEliminados ? (
          <Button variant="contained" color="primary" onClick={() => onRestaurar(cliente.id)}>
            Restaurar Cliente
          </Button>
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={() => {
              onSeleccionar(cliente);
              onModificar(true);
            }}>
              Modificar Cliente
            </Button>

            <Button variant="contained" color="error" onClick={() => onEliminarAdvertencia(cliente.id)}>
              Eliminar Cliente
            </Button>
          </>
        )}
      </CardActions>
    </Card>
    );
}