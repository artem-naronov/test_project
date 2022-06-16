import { defineStore } from 'pinia'

export const useDataStore = defineStore({
  id: 'data',
  state: () => ({
    data: [],
    editItem: '',
    idList: 0,
    showModal: false,
    addModal: false,
    editModal: false,
    sortList: []
  }),
  getters: {
    // doubleCount: (state) => state.data * 2
  },
  actions: {
    add( value:Object) {
      this.data.splice(this.data.length, 0, value)
    },
    edit(value:Object) {
      this.data.splice(this.editItem, 1, value)
    },
    listSort(param:string|number) {
      if(param == '') {
        this.sortList = this.data
      } else {
        this.sortList = this.data.filter(item => item.id == param || item.descr.includes(param))
      }
    }
  }
})
