<template>
  <div class="add-new-patient">
    <!-- <span>:D</span> -->
    <h3>EDYTUJ ZLECENIE</h3>
    <div class="wrap-label">
      <select required v-model="project">
        <option :value="0">Wszystkie projekty</option>
        <option
          :class="{ divider: key % 2 == 0 }"
          :value="p"
          v-for="(p, key) in projects"
          :key="key"
        >
          {{ p.body }}
        </option>
      </select>
    </div>
    <div class="wrap-label">
      <select required v-model="patient">
        <option :value="0" disabled>Pacjent</option>
        <option
          :class="{
            enabled: p.enabled == 'Tak',
            'not-enabled': p.enabled == 'Nie',
          }"
          :value="p"
          v-for="(p, key) in patients"
          :key="key"
          :disabled="p.enabled == 'Nie'"
        >
          <b>{{ p.firstName }} {{ p.lastName }}</b
          >, {{ p.address.city }},
          {{ p.address.street }}
        </option>
      </select>
    </div>
    <div class="wrap-label">
      <select required v-model="singleResearch">
        <option :value="0" disabled>Badanie</option>
        <option
          :class="{ divider: key % 2 == 0 }"
          :value="research"
          v-for="(research, key) in research"
          :key="key"
        >
          {{ research.body }}
        </option>
      </select>
    </div>
    <div
      class="wrap-label"
      style="
        align-items: center;
        justify-content: center;
        margin: 0;
        padding: 0;
      "
    >
      <textarea
        style="width: 80%; align-self: center; justify-self: center"
        v-model="results"
        cols="30"
        rows="10"
        placeholder="Wyniki badań"
      ></textarea>
    </div>
    <div
      class="wrap-label"
      style="align-items: center; justify-content: center"
    >
      <button @click="add">Dodaj</button>
    </div>
    <button id="back" @click="back" style="background: transparent">
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
import ProjectService from "@/services/ProjectService";
import ResearchService from "@/services/ResearchService";
import ZleceniaService from "@/services/ZleceniaService";

export default {
  name: "EditZlecenie",
  props: ["zlecenieToEdit"],
  data() {
    return {
      patients: [],
      research: [],
      projects: [],
      patient: 0,
      project: 0,
      singleResearch: 0,
      zlecenieEdited: {},
      results: "",
    };
  },
  watch: {
    project(oldVal, newVal) {
      if (oldVal !== newVal) {
        if (oldVal === 0) {
          PatientService.getPatients()
            .then((res) => {
              console.log(res.data);
              this.patients = res.data;
              this.patient = 0;
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          ProjectService.getProjectById(this.project.id)
            .then((res) => {
              this.patients = res.data.patients;
              this.patient = 0;
              console.log(this.patients);
            })
            .catch((e) => console.log(e));
        }
      }
    },
    zlecenieToEdit(oldVal, newVal) {
      if (oldVal !== newVal) {
        // this.zlecenieEdited = this.zlecenieToEdit;
        ZleceniaService.getZlecenieById(this.zlecenieToEdit.id)
          .then((res) => {
            console.log("ratatata", res.data);
            (this.patient = res.data.patient),
              (this.singleResearch = res.data.research),
              (this.project = res.data.project);
            this.results = res.data.results;
          })
          .catch((e) => console.log(e));
      }
    },
  },
  mounted() {
    PatientService.getPatients()
      .then((res) => {
        this.patients = res.data;
      })
      .catch((e) => console.log(e));
    ProjectService.getProjects()
      .then((res) => (this.projects = res.data))
      .catch((e) => console.log(e));
    ResearchService.get()
      .then((res) => {
        this.research = res.data;
      })
      .catch((e) => console.log(e));
  },
  methods: {
    back() {
      this.$emit("editZlecenie", false);
    },
    add() {
      // console.log();
      console.log("this.patient", this.patient);
      console.log("this.project", this.project);
      console.log("this.research", this.singleResearch);
      console.log("this.results", this.results);
      //   console.log("this.id.edited", this.zlecenieEdited.id);
      let zlecenie = {
        patient: this.patient,
        project: this.project,
        research: this.singleResearch,
        results: this.results,
      };
      console.log("ADD ZLECENIE", zlecenie);
      ZleceniaService.update(this.zlecenieToEdit.id, zlecenie)
        .then((res) => {
          this.$emit("message", "Pomyślnie edytowano zlecenie");
          this.$emit("postive", true);
          this.$emit("isPopupActive", true);
          this.$emit("patients", res.data);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          console.log(res.data);
        })
        .catch((e) => console.log(e));
      this.$emit("editZlecenie", false);
    },
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
    position: relative;
    align-items: center;
    padding: 0.5rem;
    label {
      text-transform: uppercase;
      width: 85%;
      text-align: start;
    }
    select {
      border: 1px solid rgba($color: #ccc, $alpha: 1);
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
  .divider {
    background: rgba($color: #696868, $alpha: 0.2);
  }
  .enabled {
    background: rgba($color: rgb(43, 147, 43), $alpha: 0.4);
  }

  .not-enabled {
    background: rgba($color: rgb(232, 28, 28), $alpha: 0.4);
    cursor: not-allowed;
  }
}
</style>