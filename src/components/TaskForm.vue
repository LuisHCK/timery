<template>
  <div>
    <button class="btn primary" v-if="!showForm" @click="showForm=!showForm">
      <strong>+</strong> Add Task
    </button>

    <div class="modal-form" v-if="showForm">
      <form @submit.prevent="submit()">
        <textarea v-model="title" rows="5"></textarea>
        <button class="btn primary" type="submit">Submit</button>
        <button class="btn link" type="reset" @click="showForm=false">Cancel</button>
      </form>
    </div>
  </div>
</template>

<script>
import { types } from "../types/mutation-types";
import Task from "../models/task";

export default {
  name: "task-form",

  data() {
    return {
      title: "",
      showForm: false
    };
  },

  methods: {
    submit() {
      if (this.title.length > 0) {
        const task = new Task(this.title, this.description);
        this.$store.commit(types.ADD_TASK, task);
        this.$emit("submit");
        this.title = "";
        this.showForm = false;
        this.showToast("Task created!");
      } else {
        this.showToast("Form invalid", 'bubble');
      }
    },

    showToast(text, theme='outline') {
      this.$toasted.show(text, {
        theme: theme,
        position: "top-right",
        duration: 5000
      });
    }
  }
};
</script>

<style scoped lang="scss">
form {
  textarea {
    width: 100%;
    max-width: 100%;
  }
}
</style>