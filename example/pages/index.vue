<template>
  <div>
    Works!
    <br>
    <b-field>
      <b-input
        v-model="key"
        placeholder="Large"
        size="is-large"
        icon="address-card"
      />
    </b-field>
    <b-message class="title">
      {{ key }}
    </b-message>
  </div>
</template>

<script>
export default {
  data () {
    return {
      key: 'value'
    }
  },
  watch: {
    $data: {
      // immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        this.saveState()
      }
    }
  },
  mounted () {
    this.restoreState()
  }
}
</script>
