const formatValueToMoney = (valor) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(valor);
}

export { formatValueToMoney };