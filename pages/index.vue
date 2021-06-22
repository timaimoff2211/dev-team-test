<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-3 mb-4" v-for="person in peopleList" :key="person.id">
        <person-card 
          :person="person"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PersonCard from '@/components/PersonCard'

export default {
  components: { PersonCard },
  computed: {
    ...mapGetters({
      peopleList: 'people/getPeopleList'
    })
  },
  async fetch({store}) {
    await store.dispatch('people/fetchPeopleList');
  }
}
</script>

<style lang="scss">

</style>
