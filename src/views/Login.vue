<template>
  <div class="container mx-auto px-0 my-20 border">
    <div class="container mx-auto px-0 pb-2 pt-4">
      <div class="flex">
        <div class=" flex-initial mt-10 mb-4 w-full ">
          <button class="rounded-lg w-32 botonIconOk" @click="traerDatos()">Refrescar</button>
        </div> 
        <div class="flex-initial mt-10 mb-4 w-full">
          <button class="rounded-lg w-32 botonIconOk" @click="traerDatos()">Agregar</button>
        </div>
      </div>
    </div>
    <div>
        <div class="responsive-table">
          <table class="tftable">
            <tr class="h-10">
              <th class="">
                <label class="rounded-full px-20 bg-gray-200 ring-2 ring-gray-300 p-2 m-2 font-bold text-black">Id</label>
              </th>
              <th class="">
                <label class="rounded-full px-20 bg-gray-200 ring-2 ring-gray-300 p-2 m-2 font-bold text-black">Titutlo</label>
              </th>
              <th class="">
                <label class="rounded-full px-20 bg-gray-200 ring-2 ring-gray-300 p-2 m-2 font-bold text-black">Descripción</label>
              </th>
              <th class="">
                <label class="rounded-full px-20 bg-gray-200 ring-2 ring-gray-300 p-2 m-2 font-bold text-black">Borrar</label>
              </th>
            </tr>
            <!--<tr v-for="(tutoriales, index) in dataTutoriales" :key="index"  class="text-black">-->
            <tr v-for="(tutoriales, index) in datos" :key="index" class="text-center">
              <!--<td :class="{'text-gray-400':!cruces.active}">{{cruces.tag}}</td>-->
              <td >{{ tutoriales.id }}</td>
              <td >{{ tutoriales.title }}</td>
              <td >{{ tutoriales.description }}</td>
              <td class="w-66">
                <div class="w-56 mx-auto">
                  <Multiselect v-model="select" placeholder="Seleccione una Acción" @close="acciones_mapper(tutoriales)"  :options="opticones_select_acciones()">
                    <template v-slot:singleLabel="{ value }">
                      <div class="multiselect-single-label">
                        <img height="26" style="margin: 0 6px 0 0;"> {{ value.name }}
                      </div>
                    </template>
                    <template v-slot:option="{ option }">
                      <img height="22" style="margin: 0 6px 0 0;">{{ option.name }}
                    </template>
                  </Multiselect>
                </div>
              </td>
            </tr>
          </table>
          <!--<button class="btn mt-12 " @click="traerDatos()">Iniciar Sesión</button>-->
        </div>
      </div>
  <Modal :show="showModalAdvertencia" @cerrarmodal="cerralmodalpadre">
    <div>
        <div class="w-full flex items-center justify-center">
          <fa icon="circle-exclamation" class="h-20 text-yellow-400"/>
          <p class="text-gray-900 font-medium text-lg ml-2 text-justify">Estas a punto de eliminar el registro {{ datoSeleccionado.id }} estas seguro</p>
        </div>
        <div class="mt-10 mb-4 w-full flex justify-center">
          <button class="rounded-lg w-32 botonIconOk" @click="borrarDato(datoSeleccionado.id)">Confirmar</button>
        </div> 
    </div>   
  </Modal>
  <Modal :show="showModalAgregar" @cerrarmodal="cerralmodalpadre">
    <div>
        <div class="w-full flex items-center justify-center">
          <fa icon="circle-exclamation" class="h-20 text-yellow-400"/>
          <p class="text-gray-900 font-medium text-lg ml-2 text-justify">Estas a punto de eliminar el registro {{ datoSeleccionado.id }} estas seguro</p>
        </div>
        <div class="mt-10 mb-4 w-full flex justify-center">
          <button class="rounded-lg w-32 botonIconOk" @click="borrarDato(datoSeleccionado.id)">Confirmar</button>
        </div> 
    </div>   
  </Modal>
<Footer  color = "red"/>
</div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION//constante global que  contiene la cadena de conexión al API
import Footer from "../components/Footer-login.vue";//Importamos el componente Footer que es exclusivo para el login
import Multiselect from '@vueform/multiselect'//Importamos el componente multiselect para la selección de modulos a asignar
import Modal from "../components/Modal.vue"
import { ref,inject } from 'vue'

export default {
  components: {
    Footer,
    Multiselect,
    Modal
  },
  setup(){//Hook que se encarga de ser el constructor del componente
    const axios = inject('axios')
    const datos = ref([])
    const select = ref('')
    const datoSeleccionado = ref({})
    const showModalAdvertencia = ref(false)
    const showModalAgregar = ref(false)
    const cerralmodalpadre = (modal) => { //Se abre la funcion con un parametro que recibimos desde el modal
      showModalAdvertencia.value = modal //Recibimos el valor de la varible y la asignamos al padre para que cerrar el modal
    }
    traerDatos()

    function traerDatos(){
      datos.value = []
      axios.get(`${API}/tutorials`)
      .then((result) => {
        datos.value = result.data
      })
    }

    function borrarDato(id){
      axios.delete(`${API}/tutorials/${id}`)
      .then((result) => {
        console.log(result);
        showModalAdvertencia.value = false
        traerDatos()
      })
      .catch((error) =>{
        console.log(error);
      } )
      console.log(id);
    }

    function opticones_select_acciones(){//Lista de opciones que se muestran en el menú de acciones
      let filtroOpciones = [] //Declaramos el arreglo de que contendran las opciones
      let options = [ //Declaramos el arreglo que contiene las acciones posibles 
          {  value: '0', name: 'Borrar'},//0
          
      ]
      filtroOpciones.push(options[0])
      
      return filtroOpciones  //Regresamos la lista de acciones filtrada
    }

    function acciones_mapper(item){//Asignación de funciones de la lista de opciones que hay en el menú de acciones
      if(select.value == '0'){ //Apartir del value del multiselect asignamos un valor al texto 
        console.log(item.id);
        datoSeleccionado.value = item
        showModalAdvertencia.value = !showModalAdvertencia.value //Abrimos nuestro modal de advertencia
      }if(select.value == '1'){
        console.log(item,1);
        showModalAdvertencia.value = !showModalAdvertencia.value //Abrimos nuestro modal de advertencia
      }
      select.value = ""//Limpiamos el multiselect
    }

    return { traerDatos, borrarDato, opticones_select_acciones, acciones_mapper, cerralmodalpadre, datos, select, datoSeleccionado, showModalAdvertencia, showModalAgregar } //Regreasamos las const y las funciones que utilizamos en la vista
  }
};
</script>
<style scoped>
.figura {
  
  width: 79vh;
  height: 100vh;
  /* margin-left: 795px; */
  background-image: radial-gradient(ellipse farthest-corner at 45px 30px , rgba(255, 255, 255, 0) 69%, rgba(44, 82, 130, 1) 0%);
  
}
@media (max-width:1024px){
  #min-figura{
    display: none;
  }
}
.modal-container{
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.5);
}
.error{
  background-color: #f5b7b1;
  padding: 5px;
  border-radius: 5px;
  margin-bottom: 10px;
  color:  #c0392b ;
}
.min-700 {
  min-height: 700px;
}

.min-700-imp {
  min-height: 700px !important;
}

#login-title {
  text-align: center;
  font-size: 28px;
}

@media (max-width:1024px) {
  #login-title {
    text-align: center;
    font-size: 23px;
  }
  #min-figura{
    visibility: hidden;
  }
}
#login-form {
  background-color: #ddd8d8;
}

.bg-login-module {
  background-color: white;
  padding: 100px 50px;
  border-radius: 10px;
  
}

.input-container {
  display: -ms-flexbox;
  /* IE10 */
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon {
  padding-right: 5px;
  color: blue;
  min-width: 50px;
  text-align: center;
}

.input-field {
  width: 100%;
  padding: 10px;
  outline: none;
  border-bottom: 1px solid black;
  border-radius: 5px;
}

/* Set a style for the submit button */
.btn {
  background-color: #BB2028;
  color: white;
  padding: 4px;
  border: none;
  cursor: pointer;
  width: 50%;
  opacity: 0.9;
  border-radius: 10px;
}

.btn:focus {
  outline: 0;
}

.btn:hover {
  opacity: 1;
}

.img-centered {
  display: block;
  margin: auto;
  width: 130px;
  transform: translateY(50px);
}

@media (max-width:1024px) {
  .img-centered {
    display: block;
    margin: auto;
    width: 110px;
    transform: translateY(50px);
  }
}
</style>
