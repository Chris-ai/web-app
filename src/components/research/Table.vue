<template>
  <div class="container" style="overflow-x: auto">
    <div style="display: flex; width: 90%; margin: 2.5rem 0 3rem 0">
      <div class="search">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input v-model="searchInput" type="text" placeholder="Wyszukaj..." />
      </div>
      <div @click="toggleaddNewResearch" class="add-btn" id="add">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </div>
      <!-- <SearchBar @searchInput="updateSearchInput" /> -->
    </div>
    <table>
      <thead>
        <th>#</th>
        <th>Nazwa badania</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(research, key) in filteredData" :key="key">
          <td>{{ key }}</td>
          <td>{{ research.body }}</td>

          <td>
            <div style="display: flex">
              <div class="btn" id="edit" @click="showEditWindow(research)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>

              <div class="btn" id="remove" @click="showRemoveWindow(research)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <AddNewResearch
      v-show="addNewResearch"
      @addNewResearch="closeaddNewResearch"
      @message="updateMessage"
      @positive="updatePositive"
      @isPopupActive="updatePopupActivation"
      @patient="addNewResearchToDb"
    />
    <EditResearch
      v-show="editResearch"
      v-bind:researchToEdit="researchToEdit"
      @editResearch="closeEditResearch"
      @message="updateMessage"
      @positive="updatePositive"
      @isPopupActive="updatePopupActivation"
      @patient="updatePatient"
    />
    <RemoveResearch
      v-show="removeResearch"
      v-bind:removeResearch="researchToRemove"
      @removeResearch="closeremoveResearch"
      @message="updateMessage"
      @positive="updatePositive"
      @isPopupActive="updatePopupActivation"
      @patient="updatePatient"
    />
    <Popup
      v-show="isPopupActive"
      v-bind:message="message"
      v-bind:positive="positive"
    />
  </div>
</template>

<script>
import AddNewResearch from "@/components/research/AddNewResearch.vue";
import EditResearch from "@/components/research/EditResearch.vue";
import Popup from "@/components/Popup";
import RemoveResearch from "./RemoveResearch.vue";
// import PatientService from "@/services/PatientService";
export default {
  name: "Table",
  components: { AddNewResearch, Popup, EditResearch, RemoveResearch },
  props: ["data"],
  data() {
    return {
      searchInput: "",
      page: 1,
      perPage: 5,
      pages: [],
      research: [],
      addNewResearch: false,
      message: "",
      positive: true,
      isPopupActive: false,
      patient: {},
      editResearch: false,
      researchToEdit: 0,
      removeResearch: false,
      researchToRemove: {},
    };
  },
  created() {
    this.research = this.data;
    console.log("data", this.research);
  },
  methods: {
    showRemoveWindow(research) {
      this.researchToRemove = research;
      this.removeResearch = true;
    },
    closeremoveResearch(variable) {
      this.removeResearch = variable;
    },

    closeEditResearch(variable) {
      this.editResearch = variable;
    },
    showEditWindow(research) {
      console.log("click");
      this.researchToEdit = research;
      this.editResearch = true;
    },
    updatePatient() {},
    addNewResearchToDb(research) {
      this.$emit("patient", research);
    },
    updatePopupActivation(variable) {
      this.isPopupActive = variable;
      setTimeout(() => {
        this.isPopupActive = false;
      }, 1500);
    },
    updatePositive(variable) {
      this.positive = variable;
    },
    updateMessage(variable) {
      this.message = variable;
      this.isPopupActive = true;
      setTimeout(() => {
        this.isPopupActive = false;
      }, 3000);
    },
    closeaddNewResearch(variable) {
      this.addNewResearch = variable;
    },
    toggleaddNewResearch() {
      this.addNewResearch = true;
    },
  },
  computed: {
    filteredData() {
      // switch
      if (this.searchInput === "") {
        return this.data;
      } else {
        return this.data.filter((item) => {
          return item.body
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.container {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  .add-btn {
    height: 20px;
    width: 20px;
    margin: 0 0.3rem;
    border-radius: 6px;
    border: 1px solid rgba($color: #ccc, $alpha: 1);
    padding: 0.5rem;
    cursor: pointer;
    position: relative;
    @media (min-width: 900px) {
      &::before {
        position: absolute;
        background: rgba($color: #ccc, $alpha: 0.3);
        padding: 0.3rem;
        font-size: 0.8rem;
        border-radius: 6px;
        width: 200px;
        top: 150%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.5s ease all;
      }
    }
  }
  @media (min-width: 900px) {
    #add::before {
      content: "Dodaj nowe badanie";
      opacity: 0;
    }
    #add:hover {
      &::before {
        opacity: 1;
      }
    }
  }

  .search {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: space-around;
    height: 20px;
    min-width: 20px;
    margin: 0 0.3rem;
    border-radius: 6px;
    border: 1px solid rgba($color: #ccc, $alpha: 1);
    padding: 0.5rem;
    svg {
      height: 20px;
      width: 20px;
      margin: 0 0.3rem;
    }
    select {
      all: unset;
      height: 20px;
      // width: 20px;
      // margin: 0 0.3rem;
      font-size: 0.8rem;
      padding: 6px;
      border-radius: 6px;
      border: 1px solid rgba($color: #ccc, $alpha: 1);
    }
    option {
      border-bottom: 1px solid rgba($color: #ccc, $alpha: 1);
    }
    input {
      margin: 0 0.3rem;
      border: none;
      outline: none;
      font-size: 1rem;
    }
  }
  table {
    width: 90%;
    border-collapse: collapse;
    border-spacing: 0;
    font-size: 0.8rem;
    // width: 100%;
    // border: 1px solid #ddd;
    transition: 0.5s ease all;
    @media (min-width: 900px) {
      font-size: 1rem;
    }
  }

  th,
  td {
    text-align: left;
    border-bottom: 1px solid rgba($color: #ccc, $alpha: 0.5);
    padding: 1rem;
  }
  thead {
    border-top: 1px solid rgba($color: #ccc, $alpha: 0.5);
    box-shadow: 0 2px 4px 0 rgba($color: #ccc, $alpha: 1);
  }
  tr {
    &:hover {
      background: rgba($color: #ccc, $alpha: 0.3);
    }
  }
  .btn {
    height: 20px;
    width: 20px;
    margin: 0 0.3rem;
    cursor: pointer;
    position: relative;
    @media (min-width: 900px) {
      &::before {
        position: absolute;
        background: rgba($color: rgb(235, 235, 235), $alpha: 1);
        padding: 0.3rem;
        font-size: 0.8rem;
        border-radius: 6px;
        bottom: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        transition: 0.5s ease all;
      }
    }
  }
  @media (min-width: 900px) {
    #edit::before {
      content: "Edytuj";
      opacity: 0;
    }
    #edit:hover {
      &::before {
        opacity: 1;
      }
    }
    #remove::before {
      content: "Usuń";
      opacity: 0;
    }
    #remove:hover {
      &::before {
        opacity: 1;
      }
    }
  }
}
</style>