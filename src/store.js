import Vue from "vue";
import Vuex from "vuex";
import { types } from "./types/mutation-types";
import Task from "./models/task";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    [types.ADD_TASK](state, task) {
      state.tasks = [...state.tasks, task];
    },

    [types.DELETE_TASK](state, task) {
      const index = state.tasks.indexOf(task);
      if (index > -1) state.tasks.splice(index, 1);
    },

    [types.UPDATE_TASK](state, task) {
      const index = state.tasks.indexOf(task);
      if (index > -1) state.tasks[index] = task;
    },

    setTasks(state, tasks) {
      state.tasks = tasks;
    }
  },
  actions: {
    [types.CLEAR_ALL_TASKS](context) {
      context.commit("setTasks", []);
    }
  },

  plugins: [
    createPersistedState({
      /**
       * Parse stored tasks because local storage only save
       * the properties, but not restore the class methods
       * @param {*} store
       * @param {*} saved
       */
      arrayMerger(store, saved) {
        let newSaved = [];
        saved.map(task => {
          const newTask = new Task(
            task.title,
            task.startDateTime,
            task.finishDateTime,
            task.done
          );
          newSaved.push(newTask);
        });
        return newSaved;
      }
    })
  ]
});
