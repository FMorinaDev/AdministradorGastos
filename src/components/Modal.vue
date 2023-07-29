<script setup>
import { ref } from "vue";
import cerrarModal from '../assets/img/cerrar.svg'; 
import Alerta from "./Alerta.vue";
const error = ref('');
const emit = defineEmits(['ocultar-modal','update:nombre','update:cantidad','update:categoria','guardar-gasto']);
const categorias = [
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
        id: 'subscriopciones',
        nombre: 'Subscriopciones'
    },
];
const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
})
const showAlerta = (mensaje) => {
    error.value = mensaje;
    setTimeout(() => {
        error.value = '';
    }, 1500);
}

const agregarGasto = () => {
    const { cantidad, categoria, nombre } = props;
    if([nombre, cantidad, categoria].includes('')){
        showAlerta('Todos los campos son obligatorios');
        return;
    }
    if(cantidad <= 0){
        showAlerta('Cantidad no valida');
        return;
    }
    emit('guardar-gasto');
}
</script>

<template>
  <div class="modal">
    <div class="cerra-modal">
        <img :src="cerrarModal" alt="cerrar Modal" @click="$emit('ocultar-modal')">
    </div>
    <div class="contenedor formulario" :class="modal.animar? 'animar' : ''">
        <form class="nuevo-gasto">
            <legend>Añadir Gasto</legend>
            <Alerta v-if="error">
                {{ error }}
            </Alerta>
            <div class="campo">
                <label for="nombre">Nombre Gasto:</label>
                <input type="text" id="nombre" placeholder="Añade el nombre del gasto" :value="nombre" @input="$event => $emit('update:nombre', $event.target.value)">
            </div>
            <div class="campo">
                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" placeholder="Añade la cantidad del gasto, ej: 300" :value="cantidad" @input="$event => $emit('update:cantidad', +$event.target.value)">
            </div>
            <div class="campo">
                <label for="categoria">Categoria:</label>
                <select name="" id="categoria" :value="categoria" @input="$event => $emit('update:categoria', $event.target.value)">
                    <option value="">-- Seleccione --</option>
                    <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{categoria.nombre}}</option>                    
                </select>
            </div>
            <input type="submit" id="submit" value="Añadir gasto" @click.prevent="agregarGasto">
        </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
    .modal{
        position: absolute;
        background-color: rgb( 0 0 0 / 0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        .cerra-modal{
            position: absolute;
            right: 3rem;
            top: 3rem;
            img{
                width: 3rem;
                cursor: pointer;
            }   
        }
    }
    .contenedor.formulario{
        transition-property: all;
        transition-duration: 300ms;
        transition-timing-function: ease-in;
        opacity: 0;
        &.animar{
            opacity: 1;
        }
    }
    .nuevo-gasto{
        margin: 10rem auto 0 auto;
        display: grid;
        gap: 2rem;
        legend{
            text-align: center;
            color: var(--blanco);
        }
        .campo{
            display: grid;
            gap: 0.5rem;
        }
        input,
        select{
            background-color: var(--gris-claro);
            border-radius: 1rem;
            padding: 1rem;
            border: none;
            font-size: 1.8rem;
        }
        label{
            color: var(--blanco);
            font-size: 1.8rem;
        }
        #submit{
            background-color: var(--azul);
            color: var(--blanco);
            font-weight: 700;
            cursor: pointer;
        }
    }
</style>