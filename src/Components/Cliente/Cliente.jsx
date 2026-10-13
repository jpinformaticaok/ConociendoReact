import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Card, CardHeader, CardContent, CardActions } from "@mui/material";


export default function Cliente({firstname, lastname, dni, address, id, onEliminar}) {
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
      <CardHeader title={`${firstname} ${lastname}`} />
      <CardContent>
        <p>DNI: {dni}</p>
        <p>Dirección: {address}</p>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="error" onClick={() => onClickEliminarAdvertencia(id)}>
          Eliminar Cliente
        </Button>
      </CardActions>
    </Card>
    );
}