<template>
  <nav>
    <div class="wrap">
      <router-link class="link" :to="{ name: 'Home' }"
        ><div class="btn" id="home">
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
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg></div
      ></router-link>
      <router-link class="link" :to="{ name: 'Patients' }"
        ><div class="btn" id="patients">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg></div
      ></router-link>
      <router-link class="link" :to="{ name: 'Projects' }"
        ><div class="btn" id="projects">
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
              d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
            />
          </svg></div
      ></router-link>
      <router-link class="link" :to="{ name: 'Research' }"
        ><div class="btn" id="research">
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg></div
      ></router-link>
      <router-link class="link" :to="{ name: 'Zlecenia' }">
        <div class="btn" id="zlecenia">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang='scss' scoped>
nav {
  height: 10%;
  border-bottom: 1px solid rgba($color: #777, $alpha: 0.5);
  //   background: red
  box-shadow: 0 4px 4px 0 #d5d5d5;
  margin-bottom: 1rem;
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .btn {
      height: 20px;
      width: 20px;
      margin: 0 0.3rem;
      border-radius: 6px;
      padding: 0.5rem;
      cursor: pointer;
      position: relative;
      transition: 0.5s ease all;
      text-decoration: none;
      outline: none;
      color: #514040;
      @media (min-width: 900px) {
        &::before {
          position: absolute;
          background: rgba($color: rgb(227, 227, 227), $alpha: 1);
          padding: 0.3rem;
          font-size: 0.8rem;
          border-radius: 6px;
          // width: 200px;
          top: 150%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: 0.5s ease all;
          z-index: 10;
        }
      }
      &:active,
      &:hover,
      &:focus {
        border: 1px solid rgba($color: lightblue, $alpha: 1);
        // color: lightblue;
      }
    }
    @media (min-width: 900px) {
      #home::before {
        content: "Statystyki";
        opacity: 0;
      }
      #home:hover {
        &::before {
          opacity: 1;
        }
      }
      #patients::before {
        content: "Pacjenci";
        opacity: 0;
      }
      #patients:hover {
        &::before {
          opacity: 1;
        }
      }
      #projects::before {
        content: "Projekty badawcze";
        opacity: 0;
      }
      #projects:hover {
        &::before {
          opacity: 1;
        }
      }
      #research::before {
        content: "Badania";
        opacity: 0;
      }
      #research:hover {
        &::before {
          opacity: 1;
        }
      }
      #zlecenia::before {
        content: "Zlecenia";
        opacity: 0;
      }
      #zlecenia:hover {
        &::before {
          opacity: 1;
        }
      }
    }
  }
}
</style>