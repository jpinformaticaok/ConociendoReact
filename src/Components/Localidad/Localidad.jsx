import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Button, Card, CardHeader, CardContent, CardActions } from "@mui/material";


export default function Localidad({name, id, onEliminar}) {
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
                    "La localidad ha sido eliminada",
                    "success"
                );
            }
        });
    };
    return (

<Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardHeader title={name} />
      <CardContent>
        <p>ID: {id}</p>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="error" onClick={() => onClickEliminarAdvertencia(id)}>
          Eliminar Localidad
        </Button>
      </CardActions>
    </Card>
    );
}