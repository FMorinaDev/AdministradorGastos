<script setup>
import { ref } from "vue";
import Alerta from "./Alerta.vue";
const presupuesto = ref(0);
const error = ref('');
const definirPresupuesto = () =>{
    if (presupuesto.value <= 0 || presupuesto.value === '') {
        error.value = 'Presupuesto no valido';
        setTimeout(() => {
            error.value = '';
        }, 1500);
        return;
    }
    emit('definir-presupuesto',presupuesto.value);
}
const emit = defineEmits(['definir-presupuesto'])
</script>

<template>
    <form class="presupuesto"
        @submit.prevent="definirPresupuesto"
    >
     <Alerta v-if="error">
        {{error}}
     </Alerta>
        <div class="campo">
            <label for="">Definir presupuesto</label>
            <input 
                type="number" 
                id="nuevo-presupuesto"
                class="nuevo-presupuesto" 
                placeholder="Añade tu presupuesto"
                v-model="presupuesto"
            >
        </div>
        <input type="submit" value="Definir Presupuesto">
    </form>
</template>
<style lang="scss" scoped>
    .presupuesto{
        width: 100%;
        .campo{
            display: grid;
            gap: 2rem;
            label{
                font-size: 2.3rem;
                font-weight: 600;
                text-align: center;
                color: var(--azul);
            }
        }
        
    }
    .presupuesto input[type='number']{
        background-color: var(--gris-claro);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }
    .presupuesto input[type='submit']{
        background-color: var(--azul);
        border: none;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        margin-top: 2rem;
        color: var(--blanco);
        width: 100%;
        font-weight: 900;
        transition: background-color 300ms ease;
        &:hover{
            background-color: #1048A4;
            cursor: pointer;
        }
    }
</style>