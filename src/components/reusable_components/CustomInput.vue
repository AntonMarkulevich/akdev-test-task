<template>
  <div class="input__wrapper">
    <label for="input">
        <input type="text"
               class="custom-input"
               :id="id"
               :value="value"
               :placeholder="description"
               @input="onInputChanged"/>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: 'input',
    },
  },
  methods: {
    onInputChanged(event) {
      this.$emit('text-changed', event.target.value);
    },
  },
};
</script>

<style>
.custom-input {
  border-radius: 5px;
}
</style>
