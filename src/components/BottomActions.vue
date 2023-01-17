<template>
  <div class="bottom-actions--wrapper">
    <button class="delete-button"
            @click="removeUsers">Delete</button>
    <div class="right-actions--wrapper">
        <custom-input :description="searchDescription"
                      :value="searchTerm"
                      @text-changed="setSearchTerm"/>
        <p class="users-count--field">{{ usersCount }}</p>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/reusable_components/CustomInput.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    CustomInput,
  },
  computed: {
    ...mapState(['users', 'checkedUsers', 'searchTerm']),
    searchDescription() {
      return 'Search';
    },
    usersCount() {
      return `Users count ${this.users.length}`;
    },
  },
  methods: {
    ...mapMutations(['removeUser', 'setCheckedUsers', 'setSearchTerm']),
    removeUsers() {
      this.checkedUsers.forEach((user) => {
        this.removeUser(user.id);
      });
      this.setCheckedUsers();
    },
  },
};
</script>

<style>
.bottom-actions--wrapper {
  margin-top: 20px;
    display: flex;
    justify-content: space-between;
}
.right-actions--wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}
.users-count--field {
  margin-left: 30px;
}
.delete-button {
  background: #FF4742;
  height: 30px;
  border: 1px solid #FF4742;
  border-radius: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
   padding: 8px 14px;
  text-align: center;
}
.delete-button:hover,
.delete-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #FF4742;
}

.delete-button:active {
  opacity: .5;
}
</style>
