import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Patients from '../views/Patients.vue';
import Projects from '../views/Projects.vue';
import Research from '../views/Research.vue'
import Zlecenia from '../views/Zlecenia.vue'
import ManageProjects from '../views/ManageProject.vue'

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/patients",
    name: "Patients",
    component: Patients
  },
  {
    path: "/projects",
    name: "Projects",
    component: Projects
  },
  {
    path: "/research",
    name: "Research",
    component: Research
  },
  {
    path: "/zlecenia",
    name: "Zlecenia",
    component: Zlecenia
  },
  {
    path: "/manage",
    name: "ManageProject",
    component: ManageProjects,
    props: true
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "activeLink"
});

export default router;