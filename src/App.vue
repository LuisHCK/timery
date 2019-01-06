<template>
  <div id="app">
    <div class="app-container">
      <div class="app-body">
        <tabs>
          <template slot="tasks">
            <tasks/>
          </template>
          <template slot="pomodoros">
            <pomodoros/>
          </template>
        </tabs>
        <footer>
          Created with ❤️ by
          <a href="https://luishck.github.io">Luis J. Centeno</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import Tabs from "@/components/Tabs.vue";
import Tasks from "@/views/Tasks.vue";
import Pomodoros from "@/views/Pomodoros.vue";
export default {
  name: "app",

  components: {
    Tabs,
    Tasks,
    Pomodoros
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
      position: relative;
      background-color: #f8f8f8;
      box-shadow: -2px 2px 18px 1px rgba(0, 0, 0, 0.23);
      min-height: 90vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .page {
        padding: 10px;
      }
      .github-link {
        position: absolute;
        right: 12px;
        img {
          height: 32px;
          width: auto;
        }
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
    background-color: #1e88e5;
  }
  &.success {
    background-color: #1ed378;
  }
  &.danger {
    background-color: #ff7043;
  }
  &.warning {
    background-color: #ffa726;
  }
  &.link {
    color: #2c3e50;
    background-color: transparent;
  }
}
footer {
  text-align: center;
  background-color: #f8f8f8;
  padding: 8px;
}
</style>
