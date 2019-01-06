<template>
  <div class="page">
    <a target="_blank" href="https://github.com/LuisHCK/timery" class="github-link">
      <img :src="require('@/assets/github.svg')" alt="github">
    </a>
    <h1>Today's tasks</h1>
    <div class="form-container">
      <task-form/>
    </div>
    <div class="task-list">
      <task-item v-for="(task,i) in tasks" :key="'task'+i" :task="task"/>
    </div>
  </div>
</template>

<script>
import TaskItem from "@/components/TaskItem.vue";
import TaskForm from "@/components/TaskForm.vue";

import { mapState } from "vuex";

export default {
  name: "tasks",

  components: {
    TaskItem,
    TaskForm
  },

  computed: {
    ...mapState(["tasks"])
  }
};
</script>

<style lang="scss" scoped>
.task-list {
  padding-top: 10px;
}
</style>