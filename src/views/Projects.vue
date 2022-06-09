<template>
  <div class="wrapper">
    <h1>LISTA PROJEKTÓW</h1>

    <Table v-bind:data="projects" @patient="addNewProject" />
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
import Table from "@/components/projects/Table.vue";
import Pagination from "@/components/Pagination.vue";
import ProjectService from "../services/ProjectService";

export default {
  name: "Projects",
  components: { Table, Pagination },
  data() {
    return {
      projects: [],
      totalPages: 5,
      currentPage: 1,
      perPage: 3,
    };
  },
  methods: {
    getData() {
      ProjectService.getProjects().then((res) => {
        console.log(res.data);
        this.projects = this.paginate(res.data);
        this.totalPages = Math.ceil(res.data.length / this.perPage);
      });
    },
    addNewProject(v) {
      console.log("Nowy projekt:", v);
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