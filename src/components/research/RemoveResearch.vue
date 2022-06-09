<template>
  <div class="add-new-project">
    <!-- <span>:D</span> -->
    <h3>Czy na pewno chcesz usunąć {{ removeResearch.body }}?</h3>
    <form @submit="remove">
      <div
        class="wrap-label"
        style="align-items: center; justify-content: center"
      >
        <button>Usuń</button>
      </div>
    </form>
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
import RemoveResearch from "@/services/ResearchService";
// import data from "../../../public/data.json";
export default {
  name: "RemoveResearch",
  props: ["removeResearch"],
  methods: {
    back() {
      this.$emit("removeResearch", false);
    },
    remove() {
      this.$emit("removeResearch", false);
      //   console.log(this.patient);

      RemoveResearch.remove(this.removeResearch.id)
        .then((res) => {
          this.$emit("message", "Pomyślnie usunięto badanie");
          this.$emit("postive", true);
          this.$emit("isPopupActive", true);
          this.$emit("patients", res.data);
          //   console.log("data: ", res.data);
        })
        .catch((e) => console.log(e));
    },
  },
};
</script>
<style lang="scss" scoped>
.add-new-project {
  width: 90vw;
  height: 20vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  max-height: 150px;
  position: absolute;
  background: white;
  border-radius: 6px;
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba($color: #777, $alpha: 1);
  box-shadow: 0 0 15px 0 rgba($color: #eee, $alpha: 1);
  @media (min-width: 700px) {
    width: 50vw;
    max-width: 500px;
    max-height: 150px;
  }
  h3 {
    text-transform: uppercase;
    font-family: "IBM Plex Mono", sans-serif;
    margin: 0.4rem 0;
    width: 90%;
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
  .good {
    border: 1px solid rgba($color: green, $alpha: 0.7);
  }

  .bad {
    border: 1px solid rgba($color: rgb(197, 37, 37), $alpha: 0.7);
  }
}
</style>