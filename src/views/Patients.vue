<template>
  <div class="wrapper">
    <h1>LISTA PACJENTÓW</h1>

    <Table v-bind:data="patients" @patient="addPatient" />
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
import Table from "@/components/patients/Table.vue";
import Pagination from "@/components/Pagination.vue";
// import SearchBar from "@/components/SearchBar.vue";
import PatientService from "@/services/PatientService";
// import data from "../../public/data.json";

export default {
  name: "Patients",
  components: { Table, Pagination },
  data() {
    return {
      patients: [],
      totalPages: 5,
      currentPage: 1,
      perPage: 3,
    };
  },
  methods: {
    getData() {
      // this.patients = this.paginate(data.patients);
      PatientService.getPatients()
        .then((res) => {
          console.log(res.data);
          this.patients = this.paginate(res.data);
          this.totalPages = Math.ceil(res.data.length / this.perPage);
          // this.totalPages = Math.ceil(data.patients.length / this.perPage);
        })
        .catch((e) => console.log(e));
    },
    sortTable(list) {
      console.log(list);
      this.patients = list;
    },
    addPatient(v) {
      // this.patients.push(v);
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
    paginate(patients) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return patients.slice(from, to);
    },
    // setPages() {
    //   let numberOfPages = Math.ceil(this.patients.length / this.perPage);
    //   // for (let index = 1; index <= numberOfPages; index++) {
    //   //   this.patients.push(index);
    //   // }
    // },
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