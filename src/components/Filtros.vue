<script setup>

import { categorias } from "../helpers";
defineEmits(['filter'])
</script>

<template>
  <div class="filtros sombra contenedor">
    <label> Filtrar Gastos</label>
    <select name="" id="filtro" :value="categoria" @input="$event => $emit('filter', $event.target.value)">
        <option value="">Sin filtro</option>
        <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{categoria.nombre}}</option>                    
    </select>
  </div>
</template>
<style lang="scss" scoped>
    .filtros{
        display: flex;
        align-items: center;
        gap: 3rem;
        padding: 3rem;
        label{
            color: var(--azul);
            font-weight: 700;
        }
        select{
            background-color: var(--gris-claro);
            border-radius: 1rem;
            padding: 0.5rem;
            border: none;
            font-size: 1.8rem;
            
        }
    }
</style>