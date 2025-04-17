import * as React from "react";
import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { FloatingAddButton } from "../../components/FloatingAddButton";
import { SalesPointTable } from "../../components/SalesPointTable";
import { ModalForm } from "../../components/ModalForm";

import "leaflet/dist/leaflet.css";

import { puntosVentaServices, zonasServices } from "../../services";

export const PuntosVenta = () => {
    const [puntosVenta, setPuntosVenta] = useState([]);
    const [puntoVentaData, setPuntoVentaData] = useState({})
    const [zonas, setZonas] = useState([]);
    const [open, setOpen] = useState(false);
    const [isNew, setIsNew] = useState(true);


    useEffect(() => {
        puntosVentaServices().GetAll(setPuntosVenta);
        zonasServices().GetAll(setZonas);
    }, []);

    const onNew = () => {
        setIsNew(true)
        setOpen(true)
    }

    const onEdit = (punto) => {
        setIsNew(false)
        setOpen(true)
        setPuntoVentaData(punto)
    }

    const onDelete = (id) => {
        puntosVentaServices().Delete(id,reloadAndClose)
        reloadAndClose();
    }

    const handleOnClose = () => {
        setOpen(false)
    }

    const reloadAndClose=()=>{
        puntosVentaServices().GetAll(setPuntosVenta);
        handleOnClose()
    }

    return (
        <Layout>
            <SalesPointTable puntosVenta={puntosVenta} onEdit={onEdit} onDelete={onDelete} />
            <FloatingAddButton onNew={onNew} />
            <ModalForm open={open} handleOnClose={handleOnClose} isNew={isNew} onlyPoint data={puntoVentaData} reloadAndClose={reloadAndClose}/>
        </Layout>
    );
};
