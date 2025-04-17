import React, { useEffect, useState, useRef } from "react";

import {
    Grid,
    Card,
    CardContent,
    MenuItem,
    InputLabel,
    Select,
    CardActions,
    Button,
    CardHeader,
    FormControl,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Formik, Form, Field, useFormikContext } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";
import { Map } from "../Map";
import { formInitialValues, zonasValues } from "../../constants/data";
import { puntosVentaServices } from "../../services";

const useStyle = makeStyles((theme) => ({}));

let validationSchema = Yup.object().shape({
    descripcion: Yup.string().required("Required"),
    latitud: Yup.string(),
    longitud: Yup.string(),
    venta: Yup.string().required("Required"),
    zona: Yup.string().required("Required"),
});

export const RegisterForm = (props) => {
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);
    const [initialValues, setInitialValues] = useState(formInitialValues);
    const { isNew, data, reloadAndClose, onlyPoint } = props;
    const classes = useStyle();

    const closeAll = (reset) => {
        reloadAndClose();
        reset()
    };

    const onSubmit = (values, { resetForm }) => {
        values.latitud = latitud;
        values.longitud = longitud;
        values.detalleZonas = data.DetalleZonas;
        const action = () => closeAll(resetForm);

        if (isNew) {
            values.id = 0;
            puntosVentaServices().Post(values, action);
            return;
        }
        puntosVentaServices().Put(values, action);
    };

    const formikRef = useRef();

    useEffect(() => {
        if (formikRef.current) {
            formikRef.current.setFieldValue("id", data.Id);
            formikRef.current.setFieldValue("descripcion", data.Descripcion);
            formikRef.current.setFieldValue("latitud", data.Latitud);
            formikRef.current.setFieldValue("longitud", data.Longitud);
            formikRef.current.setFieldValue("venta", data.Venta);
            formikRef.current.setFieldValue("zona", data.Zona);
            setLatitud(data.Latitud);
            setLongitud(data.Longitud);
        }
    }, [formikRef]);

    useEffect(() => {
        if (isNew) {
            formikRef.current.resetForm();
        }
    }, [isNew])

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item md={6}>
                <Card className={classes.padding}>
                    <CardHeader title="Ingresa los datos"></CardHeader>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                        innerRef={formikRef}
                    >
                        {({ dirty, isValid, values, handleChange, handleBlur }) => {
                            return (
                                <Form>
                                    <Field
                                        name="id"
                                        value={values.id}
                                        type="number"
                                        variant="hidden"
                                        className="hidden"
                                    />
                                    <CardContent>
                                        <Grid item container spacing={2} justify="center">
                                            <Grid item lg={12} className="row-extended">
                                                <Field
                                                    label="Descripción"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="descripcion"
                                                    value={values.descripcion}
                                                    component={TextField}
                                                    className="form-point-container"
                                                />
                                            </Grid>

                                            <Grid item lg={12} className="row-extended">
                                                <Field
                                                    label="Venta"
                                                    variant="outlined"
                                                    fullWidth
                                                    name="venta"
                                                    value={values.venta}
                                                    component={TextField}
                                                    type="number"
                                                    className="form-point-container"
                                                />
                                            </Grid>
                                            <Grid item lg={12} className="row-extended">
                                                <FormControl fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        Zona
                                                    </InputLabel>
                                                    <Select
                                                        className="selector-form"
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Zona"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.zona}
                                                        name="zona"
                                                    >
                                                        {zonasValues.map((item) => (
                                                            <MenuItem key={item.value} value={item.value}>
                                                                {item.label}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item lg={12} className="row-extended">
                                                <Map
                                                    setLatitud={setLatitud}
                                                    setLongitud={setLongitud}
                                                    className="map-form"
                                                    isSave
                                                    isNew={isNew}
                                                    scroll
                                                    onlyPoint={onlyPoint}
                                                    data={isNew ? null : data}
                                                />
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            disabled={!dirty || !isValid}
                                            variant="contained"
                                            color="primary"
                                            type="Submit"
                                            className={classes.button}
                                        >
                                            {isNew ? "Registrar" : "Modificar"}
                                        </Button>
                                    </CardActions>
                                </Form>
                            );
                        }}
                    </Formik>
                </Card>
            </Grid>
        </Grid>
    );
};
