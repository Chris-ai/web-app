<template>
  <div class="add-new-patient">
    <!-- <span>:D</span> -->
    <h3>Wybierz pacjenta</h3>
    <form @submit.prevent="add">
      <div class="wrap-label">
        <!-- <label for="">Imię</label> -->
        <select required v-model="patientId">
          <option
            :class="{
              enabled: p.enabled == 'Tak',
              'not-enabled': p.enabled == 'Nie',
            }"
            :value="p"
            v-for="(p, key) in patients_"
            :key="key"
            :disabled="p.enabled == 'Nie'"
          >
            {{ p.firstName }} {{ p.lastName }} {{ p.address.city }}
            {{ p.address.street }}
          </option>
          <!-- <option disabled value="">Płeć</option> -->
          <!-- <option value="mężczyzna">Mężczyzna</option> -->
          <!-- <option value="kobieta">Kobieta</option> -->
        </select>
      </div>

      <div
        class="wrap-label"
        style="align-items: center; justify-content: center"
      >
        <button>Dodaj</button>
      </div>
    </form>

    <!-- </form> -->
    <button id="back" @click="back" style="background: transparent">
      <!-- fasdfasdfsad -->
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
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import PatientService from "@/services/PatientService";
import ProjectService from "../services/ProjectService";
// import data from "../../../public/data.json";
export default {
  name: "AddNewPatient",
  props: ["patients", "projectId"],
  data() {
    return {
      patients_: [],
      // patientsFiltered: [],
      patientId: 0,
      project: {},
      //   patient: {
      //     firstName: "",
      //     lastName: "",
      //     gender: "",
      //     age: 0,
      //     address: {
      //       street: "",
      //       city: "",
      //     },
      //     phoneNumber: "",
      //     enabled: false,
      //   },
    };
  },
  // created() {
  //   this.patients = data.patients;
  //   console.log("patients", this.patients);
  // },
  computed: {
    filteredData() {
      return this.patients_.filter((item) => {
        this.patients.some((patient) => patient.id !== item.id);
      });
    },
  },
  mounted() {
    PatientService.getPatients()
      .then((res) => {
        this.patients_ = res.data;
        console.log("addnewPatient: ", this.patients);
        console.log("resdata: ", res.data);
      })
      .catch((e) => console.log(e));
    ProjectService.getProjectById(this.projectId)
      .then((res) => (this.project = res.data))
      .catch((e) => console.log(e));
  },
  methods: {
    back() {
      this.$emit("addNewPatient", false);
    },
    add() {
      if (this.patients.some((e) => e.id === this.patientId.id)) {
        this.$emit("addNewPatient", false);
        this.$emit("message", "Ten pacjent znajduje się już w tym projekcie");
        this.$emit("postive", false);
        this.$emit("isPopupActive", true);
      } else {
        this.project.patients.push(this.patientId);
        ProjectService.updateProject(this.projectId, this.project)
          .then((res) => {
            console.log(res.data);
            this.$emit("message", "Pomyślnie dodano pacjenta");
            this.$emit("postive", true);
            this.$emit("isPopupActive", true);
            setTimeout(() => {
              // document.location.reload();
              this.$router.push({ name: "Projects" });
            }, 500);
          })
          .catch((e) => {
            console.log(e);
          });
      }
      console.log("niewszłem do ifa");
      /* vendors contains the element we're looking for */
    },
    // let project = this.project;
    // let check =
    // this.contains(this.patients, this.patientId)
    //   .then((res) => {
    //     console.log(console.log("res", res));
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //     this.$emit("message", "Ten pacjent znajduje się już w tym projekcie");
    //     this.$emit("postive", false);
    //     this.$emit("isPopupActive", true);
    //   });
  },
};
</script>
<style lang="scss" scoped>
.add-new-patient {
  width: 90vw;
  height: 80vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-height: 400px;
  position: absolute;
  background: white;
  border-radius: 6px;
  z-index: 5;
  border: 1.5px solid rgba($color: #777, $alpha: 1);
  box-shadow: 0 0 15px 0 rgba($color: #eee, $alpha: 1);
  @media (min-width: 700px) {
    width: 50vw;
    max-width: 500px;
    max-height: 400px;
  }
  h3 {
    text-transform: uppercase;
    font-family: "IBM Plex Mono", sans-serif;
    margin: 0.4rem 0;
  }
  .wrap-label {
    display: flex;
    // flex-direction: ro;
    position: relative;
    align-items: center;
    padding: 0.5rem;
    label {
      text-transform: uppercase;
      width: 85%;
      //   padding: 0.5rem;
      //   align-self: flex-start;
      text-align: start;
    }
    select {
      //   all: unset;
      border: 1px solid rgba($color: #ccc, $alpha: 1);
      //   border-radius: 4px;
      margin: 0 0.4rem;
      padding: 0.5rem;
      font-size: 0.8rem;
      outline: none;
      width: 100%;
      option {
        padding: 0.5rem;
      }
    }
    input {
      border: 1px solid rgba($color: #ccc, $alpha: 1);
      //   border: 1px solid rgba($color: rgb(197, 37, 37), $alpha: 0.7);
      //   border: 1px solid rgba($color: green, $alpha: 0.7);
      //   border-radius: 4px;
      margin: 0 0.4rem;
      padding: 0.5rem;
      font-size: 0.8rem;
      outline: none;
      width: 100%;
    }
    button {
      padding: 0.5rem;
      margin: 0 0.4rem;
      cursor: pointer;
      border-radius: 4px;
      color: rgba($color: #3b6c8a, $alpha: 1);
      background: rgba($color: #6ab6e4, $alpha: 0.6);
      border: 3px solid rgba($color: #6ab6e4, $alpha: 1);
    }
  }

  #back {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    cursor: pointer;
    svg {
      height: 20px;
      width: 20px;
    }
  }
  .enabled {
    background: rgba($color: rgb(43, 147, 43), $alpha: 0.4);
    // padding: 6px;
    // border: 1px solid #777;
  }

  .not-enabled {
    background: rgba($color: rgb(232, 28, 28), $alpha: 0.4);
    cursor: not-allowed;
  }
}
</style>