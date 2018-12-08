<template>
  <div class="task">
    <div class="container" :class="{'done': task.done}">
      <div class="info">
        <div class="title">
          <input
            type="checkbox"
            v-if="task.startDateTime && task.done == false"
            @click="doneTask()"
          >
          <span v-text="task.title" :class="{'done': task.done}"/>
        </div>
        <small v-if="task.done">
          Task done in:
          <strong>{{task.duration}} hours</strong>
        </small>
      </div>
      <div class="action is-flex">
        <button
          class="btn primary"
          v-if="task.done == false && task.startDateTime == undefined"
          @click="startTask()"
        >
          <img class="icon" :src="require('@/assets/stopwatch.svg')" alt>
        </button>
        <button class="btn warning" v-if="task.done" @click="restartTask()">
          <img :src="require('@/assets/refresh.svg')" alt class="icon">
        </button>
        <button class="btn danger" @click="deleteTask(task)">
          <img :src="require('@/assets/garbage.svg')" alt class="icon">
        </button>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import Task from "@/models/task";
import { types } from "../types/mutation-types";
import { mapState } from "vuex";
export default {
  name: "task-item",

  data() {
    return {
      showModal: true
    };
  },

  computed: {
    ...mapState(["tasks"])
  },

  props: {
    task: {
      type: Object,
      default: () => new Task()
    }
  },

  methods: {
    startTask() {
      this.task.start();
      this.showToast("Task started!", "success");
      this.$store.commit(types.UPDATE_TASK, this.task);
    },

    doneTask() {
      this.task.finish();
      this.showToast("Task finished!", "success");
      this.$store.commit(types.UPDATE_TASK, this.task);
    },

    restartTask() {
      this.task.restart();
      this.showToast("Task restarted!", "info");
      this.$store.commit(types.UPDATE_TASK, this.task);
    },

    deleteTask(task) {
      this.$store.commit(types.DELETE_TASK, task);
      this.showToast("Task deleted!", "error");
    },

    showToast(text, type = "info") {
      this.$toasted.show(text, {
        theme: "bubble",
        type: type,
        position: "top-right",
        duration: 5000
      });
    }
  }
};
</script>

<style scoped lang="scss">
.task {
  transition: 0.3s;
  &:hover {
    background-color: #ffffff;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
    &.done {
      background-color: rgb(238, 238, 238);
    }
  }
  span.done {
    text-decoration: line-through;
    font-style: italic;
  }
  .divider {
    border-bottom: 1px solid;
    border-color: rgb(172, 172, 172);
  }
}
</style>