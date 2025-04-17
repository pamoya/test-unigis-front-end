const numberToCurrency = (data) => {
    var newData = Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(data);
    return newData
}

export {
    numberToCurrency
}