import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import L from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Paper from "@mui/material/Paper";
import { Map } from "../Map";
import { numberToCurrency } from "../../utilities";

const icon = L.icon({
    iconRetinaUrl: iconRetina,
    iconUrl: iconMarker,
    shadowUrl: iconShadow,
});

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export const SalesPointTable = (props) => {
    const { puntosVenta, onEdit, onDelete } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Descripción</TableCell>
                        <TableCell align="center">Ubicacion</TableCell>
                        <TableCell align="right">Venta</TableCell>
                        <TableCell align="right">Zona</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {puntosVenta.length > 0 ? (
                        puntosVenta.map((punto) => (
                            <TableRow
                                key={punto.Id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {punto.Descripcion}
                                </TableCell>
                                <TableCell align="center">
                                    <Map className="map-display" data={punto} onlyPoint={true}/>
                                </TableCell>
                                <TableCell align="right">{`$ ${numberToCurrency(punto.Venta)} MXN`}</TableCell>
                                <TableCell align="right">
                                    {punto.DetalleZonas.descripcion}
                                </TableCell>
                                <TableCell align="right">
                                    <Button onClick={() => onEdit(punto)} variant="outlined">
                                        <Edit />
                                    </Button>
                                    <Button
                                        onClick={() => onDelete(punto.Id)}
                                        variant="outlined"
                                        color="error"
                                    >
                                        <Delete />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <div>No hay datos que mostrar</div>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
