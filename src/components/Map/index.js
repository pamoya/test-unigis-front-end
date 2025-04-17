import React, { useEffect, useState } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents
} from "react-leaflet";
import L from "leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon-2x.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography } from "@mui/material";
import { mapOrigin } from "../../constants/data";
import { numberToCurrency } from "../../utilities";



import "leaflet/dist/leaflet.css";

export const Map = (props) => {
    const { data, isSave, setLatitud, setLongitud, scroll, className, spacing = 8, size = 8, onlyPoint = false, isNew = false } = props;
    const [dataPoints, setDataPoints] = useState(mapOrigin)
    const [latitude, setLocalLatitude] = useState(19.553248112514893)
    const [longitude, setLocalLongitude] = useState(-99.27273928650774)

    useEffect(()=>{
        if(data && onlyPoint){
            setDataPoints([])
            return
        }
        if(isNew){
            setDataPoints([])
            return
        }
    },[])

    useEffect(() => {
        if (data && onlyPoint) {
            setLocalLatitude(data.Latitud)
            setLocalLongitude(data.Longitud)
            return
        }
        if (data && !onlyPoint) {
            setDataPoints(data);
            return
        }
        if(!data && isNew){
            setDataPoints([])
            return
        }
    }, [data])

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

    const MyComponent = ({ saveMarkers }) => {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                L.marker([lat, lng], { icon }).addTo(map);
                saveMarkers([lat, lng]);
            }
        });
        return null;
    }

    const saveMarkers = (newMarkerCoords) => {
        if (newMarkerCoords != null) {
            const [latitud, longitud] = newMarkerCoords;
            setLatitud(latitud)
            setLongitud(longitud)
            return
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid spacing={spacing} class={className}>
                    <Item size={size}>
                        <MapContainer
                            center={onlyPoint && !isNew ? [data.Latitud, data.Longitud] : [19.553248112514893, -99.27273928650774]}
                            zoom={13}
                            scrollWheelZoom={scroll}
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {isSave && <MyComponent saveMarkers={saveMarkers} />}
                            {!isNew && dataPoints.length > 1 && dataPoints.map((point) => {
                                return (
                                    <Marker
                                        position={[point.Latitud, point.Longitud]}
                                        icon={icon}
                                    >
                                        <Popup>
                                            <Card sx={{ minWidth: 275 }}>
                                                <CardContent>
                                                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                        ID: {point.Id}
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        {point.Descripcion}
                                                    </Typography>
                                                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Zona: {point.DetalleZonas.descripcion}</Typography>
                                                    <Typography variant="body2">
                                                        Total de Ventas:
                                                        <br />
                                                        {`$ ${point.Venta} MXN`}
                                                    </Typography>
                                                </CardContent>
                                            </Card>

                                        </Popup>
                                    </Marker>
                                )
                            }

                            )}
                            {onlyPoint && !isNew && <Marker
                                position={[data.Latitud, data.Longitud]}
                                icon={icon}
                            >
                                <Popup>
                                    <Card sx={{ minWidth: 275 }}>
                                        <CardContent>
                                            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                                ID: {data.Id}
                                            </Typography>
                                            <Typography variant="h5" component="div">
                                                {data.Descripcion}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Zona: Centro</Typography>
                                            <Typography variant="body2">
                                                Total de Ventas:
                                                <br />
                                                {`${numberToCurrency(data.Venta)} MXN`}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Popup>
                            </Marker>}

                        </MapContainer>
                    </Item>
                </Grid>

            </Grid>
        </Box>
    );
};
