<template>
  <div id="app">
    <div class="app-container">
      <div class="app-body">
        <h1>Today's tasks</h1>
        <div class="form-container">
          <task-form/>
        </div>
        <div class="task-list">
          <task-item v-for="(task,i) in tasks" :key="'task'+i" :task="task"/>
        </div>
      </div>
      <footer>
        Created with ❤️ by
        <a href="https://luishck.github.io">Luis J. Centeno</a>
      </footer>
    </div>
  </div>
</template>

<script>
import TaskItem from "./components/TaskItem.vue";
import TaskForm from "./components/TaskForm.vue";

import { mapState } from "vuex";

export default {
  name: "app",

  components: {
    TaskItem,
    TaskForm
  },

  computed: {
    ...mapState(["tasks"])
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  .app-container {
    @media (min-width: 600px) {
      padding-left: 20%;
      padding-right: 20%;
    }
    .app-body {
      background-color: #f8f8f8;
      box-shadow: -2px 2px 18px 1px rgba(0, 0, 0, 0.23);
      min-height: 100vh;
      padding: 8px;
      .task-list {
        padding-top: 10px;
      }
    }
  }
}
.is-flex {
  display: flex;
}
.btn {
  border: none;
  border-radius: 4px;
  color: white;
  padding: 4px 8px 4px 8px;
  cursor: pointer;
  .icon {
    height: 20px;
    width: auto;
  }
  &.primary {
    background-color: blue;
  }
  &.danger {
    background-color: red;
  }
  &.warning {
    background-color: orange;
  }
  &.link {
    color: #2c3e50;
    background-color: transparent;
  }
}
footer {
  text-align: center;
  background-color: #f8f8f8;
}
</style>
