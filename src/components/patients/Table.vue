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
        <!-- <select v-model="selectInput" class="btn">
          <option value="">Imię i nazwisko</option>
          <option value="age">Wiek</option>
          <option value="gender">Płeć</option>
          <option value="address">Adres</option>
          <option value="phone">Telefon</option>
        </select> -->
        <input v-model="searchInput" type="text" placeholder="Wyszukaj..." />
      </div>
      <div @click="toggleAddNewPatient" class="add-btn" id="add">
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
        <th>>Imie i nazwisko</th>
        <th>Wiek</th>
        <th>Płeć</th>
        <th>Adres</th>
        <th>Telefon</th>
        <th></th>
      </thead>
      <tbody>
        <tr v-for="(patient, key) in filteredData" :key="key">
          <td>{{ key }}</td>
          <td>{{ patient.firstName }} {{ patient.lastName }}</td>
          <td>{{ patient.age }}</td>
          <td>{{ patient.gender }}</td>
          <td style="display: flex; flex-direction: column; font-weight: 500">
            {{ patient.address.city }}
            <span style="font-weight: 300">{{ patient.address.street }}</span>
          </td>
          <td>{{ patient.phoneNumber }}</td>
          <td>
            <div style="display: flex">
              <div class="btn" id="edit" @click="showEditWindow(patient)">
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

              <div class="btn" id="remove" @click="showRemoveWindow(patient)">
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
    <AddNewPatient
      v-show="addNewPatient"
      @addNewPatient="closeAddNewPatient"
      @message="updateMessage"
      @positive="updatePositive"
      @isPopupActive="updatePopupActivation"
      @patient="addNewPatientToDb"
    />
    <EditPatient
      v-show="editPatient"
      v-bind:patientToEdit="patientToEdit"
      @editPatient="closeEditPatient"
      @message="updateMessage"
      @positive="updatePositive"
      @isPopupActive="updatePopupActivation"
      @patient="updatePatient"
    />
    <RemovePatient
      v-show="removePatient"
      v-bind:removePatient="patientToRemove"
      @removePatient="closeRemovePatient"
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
import AddNewPatient from "@/components/patients/AddNewPatient.vue";
import EditPatient from "@/components/patients/EditPatient.vue";
import Popup from "@/components/Popup";
import RemovePatient from "./RemovePatient.vue";
// import PatientService from "@/services/PatientService";
export default {
  name: "Table",
  components: { AddNewPatient, Popup, EditPatient, RemovePatient },
  props: ["data"],
  data() {
    return {
      searchInput: "",
      page: 1,
      perPage: 5,
      pages: [],
      patients: [],
      addNewPatient: false,
      message: "",
      positive: true,
      isPopupActive: false,
      patient: {},
      editPatient: false,
      patientToEdit: 0,
      removePatient: false,
      patientToRemove: {},
      firstNameClickCounter: 0,
      ageClickCounter: 0,
      genderClickCounter: 0,
      addressClickCounter: 0,
      phoneClickCounter: 0,
    };
  },
  created() {
    this.patients = this.data;
    console.log("data", this.patients);
    // PatientService.createPatient(this.patients)
    //   .then(() => {
    //     this.getData();
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  },
  methods: {
    showRemoveWindow(patient) {
      this.patientToRemove = patient;
      this.removePatient = true;
    },
    closeRemovePatient(variable) {
      this.removePatient = variable;
    },

    closeEditPatient(variable) {
      this.editPatient = variable;
    },
    showEditWindow(patient) {
      console.log("click");
      this.patientToEdit = patient;
      // this.updatePatinetToEdit(patient);
      this.editPatient = true;
      // console.log("patient", this.patientToEdit);
    },
    updatePatient() {},
    addNewPatientToDb(patient) {
      // this.patients.push(patient);
      this.$emit("patient", patient);
      // console.log(patient);
      // console.log("patients", this.patients);
      // this.getData();
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
    closeAddNewPatient(variable) {
      this.addNewPatient = variable;
    },
    toggleAddNewPatient() {
      this.addNewPatient = true;
    },
    paginate(patients) {
      let page = this.page;
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
  computed: {
    filteredData() {
      // switch
      if (this.searchInput === "") {
        return this.data;
      } else {
        return this.data.filter((item) => {
          let wholeName = item.firstName + " " + item.lastName;
          let address = item.address.city + " " + item.address.street;
          return (
            wholeName.toLowerCase().includes(this.searchInput.toLowerCase()) ||
            item.gender.includes(this.searchInput.toLowerCase()) ||
            item.age == this.searchInput ||
            item.phoneNumber.includes(this.searchInput.toLowerCase()) ||
            address.toLowerCase().includes(this.searchInput.toLowerCase())
          );
        });
      }
    },
    // filteredData() {
    //   const value =
    //     this.searchInput.charAt(0).toUpperCase() + this.searchInput.slice(1);
    //   return this.data.filter(function (item) {
    //     return (
    //       item.firstName.indexOf(value) > -1 ||
    //       item.lastName.indexOf(value) > -1 ||
    //       item.gender.indexOf(value) > -1
    //     );
    //   });
    // },
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
      content: "Dodaj nowego pacjenta";
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
    padding: 8px;
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