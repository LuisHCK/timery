<template>
  <div class="pomodoro-form" v-if="showForm">
    <div class="field-input">
      <label>Duration of Pomodoro</label>
      <input type="number" v-model="pomodoroDuration">
    </div>
    <div class="field-input">
      <label>Duration of the short break</label>
      <input type="number" v-model="shortBreak">
    </div>
    <div class="field-input">
      <label>Duration of the long break</label>
      <input type="number" v-model="longBreak">
    </div>
    <div class="field-actions">
      <button class="btn success" type="submit">Save</button>
      <button class="btn warning" @click="showForm=false">Cancel</button>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/eventBus";

export default {
  name: "pomodoro-settings",

  data() {
    return {
      pomodoroDuration: 25,
      shortBreak: 5,
      longBreak: 15,
      showForm: false
    };
  },

  methods: {
    submit() {
      this.$emit("input", {
        pomodoroDuration: this.pomodoroDuration,
        shortBreak: this.shortBreak,
        longBreak: this.longBreak
      });
    }
  },


  created() {
    EventBus.$on("TOGGLE_SETTINGS", event => {
      this.showForm = !this.showForm;
    });
  }
};
</script>

<style scoped lang="scss">
.pomodoro-form {
  padding: 12px;
  background-color: white;
  border-radius: 8px;
  .field-input {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
    label {
      color: rgb(114, 114, 114);
      font-weight: bold;
    }
    input {
      padding: 4px;
      border-radius: 4px;
      border: 0.5px solid;
      border-color: rgb(180, 180, 180);
    }
  }
}
</style>