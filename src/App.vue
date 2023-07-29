<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Presupuesto from "./components/Presupuesto.vue";
import ControlPresupuesto from "./components/ControlPresupuesto.vue";
import Gasto from "./components/Gasto.vue";
import Modal from "./components/Modal.vue";
import Filtros from "./components/Filtros.vue";
import iconoNuevoGasto from "./assets/img/nuevo-gasto.svg";
import { generarId } from "./helpers";
const presupuesto = ref(0);
const disponible = ref(0);
const gastado = ref(0);
const gastos = ref([]);
const filtroCategoria = ref('');

watch(gastos, ()=>{
  const totalGastado = gastos.value.reduce((total, gasto)=> gasto.cantidad + total, 0);
  gastado.value = totalGastado;
  disponible.value = presupuesto.value - totalGastado;
}, {deep:true})

const modal = reactive({
  mostrar: false,
  animar: false
})
const gasto = reactive({
  nombre: '',
  cantidad: '',
  categoria: '',
  id: null,
  fecha: Date.now()
})
const setLocal = () => {
  localStorage.setItem('gastos', JSON.stringify(gastos.value))
  localStorage.setItem('presupuesto', JSON.stringify(presupuesto.value))
}
const getLocal = () =>{
  const gastosLocal = localStorage.getItem('gastos');
  const presupuestoLocal = localStorage.getItem('presupuesto');
  if (gastosLocal) {
    gastos.value = JSON.parse(gastosLocal);
  }
  if (presupuestoLocal) {
    presupuesto.value = JSON.parse(presupuestoLocal);
  }
}
onMounted(()=>{
  getLocal();
})
const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300);
}
const ocultarModal = () => {
  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 300);
  resetGasto();
}
const definirPresupuesto = (cantidad) => {
  presupuesto.value = cantidad;
  disponible.value = cantidad;
}
const resetGasto = () =>{
  Object.assign(gasto, {
    nombre: '',
    cantidad: '',
    categoria: '',
    id: null
  })
}
const guardarGasto = () => {
  if (gasto.id != null) {
    const index = gastos.value.findIndex((item) => item.id == gasto.id);
    gastos.value[index] = {...gasto};
  }else{
    gastos.value.push({
      ...gasto,
      id: generarId()
    });
  }
  resetGasto();
  ocultarModal();
  setLocal();
}
const seleccionarGasto = (id) => {
  Object.assign(gasto ,gastos.value.find((item) => item.id == id));
  mostrarModal();
}
const resetApp = () =>{
  filtrarGastos.value = '';
  gastos.value = [];
  presupuesto.value = 0;
  disponible.value = 0;
  gastado.value = 0;
  setLocal();
}
const eliminarGasto = () =>{
  gastos.value = gastos.value.filter((item) => item.id != id);
  setLocal();
}
const filtrarGastos = (categoria) => {
  filtroCategoria.value = categoria;
}
const gastosFiltrados = computed(()=>{
  if (filtroCategoria.value) {
    return gastos.value.filter((item) => item.categoria == filtroCategoria.value);
  }
  return gastos.value
})
</script>

<template>
  <div :class="{fijar: modal.mostrar}">
    <header>
      <h1>Planificador de Gastos</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto
          v-if="presupuesto === 0"
          @definir-presupuesto="definirPresupuesto"
        />
        <ControlPresupuesto v-else
          :presupuesto="presupuesto"
          :disponible="disponible"
          :gastado="gastado"
          @reset-app="resetApp"
        />
      </div>
    </header>
    <main v-if="presupuesto > 0">
      <Filtros v-if="gastos.length > 0"  @filter="filtrarGastos"></Filtros>
      <div class="contenedor lista-gastos">
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hay gastos'}}</h2>
        <Gasto
          v-for="gasto in gastosFiltrados" :key="gasto.id"
          :gasto="gasto"
          @seleccionar-gasto="seleccionarGasto"
        />
      </div>

      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" alt="icono nuevo gasto"
        @click="mostrarModal">
      </div>
      <Modal v-if="modal.mostrar"
        v-model:nombre="gasto.nombre"
        v-model:categoria="gasto.categoria"
        v-model:cantidad="gasto.cantidad"
        :modal="modal"
        :disponible="disponible"
        :id="gasto.id"
        @ocultar-modal="ocultarModal"
        @guardar-gasto="guardarGasto"
        @eliminar-gasto="eliminarGasto"
      />
    </main>
  </div>
</template>

<style lang="scss">
  :root{
    --azul: #3b82f6;
    --blanco: #fff;
    --gris-claro: #f5f5f5;
    --gris: #94a3b8;
    --gris-oscuro: #64748b;
    --negro: #000;
  }
  html{
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after{
    box-sizing: inherit;
  }
  body{
    font-size: 1.6rem;
    font-family: 'lato', sans-serif;
    background-color: var(--gris-claro);
  }
  h1{
    font-size: 4rem;
  }
  h2{
    font-size: 3rem;
  }
  .fijar{
    overflow: hidden;
    height: 100vh;
  }
  header{
    background-color: var(--azul);
  }
  header h1{
    padding: 3rem 0;
    margin: 0;
    color: var(--blanco);
    text-align: center;
  }
  .contenedor{
    width: 90%;
    max-width: 80rem;
    margin: 0 auto;
  }
  .contenedor-header{
    margin-top: -5rem;
    transform: translateY(5rem);
    padding: 5rem;
  }
  .sombra{
    box-shadow: 0px 10px 15px -3px rgba(0,0,0,0.1);
    background-color: var(--blanco);
    border-radius: 1.5rem;
    padding: 5rem;
  }
  .crear-gasto{
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    img{
      width: 5rem;
      &:hover{
        cursor: pointer;
      }
    }
  }
  main{
    margin-top: 8rem;
  }
  .lista-gastos{
    margin-top: 2rem;
    h2{
      color: var(--gris-oscuro);
      text-align: center;
    }
  }
</style>
