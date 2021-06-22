<template>
  <div>
    <div class="row my-4">
      <div class="col-3 mb-4" v-for="person in peopleList" :key="person.id">
        <person-card
          :person="person"
          @onPersonClick="toPerson"
        />
      </div>
    </div>
    <Loader v-if="loading" />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import PersonCard from '@/components/PersonCard'
import Loader from '@/components/Loader'

export default {
  components: { PersonCard, Loader },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async toPerson(id) {
      this.loading = true;
      const res = await this.$store.dispatch('people/fetchPerson', id);
      this.loading = false;
      if(res.status >= 400) {
        this.$toast.error(res.data)
        return;
      }

      this.$router.push({name: 'person-id', params: {id}})
    }
  },
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
