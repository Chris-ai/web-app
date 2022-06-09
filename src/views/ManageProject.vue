<template>
  <div class="wrapper">
    <h1>{{ project.body }}</h1>

    <Table v-bind:projectId="id" v-bind:data="patients" @patient="addPatient" />
    <Pagination
      v-bind:totalPages="totalPages"
      v-bind:currentPage="currentPage"
      v-bind:perPage="perPage"
      @perPage="updatePerPage"
      @currentPage="updateCurrentPage"
    />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import ProjectService from "@/services/ProjectService";
// import PatientService from "@/services/PatientService";
import Pagination from "@/components/Pagination.vue";

export default {
  name: "Patients",
  components: { Table, Pagination },
  data() {
    return {
      id: this.$route.params.id,
      project: {},
      totalPages: 5,
      currentPage: 1,
      perPage: 3,
      patients: [],
    };
  },
  methods: {
    getData() {
      ProjectService.getProjectById(this.id)
        .then((res) => {
          console.log("projekt: ", res.data);
          this.project = res.data;
          this.patients = this.paginate(res.data.patients);
          this.totalPages = Math.ceil(res.data.patients.length / this.perPage);
        })
        .catch((e) => console.log(e));
    },
    addPatient(v) {
      console.log("Nowy pacjent:", v);
      this.getData();
    },
    updatePerPage(variable) {
      console.log("xs");
      this.perPage = variable;
      this.getData();
    },
    updateCurrentPage(variable) {
      this.currentPage = variable;
      console.log(this.currentPage, this.totalPages);
      this.getData();
    },
    paginate(projects) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return projects.slice(from, to);
    },
  },
  created() {
    this.getData();
  },
};
</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>