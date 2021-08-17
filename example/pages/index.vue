<template>
  <div>
    Works!
    <br>
    <b-field>
        <b-input placeholder="Large"
            size="is-large"
            icon="address-card"
            v-model="key">
        </b-input>
    </b-field>
    <b-message class="title">{{key}}</b-message>
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
      //immediate: true,
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
