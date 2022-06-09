<template>
  <div class="wrapper">
    <h1>LISTA ZLECEŃ</h1>

    <Table v-bind:data="zlecenia" @patient="addNewResearch" />
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
import Table from "@/components/zlecenia/Table.vue";
import Pagination from "@/components/Pagination.vue";
import ZleceniaService from "../services/ZleceniaService";

export default {
  name: "Research",
  components: { Table, Pagination },
  data() {
    return {
      zlecenia: [],
      totalPages: 5,
      currentPage: 1,
      perPage: 3,
    };
  },
  methods: {
    getData() {
      ZleceniaService.get().then((res) => {
        console.log(res.data);
        this.zlecenia = this.paginate(res.data);
        this.totalPages = Math.ceil(res.data.length / this.perPage);
      });
    },
    addNewResearch(v) {
      console.log("Nowe zlecenie:", v);
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
    paginate(zlecenia) {
      let page = this.currentPage;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return zlecenia.slice(from, to);
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