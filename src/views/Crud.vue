<template>
  <div class="">
    <div class="">
      <div class="">
      </div>
    </div>
    <div>    
    </div>
  
</div>
</template>
<script>
const API = process.env.VUE_APP_URL_API_PRODUCCION//constante global que  contiene la cadena de conexión al API

import { ref,inject } from 'vue'

export default {
  components: {
  },
  setup(){//Hook que se encarga de ser el constructor del componente
    const axios = inject('axios')
    const datos = ref([])
    const select = ref('')

    traerDatos()

    function traerDatos(){
      datos.value = []
      axios.get(`${API}/allTutorials`)
      .then((result) => {
        console.log(result);
        datos.value = result.data
      })
    }

    function borrarDato(id){
      axios.delete(`${API}/tutorials/${id}`)
      .then((result) => {
        console.log(result);
        traerDatos()
      })
      .catch((error) =>{
        console.log(error);
      } )
      console.log(id);
    }

  
    return { traerDatos, borrarDato,datos, select } //Regreasamos las const y las funciones que utilizamos en la vista
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
