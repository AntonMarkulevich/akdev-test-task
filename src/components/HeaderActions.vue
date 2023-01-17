<template>
  <div>
    <div class="inputs--wrapper">
      <div>
        <custom-input :description="fullNameDescription"
                      :value="name"
                      @text-changed="nameChanged"/>
        <div class="error" v-if="!$v.name.required && !submitStatus">Field is required</div>
        <div class="error" v-if="!$v.name.twoWordsCheck && !submitStatus">
        Name must have at least {{$v.name.$params.twoWordsCheck}} words.
        </div>
      </div>
      <div>
        <custom-input :description="emailDescription"
                      :value="email"
                      @text-changed="emailChanged"/>
        <div class="error" v-if="!$v.name.required && !submitStatus">Field is required</div>
        <div class="error" v-if="!$v.name.emailValidation && !submitStatus">
        Email is invalid.
        </div>
      </div>
      <div>
        <label for="phone">
          <input class="phone-number--input"
                 :value="phone"
                 v-imask="mask"
                 @accept="onAccept"
                 @complete="onComplete">
        </label>
        <div class="error" v-if="!$v.name.required && !submitStatus">Field is required</div>
      </div>
        <button class="add-button" @click="addUserClick">Add</button>
    </div>
  </div>
</template>

<script>
import CustomInput from '@/components/reusable_components/CustomInput.vue';
import { mapMutations, mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { IMaskDirective } from 'vue-imask';

const twoWordsCheck = (value) => (value.split(' ').length >= 2);
const emailValidation = (value) => (value.toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  )
);

export default {
  components: {
    CustomInput,
  },
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      submitStatus: true,
      mask: {
        mask: '{+375}(00)000-00-00',
        lazy: false,
      },
      phoneValid: false,
    };
  },
  computed: {
    ...mapState(['users']),
    fullNameDescription() {
      return 'Full Name';
    },
    emailDescription() {
      return 'Email';
    },
    phoneDescription() {
      return 'Phone';
    },
  },
  validations: {
    name: {
      required,
      twoWordsCheck,
    },
    email: {
      required,
      emailValidation,
    },
    phone: {
      required,
    },
  },
  methods: {
    ...mapMutations(['addUser']),
    nameChanged(value) {
      this.name = value;
    },
    emailChanged(value) {
      this.email = value;
    },
    phoneChanged(value) {
      this.phone = value;
    },
    addUserClick() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = false;
      } else {
        const userId = Math.max(...this.users.map((user) => user.id)) + 1;
        const currentUser = {
          id: userId,
          name: this.name,
          email: this.email,
          phone: this.phone,
        };
        this.submitStatus = true;
        this.addUser(currentUser);
        this.name = '';
        this.email = '';
        this.phone = '';
      }
    },
    onAccept(e) {
      const maskRef = e.detail;
      this.value = maskRef.value;
      this.phoneValid = false;
    },
    onComplete(e) {
      const maskRef = e.detail;
      this.phoneValid = true;
      this.phoneChanged(maskRef.unmaskedValue);
    },
  },
  directives: {
    imask: IMaskDirective,
  },
};
</script>

<style>
.inputs--wrapper {
  display: flex;
  justify-content: space-between;
}
.phone-number--input {
  border-radius: 5px;
}
.error {
  color: red;
}
.add-button {
 background-color: #27ae60;
  height: 30px;
  border: 1px solid #27ae60;
  border-radius: 6px;
  box-shadow: rgba(39, 174, 96, .15) 1px 2px 4px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
   padding: 8px 14px;
  text-align: center;
}
.add-button:hover,
.add-button:active {
  background-color: initial;
  background-position: 0 0;
  color: #1e8449;
}

.add-button:active {
  opacity: .5;
}
</style>
