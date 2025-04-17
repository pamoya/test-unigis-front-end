const mapOrigin = [
    {
        Latitud: 19.553248112514893,
        Longitud: -99.27273928650774,
        Id: 0,
        Descripcion: "Oficinas",
        Zona: 5,
        Venta: 20000.00,
        DetalleZonas: {
            id: 5,
            descripcion: "Zona Centro"
        }

    }
]

const zonasValues = [
    { id: 1, value: 1, label: "Zona Norte" },
    { id: 2, value: 2, label: "Zona Sur" },
    { id: 3, value: 3, label: "Zona Este" },
    { id: 4, value: 4, label: "Zona Oeste" },
    { id: 5, value: 5, label: "Zona Centro" },
]

const formInitialValues = {
    id:"",
    descripcion: "",
    latitud: "",
    longitud: "",
    venta: "",
    zona: "",
}


export {
    mapOrigin,
    zonasValues,
    formInitialValues
}

