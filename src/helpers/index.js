export const formatearCantidad = (cantidad) =>{
    return Number(cantidad).toLocaleString('es-AR',{
        style: 'currency',
        currency: 'ARS'
    })
}
export const generarId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
export const formatearFecha = (fecha) => {
    const fechaNueva = new Date(fecha);
    const opciones = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    };
    return fechaNueva.toLocaleDateString('es-Es', opciones);
}
export const categorias = [
    {
        id: 'ahorro',
        nombre: 'Ahorro'
    },
    {
        id: 'comida',
        nombre: 'Comida'
    },
    {
        id: 'casa',
        nombre: 'Casa'
    },
    {
        id: 'gastosVarios',
        nombre: 'Gastos Varios'
    },
    {
        id: 'ocio',
        nombre: 'Ocio'
    },
    {
        id: 'salud',
        nombre: 'Salud'
    },
    {
        id: 'suscripciones',
        nombre: 'Suscripciones'
    },
];