<template>
  <div class="wrapper">
    <h1>LISTA BADAŃ</h1>

    <Table v-bind:data="research" @patient="addNewResearch" />
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
import Table from "@/components/research/Table.vue";
import Pagination from "@/components/Pagination.vue";
import ResearchService from "../services/ResearchService";

export default {
  name: "Research",
  components: { Table, Pagination },
  data() {
    return {
      research: [],
      totalPages: 5,
      currentPage: 1,
      perPage: 3,
    };
  },
  methods: {
    getData() {
      ResearchService.get().then((res) => {
        console.log(res.data);
        this.research = this.paginate(res.data);
        this.totalPages = Math.ceil(res.data.length / this.perPage);
      });
    },
    addNewResearch(v) {
      console.log("Nowe badanie:", v);
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
    paginate(research) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return research.slice(from, to);
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