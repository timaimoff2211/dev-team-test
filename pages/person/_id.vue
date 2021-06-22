<template>
  <div class="my-4">
    <h1>{{ person.Name }}</h1>
    <hr>
    <div class="row pt-4 justify-content-center">
      <div class="col-3">
        <person-card 
          :person="person"
          :isView="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PersonCard from '@/components/PersonCard'
import {mapGetters} from 'vuex'

export default {
  components: { PersonCard },
  computed: {
    ...mapGetters({
      person: 'people/getPerson'
    })
  }
}
</script>