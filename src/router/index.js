import { createRouter, createWebHistory } from "vue-router";
//import axios from "axios";
import Crud from "@/views/Crud.vue";

const routes = [{
    path: "/",
    name: "Crud",
    component: Crud,
    meta: {
      requiresCookie: false
    },
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});



export default router;