<template>
  <div class="wrap">
    <Card v-bind:count="patientsCount" message="Ilość pacjentów" />
    <Card v-bind:count="projectsCount" message="Ilość projektów" />
    <Card v-bind:count="researchCount" message="Ilość badań" />
    <Card v-bind:count="zleceniaCount" message="Ilość zleceń" />
  </div>
</template>

<script>
import PatientService from "@/services/PatientService";
import ProjectService from "@/services/ProjectService";
import ResearchService from "@/services/ResearchService";
import ZleceniaService from "@/services/ZleceniaService";
import Card from "@/components/Card";
export default {
  name: "Home",
  components: { Card },
  data() {
    return {
      patientsCount: 0,
      projectsCount: 0,
      researchCount: 0,
      zleceniaCount: 0,
    };
  },
  created() {
    PatientService.getPatients()
      .then((res) => (this.patientsCount = res.data.length))
      .catch((e) => console.log(e));
    ProjectService.getProjects()
      .then((res) => (this.projectsCount = res.data.length))
      .catch((e) => console.log(e));
    ResearchService.get()
      .then((res) => (this.researchCount = res.data.length))
      .catch((e) => console.log(e));
    ZleceniaService.get()
      .then((res) => (this.zleceniaCount = res.data.length))
      .catch((e) => console.log(e));
  },
};
</script>

<style lang='scss' scoped>
.wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
}
</style>