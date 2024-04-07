<template>
  <div class="barchart">
    <h1>Bar Chart</h1>
    <PieChart />
  </div>
<!--  <query-builder :cubejs-api="cubejsApi" :query="paintingsByNationalityQuery">-->
<!--    <template>-->
<!--      <div  class="loading">Loading...</div>-->
<!--      <div>-->
<!--        <Barchart-->
<!--            title="Paintings by Nationality"-->
<!--            :resultSet="resultSet"-->
<!--        />-->
<!--      </div>-->
<!--    </template>-->
<!--  </query-builder>-->
  <button @click="getUsers">Get all users</button>
  <button @click="postData">Add user</button>
  <button @click="removeUser">Remove user</button>
</template>
<script>
import PieChart from '../components/PiechartItem.vue';
import Barchart from '../components/Barchart.vue';
import {fetchUsers, postUserData, removeUserData} from "@/api/userController.js";

export default {
  components: {
    PieChart,
    Barchart,
  },
  methods: {
    async postData() {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      await postUserData(timeZone);
    },
    async removeUser() {
      await removeUserData();
    },
    async getUsers() {await
        fetchUsers()}
  }
};




</script>


<style>

@media (min-width: 1024px) {
  .barchart {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

@media (max-width: 1024px) {
  .barchart {
margin-top: 20px;
  }
}
</style>
