<script setup>
import { computed } from 'vue';
import CircleProgress from 'vue3-circle-progress';
import 'vue3-circle-progress/dist/circle-progress.css';
import { formatearCantidad } from "../helpers";
const props = defineProps({
    presupuesto:{
        type: Number,
        required: true
    },
    disponible:{
        type: Number,
        required: true
    },
    gastado:{
        type: Number,
        required: true
    }
});
defineEmits(['reset-app']);
const porcentaje = computed(()=>{
   return parseInt( ((props.presupuesto - props.disponible) / props.presupuesto) * 100);
})
</script>

<template>
  <div class="dos-columnas">
    <div class="grafico">
        <p>{{porcentaje}}%</p>
        <CircleProgress 
            class="progress"
            :percent="porcentaje"
            :size="250"
            :border-width="20"
            :border-bg-width="20"
            fill-color="#3b82f6"
            empty-color="#e1e1e1"
        />
    </div>
    <div class="presupuesto">
        <button class="reset-up" @click="$emit('reset-app')">
            Resetear App
        </button>
        <p>
            <span>Presupuesto:</span>
            {{formatearCantidad(presupuesto)}}
        </p>
        <p>
            <span>Disponible:</span>
            {{formatearCantidad(disponible)}}
        </p>
        <p>
            <span>Gastado:</span>
            {{formatearCantidad( gastado) }}
        </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
    .grafico{
        position: relative;
        p{
            position: absolute;
            margin: auto;
            top: calc(50% - 1.5rem);
            left: 0;
            right: 0;
            text-align: center;
            z-index: 100;
            color: var(--gris-oscuro);
            font-size: 3rem;
            font-weight: 700;
        }
        .progress{
            margin: 0 auto;
        }
    }
    .dos-columnas{
        display: flex;
        flex-direction: column;
        .reset-up{
            margin-top: 4rem;
            background-color: #DB2777;
            border: none;
            padding: 1rem;
            width: 100%;
            color: var(--blanco);
            text-transform: uppercase;
            font-weight: 700;
            border-radius: 1rem;
            transition-property: background-color;
            transition-duration: 300ms;
            &:hover{
                cursor: pointer;
                background-color: #b7155e;
            }
        }
        .presupuesto{
            width: 100%;
            p{
                font-size: 2.4rem;
                text-align: center;
                color: var(--gris-oscuro);
                span{
                    font-weight: 900;
                    color: var(--azul);
                }
            }
        }
    }
    @media (min-width: 768px) {
        .dos-columnas{
            flex-direction: row;
            gap: 4rem;
            align-items: center;
            .reset-up{
                margin-top: 0;
            }
            .presupuesto{
                p{
                    text-align: center;
                }
            }
        }
    }
</style>