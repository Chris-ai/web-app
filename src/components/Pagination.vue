<template>
  <div style="display: flex; margin-top: 2rem">
    <!-- <div class="text">Rekordów na stronę:</div> -->
    <select v-model="pPage">
      <option value="3">3</option>
      <option value="6">6</option>
      <option value="9">9</option>
    </select>

    <div
      :class="{ 'btn disabled': currentPage == 1 }"
      class="btn"
      id="first"
      @click="firstElement"
    >
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
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
    </div>
    <div
      :class="{ 'btn disabled': currentPage == 1 }"
      class="btn"
      id="previous"
      @click="previousElement"
    >
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
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </div>
    <div class="text" style="border: none">
      {{ currentPage }} z {{ totalPages }}
    </div>

    <div
      :class="{ 'btn disabled': currentPage == totalPages }"
      class="btn"
      id="next"
      @click="nextElement"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>

    <div
      :class="{ 'btn disabled': currentPage == totalPages }"
      class="btn"
      id="last"
      @click="lastElement"
    >
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
          d="M13 5l7 7-7 7M5 5l7 7-7 7"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["totalPages", "currentPage", "perPage"],
  data() {
    return {
      cPage: this.currentPage,
      pPage: this.perPage,
    };
  },
  watch: {
    pPage() {
      this.$emit("perPage", this.pPage);
    },
  },
  methods: {
    firstElement() {
      this.$emit("currentPage", 1);
    },
    lastElement() {
      this.$emit("currentPage", this.totalPages);
    },
    nextElement() {
      let ccPage = this.currentPage + 1;
      this.$emit("currentPage", ccPage);
    },
    previousElement() {
      let ccPage = this.currentPage - 1;
      this.$emit("currentPage", ccPage);
    },
  },
  mounted() {
    this.cPage = this.currentPage;
    this.pPage = this.perPage;
  },
};
</script>

<style lang='scss' scoped>
select {
  all: unset;
  height: 20px;
  width: 20px;
  margin: 0 0.3rem;
  border-radius: 6px;
  border: 1px solid rgba($color: #ccc, $alpha: 1);
  padding: 0.5rem;
}
option {
  border-bottom: 1px solid rgba($color: #ccc, $alpha: 1);
}
.btn {
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
      width: 80px;
      top: 150%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.5s ease all;
    }
  }
}

.disabled {
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.4;
}

.text {
  height: 20px;
  //   width: 20px;
  margin: 0 0.3rem;
  border-radius: 6px;
  border: 1px solid rgba($color: #ccc, $alpha: 1);
  padding: 0.5rem;
  //   cursor: pointer;
  //   position: relative;
}
@media (min-width: 900px) {
  #first::before {
    content: "Pierwsza";
    opacity: 0;
  }
  #first:hover {
    &::before {
      opacity: 1;
    }
  }
  #previous::before {
    content: "Poprzednia";
    opacity: 0;
  }
  #previous:hover {
    &::before {
      opacity: 1;
    }
  }
  #next::before {
    content: "Następna";
    opacity: 0;
  }
  #next:hover {
    &::before {
      opacity: 1;
    }
  }
  #last::before {
    content: "Ostatnia";
    opacity: 0;
  }
  #last:hover {
    &::before {
      opacity: 1;
    }
  }
}
</style>