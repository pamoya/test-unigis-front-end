import axios from "axios";
import swal from "sweetalert";

const baseURL = "http://localhost:49863/api/";
const baseSalePoints = "puntoventa";
const baseZonas = "zonas";

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.put['Access-Control-Allow-Origin'] = '*';

const puntosVentaServices = () => {
    const GetAll = (action) => {
        axios.get(`${baseURL}${baseSalePoints}`).then((response) => {
            if (response.data != null) {
                action(response.data);
            }
        });
    };
    const Get = (id, action) => {
        axios.get(`${baseURL}${baseSalePoints}/${id}`).then((response) => {
            if (response.data != null) {
                action(response.data);
            }
        });
    };
    const Post = (puntoVenta, action) => {
        axios.post(`${baseURL}${baseSalePoints}`, puntoVenta).then((response) => {
            if (response.data != null) {
                swal({
                    title: "Registro Exitoso",
                    text: "El registro fue guardado con exito",
                    icon: "success",
                })
                action(response.data);
            }
        }).catch((error) => {
            swal({
                title: "Error en el Registro",
                text: "Hubo un error al guardar el registro",
                icon: "error",
            })
        });
    };
    const Put = (puntoVenta, action) => {
        axios.put(`${baseURL}${baseSalePoints}`, puntoVenta).then((response) => {
            if (response.data != null) {
                swal({
                    title: "Registro Exitoso",
                    text: "El registro fue guardado con exito",
                    icon: "success",
                })
                action(response.data);
            }
        }).catch((error) => {
            swal({
                title: "Error al Actualizar",
                text: "Hubo un error al actualizar el registro",
                icon: "error",
            })
        });
    };
    const Delete = (id, action) => {
        swal({
            title: "Confirmación de Eliminación",
            text: "¿Deseas eliminar el registro definitivamente?",
            icon: "info",
            buttons:{
                cancel:"No, cancelar",
                confirm:"Si, eliminar"
            }
        }).then((result)=>{
            if(result){
                axios.delete(`${baseURL}${baseSalePoints}/${id}`).then((response) => {
                    if (response.data != null) {
                        swal({
                            title: "Eliminación Exitosa",
                            text: "El registro fue eliminado",
                            icon: "success",
                        })
                        action(response.data);
                    }
                }).catch((error)=>{
                    swal({
                        title: "Error al Eliminar",
                        text: "Hubo un error al eliminar el registro",
                        icon: "error",
                    })
                });
            }
        })
       
    };
    return {
        GetAll,
        Get,
        Post,
        Put,
        Delete,
    };
};

const zonasServices = () => {
    const GetAll = (action) => {
        axios.get(`${baseURL}${baseZonas}`).then((response) => {
            if (response.data != null) {
                action(response.data);
            }
        });
    };

    const GetSalesFromZone = (action) => {
        axios.get(`${baseURL}${baseZonas}/total`).then((response) => {
            if (response.data != null) {
                action(response.data);
            }
        });
    };
    return {
        GetAll,
        GetSalesFromZone
    }
}

export { puntosVentaServices, zonasServices };
