import React, {useState, useEffect} from "react";
import { Layout } from "../../components/Layout"
import { ChartSales } from "../../components/ChartSales"
import { Map } from "../../components/Map";
import { mapOrigin, zonasValues } from "../../constants/data";

import { zonasServices, puntosVentaServices } from "../../services";

export const Dashboards = () => {
    const [dataSales, setDataSales] = useState(zonasValues)

    const [dataPoints, setDataPoints] = useState(mapOrigin)

    const parseDataSales = (data) => {
        if (data.length > 0) {
            var newData = [...data].map((register) => {
                return {
                    id: register.Zona,
                    value: register.total,
                    label: register.descripcion

                }
            })
            setDataSales(newData);
        }
    }

    useEffect(() => {
        zonasServices().GetSalesFromZone(parseDataSales);
        puntosVentaServices().GetAll(setDataPoints)

    }, [])

    return (
        <Layout>
            <ChartSales dataSales={dataSales} />
            <Map data={dataPoints} isSave={false} scroll onlyPoint={false}/>
        </Layout>
    )
}