<template>
  <div id="app">

    <div class="parrent-container">
      <table class="table">
        <thead>
        <tr class="header">
          <th>
            <label for="checkbox">
              <input type="checkbox" id="checkbox" v-model="allChecked" @click="setAllChecked"/>
            </label>
          </th>
          <th @click="sort('name')">Name</th>
          <th @click="sort('email')">Email</th>
          <th @click="sort('phone')">Phone</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item) in sortedData" :key="item.id">
          <th>
            <label for="checkbox">
              <input type="checkbox" :value="item" v-model="checkedUsers"/>
            </label>
          </th>
          <th>{{item.name}}</th>
          <th>{{item.email}}</th>
          <th>{{item.phone}}</th>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      allChecked: false,
      currentSort: 'name',
      currentSortDir: 'asc',
      checkedUsers: [],
    };
  },

  computed: {
    ...mapState(['users', 'searchTerm']),
    computedData() {
      if (this.searchTerm) {
        return this.users.filter((item) => item.name.includes(this.searchTerm)
        || item.email.includes(this.searchTerm) || item.phone.includes(this.searchTerm));
      }
      return this.users;
    },
    sortedData() {
      const sorted = this.computedData;
      sorted.sort((a, b) => {
        let modifier = 1;
        switch (true) {
          case (this.currentSortDir === 'desc'): modifier = -1; return modifier;
          case (a[this.currentSort] < b[this.currentSort]): return -1 * modifier;
          case (a[this.currentSort] > b[this.currentSort]): return 1 * modifier;
          default: return 0;
        }
      });
      return sorted;
    },
  },
  methods: {
    ...mapMutations(['setCheckedUsers']),
    sort(s) {
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
    sortBy(sortKey) {
      this.reverse = (this.sortKey === sortKey) ? !this.reverse : false;
      this.sortKey = sortKey;
    },
    setAllChecked() {
      if (!this.allChecked) {
        this.checkedUsers = this.users;
      } else this.checkedUsers = [];
    },
  },
  watch: {
    users() {
      localStorage.setItem('users', JSON.stringify(this.users));
    },
    checkedUsers() {
      this.setCheckedUsers(this.checkedUsers);
    },
  },
};
</script>

<style>
.parrent-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.header {
  cursor: pointer;
}

table {
  border: 2px solid black;
  border-collapse: collapse;
  width: 80%;
  box-shadow: rgb(0 0 0 / 40%) 1px 10px 20px;

}
tbody tr:hover {
  background: rgb(144, 146, 145);
}
thead {
  background: rgb(177, 177, 177);
}
th {
  border: 1px solid;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
