<template>
  <div id="app" ref="container">
    <h1>{{ message }}</h1>
    <p>{{ status }}</p>
    <button class="button-10" @click="reset">Reset</button>
    <input
      :value="input"
      placeholder="User input"
      @input="input = $event.target.value"
      @change="getBAS"
    />
    <table>
      <tr>
        <th>User</th>
        <th>Agent</th>
      </tr>
      <tr v-for="(item, id) in dialog" v-bind:key="id">
        <td><textarea :value="item[0]" /></td>
        <td><textarea :value="item[1]" /></td>
      </tr>
    </table>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      message: "Weee agent POC",
      answer: "",
      dialog: [],
      status: "",
      input: null,
      nlp_session_id: null,
    };
  },
  watch: {
    dialog: function () {
      this.$nextTick(() => {
        var div = this.$refs.container;

        // Get the table rows
        var trs = div.getElementsByTagName("tr");
        for (let j = 0; j < trs.length; j++) {
          var maxHeight = 0;
          // The textareas in the table row
          var cells2 = trs[j].getElementsByTagName("textarea");
          // First get the max scrollHeight
          for (let k = 0; k < cells2.length; k++) {
            var height = cells2[k].scrollHeight;
            if (height > maxHeight) {
              maxHeight = height;
            }
          }
          // Set all heights to the max height
          for (let l = 0; l < cells2.length; l++) {
            cells2[l].style.height = maxHeight + "px";
          }
        }
      });
    },
  },
  methods: {
    reset() {
      var vm = this;
      vm.input = null;
      vm.nlp_session_id = null;
      vm.getBAS();
    },
    async getBAS() {
      var vm = this;
      const url = "https://api-dev.braininc.net/be/bas-demo-v4/nlp/agent";
      // Headers
      const config = {
        Authorization: "Token 8632c9f06683e9ca3016a261830e21d35707c784",
        "Content-Type": "application/json",
      };
      // Body
      const body = {
        agent: "weee",
        input: vm.input,
        nlp_session_id: vm.nlp_session_id,
      };
      vm.status = "Thinking";
      await Vue.axios
        .post(url, body, { headers: config })
        .then(function (response) {
          vm.status = "";
          vm.answer = response.data;
          vm.dialog = response.data.history_pretty;
          vm.nlp_session_id = response.data.dialog_nlp_session_id;
          vm.input = null;
        })
        .catch(function (error) {
          alert(error);
        });
    },
  },
};
</script>

<!-- Use preprocessors via the lang attribute! e.g. <style lang="scss"> -->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

a,
button {
  color: #4fc08d;
}

button {
  background: none;
  border: solid 1px;
  border-radius: 2em;
  font: inherit;
  padding: 0.75em 2em;
}

table {
  width: 100%;
}

input {
  width: 100%;
}

textarea {
  width: 100%;
  height: auto;
  line-height: 16px;
}

.button-10 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Roboto", sans-serif;
  border-radius: 6px;
  border: none;

  color: #fff;
  background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
  background-origin: border-box;
  box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25),
    inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  font-size: 16px;
}
</style>