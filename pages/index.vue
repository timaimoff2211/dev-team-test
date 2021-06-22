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
  mounted() {
    document.addEventListener('scroll', this.onPageScroll)
  },
  methods: {
    async onPageScroll(e) {
      const el = e.target.documentElement;
      if((+el.scrollHeight) - (+el.clientHeight) === el.scrollTop) {
        if(this.pagination.hasMore) {
          console.log('load new');
          this.loading = true;
          this.$store.commit('people/SET_PAGINATION_DATA', {
            page: this.pagination.page + 1 
          })
          await this.$store.dispatch('people/fetchPeopleList');
          this.loading = false;
        }
      }
    },
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
      peopleList: 'people/getPeopleList',
      pagination: 'people/getPagination'
    })
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onPageScroll);
  },
  async fetch({store}) {
    store.commit('people/SET_PAGINATION_DATA', {page: 1, hasMore: true})
    if(!store.state.people.people.length) {
      await store.dispatch('people/fetchPeopleList');
    }
  }
}
</script>

<style lang="scss">

</style>
