<template>
<div class="login ">
  <!-- <Header/> -->
  <div class="flex ">
    <div id="" class="flex absolute justify-center items-center mx-auto h-12 w-screen min-700-imp -my-32 2xl:-my-0">
      <div class="absolute justify-end">
        <div class="responsive-table overflow-auto">
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
              <td ><button class="btn mt-1">Borrar</button></td>
            </tr>
          </table>
          <!--<button class="btn mt-12 " @click="traerDatos()">Iniciar Sesión</button>-->
        </div>
      </div>
    </div>
  </div>
<Footer  color = "red"/>
</div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION//constante global que  contiene la cadena de conexión al API
import Footer from "../components/Footer-login.vue";//Importamos el componente Footer que es exclusivo para el login
import { ref,inject } from 'vue'

export default {
  components: {
    Footer,
  },
  setup(){//Hook que se encarga de ser el constructor del componente
    const axios = inject('axios')
    const datos = ref([])
    traerDatos()
    
    function traerDatos(){
      axios.get(`${API}/tutorials`)
      .then((result) => {
        datos.value = result.data
        console.log(datos.value.length );
      })
    }
    return { traerDatos, datos} //Regreasamos las const y las funciones que utilizamos en la vista
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
