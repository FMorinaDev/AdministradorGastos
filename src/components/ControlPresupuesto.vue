<script setup>
import imagen from "../assets/img/grafico.jpg";
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
})
</script>

<template>
  <div class="dos-columnas">
    <div class="grafico">
        <img :src="imagen" alt="">
    </div>
    <div class="presupuesto">
        <button class="reset-up">
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