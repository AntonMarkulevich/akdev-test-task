<template>
  <div class="main-page">
    <header-actions></header-actions>
    <users-table></users-table>
    <bottom-actions></bottom-actions>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import HeaderActions from '@/components/HeaderActions.vue';
import UsersTable from '@/components/UsersTable.vue';
import BottomActions from '@/components/BottomActions.vue';

export default {
  props: {
    msg: String,
  },
  components: {
    HeaderActions,
    UsersTable,
    BottomActions,
  },
  computed: {
    ...mapState({
      users: (state) => state.users,
    }),
  },
  methods: {
    ...mapMutations([
      'setUsers',
    ]),
  },
  mounted() {
    if (!localStorage.getItem('users')) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit('setUsers', data);
        });
    } else this.$store.commit('setUsers', JSON.parse(localStorage.getItem('users') || '[]'));
  },
};
</script>
