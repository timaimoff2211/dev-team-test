export const state = () => ({
  people: [],
  pagination: {
    perPage: 20,
    page: 1,
    hasMore: true
  },
  person: null
})

export const getters = {
  getPeopleList: s => s.people,
  getPagination: s => s.pagination,
  getPerson: s => s.person
}

export const mutations = {
  SET_PEOPLE(state, list) {
    state.people = state.people.concat(list)
  },
  SET_PAGINATION_DATA(state, pagData) {
    for(let key in pagData) {
      state.pagination[key] = pagData[key]
    }
  },
  SET_PERSON(state, person) {
    state.person = person
  },
  SET_NO_HAS_MORE(state) {
    state.pagination.hasMore = false
  }
}

export const actions = {
  async fetchPeopleList({commit, state}) {
    try {
      const res = await this.$axios.get(`people?pp=${state.pagination.perPage}&p=${state.pagination.page}`)
      commit('SET_PEOPLE', res.data)
      if(!res.data.length) {
        if(state.pagination.page > 1) {
          this.app.$toast.info('There is no more...');
        }
        commit('SET_NO_HAS_MORE')
      }
    } catch (error) {
      console.log(error.response);
      this.app.$toast.error(error.response.data)
    }
  },
  async fetchPerson(ctx, id) {
    try {
      const res = await this.$axios.get(`people/${id}`)
      ctx.commit('SET_PERSON', res.data)
      return res;
    } catch (error) {
      return error.response
    }
  }
}