<template>
  <div class="container">
    <h1>Список обородования</h1>
    <button type="button" @click="data.showModal = true">Добавить запись</button>
    <div class="itemList">
      <input type="text" name="" id="search" placeholder="Поиск" v-model="searchVal">
      <table>
        <thead>
          <th>Код оборудования</th>
          <th>Тип оборудования</th>
          <th>Серийный номер</th>
          <th>Примечание</th>
          <th>Действие</th>
        </thead>
        <tbody>
          <tr v-for="(item, index) in sortList" :key="index">
            <td>{{item.id }}</td>
            <td>{{item.type}}</td>
            <td>{{item.number}}</td>
            <td>{{item.desc}}</td>
            <td class="action">
              <span :id="'edit_' + item.id" class="edit icon" @click="change(index)"></span>
              <span :id="'del_' + item.id" class="del icon" @click="remove(index)"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Modal :class="{show:data.showModal, editModal:data.editModal}" />
  </div>
</template>

<script setup>
  import Modal from '@/components/Modal.vue' 
  import { computed, ref } from 'vue'
  import { useDataStore } from '@/stores/data'

  const data = useDataStore()

  const searchVal = ref('')

  const change = id => {
    data.editModal = true
    data.showModal = true
    data.editItem = id
  }

  const remove = id => {
    data.data.splice(id, 1)
  }

  const sortList = computed(() => {
    data.listSort(searchVal.value)
    return data.sortList
  })
  
</script>

<style scoped>

  h1 {
    text-align: center;
  }
  
  table {
    width: 100%;
    margin: 60px 0;
  }
  td {
    box-shadow: 4px 4px 8px 0px rgb(34 60 80 / 20%);
    padding: 20px 0;
    text-align: center;
  }
  .action {
    display: flex;
    justify-content: space-evenly;
  }
  .itemList {
    margin: 40px 0;
    -webkit-box-shadow: 4px 4px 8px 0px rgb(34 60 80 / 20%);
    -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 4px 8px 0px rgb(34 60 80 / 20%);
    padding: 20px;
  }
  .icon {
    display: block;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
  .edit {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 55.25 55.25' style='enable-background:new 0 0 55.25 55.25;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M0.523,51.933l-0.497,2.085c-0.016,0.067-0.02,0.135-0.022,0.202C0.004,54.234,0,54.246,0,54.259 c0.001,0.114,0.026,0.225,0.065,0.332c0.009,0.025,0.019,0.047,0.03,0.071c0.049,0.107,0.11,0.21,0.196,0.296 c0.095,0.095,0.207,0.168,0.328,0.218c0.121,0.05,0.25,0.075,0.379,0.075c0.077,0,0.155-0.009,0.231-0.027l2.086-0.497 L0.523,51.933z'/%3E%3Cpath d='M52.618,2.631c-3.51-3.508-9.219-3.508-12.729,0L3.827,38.693C3.81,38.71,3.8,38.731,3.785,38.749 c-0.021,0.024-0.039,0.05-0.058,0.076c-0.053,0.074-0.094,0.153-0.125,0.239c-0.009,0.026-0.022,0.049-0.029,0.075 c-0.003,0.01-0.009,0.02-0.012,0.03l-2.495,10.48L5.6,54.182l10.48-2.495c0.027-0.006,0.051-0.021,0.077-0.03 c0.034-0.011,0.066-0.024,0.099-0.039c0.072-0.033,0.139-0.074,0.201-0.123c0.024-0.019,0.049-0.033,0.072-0.054 c0.008-0.008,0.018-0.012,0.026-0.02l36.063-36.063C56.127,11.85,56.127,6.14,52.618,2.631z M17.157,47.992l0.354-3.183 L39.889,22.43c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L16.097,43.395l-4.773,0.53l0.53-4.773l22.38-22.378 c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L10.44,37.738l-3.183,0.354L34.94,10.409l9.9,9.9L17.157,47.992z M46.254,18.895l-9.9-9.9l1.414-1.414l9.9,9.9L46.254,18.895z M49.082,16.067l-9.9-9.9l1.415-1.415l9.9,9.9L49.082,16.067z'/%3E%3C/g%3E%3C/svg%3E");
  }
  .del {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Layer_1' x='0px' y='0px' viewBox='0 0 473 473' style='enable-background:new 0 0 473 473;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M324.285,215.015V128h20V38h-98.384V0H132.669v38H34.285v90h20v305h161.523c23.578,24.635,56.766,40,93.477,40 c71.368,0,129.43-58.062,129.43-129.43C438.715,277.276,388.612,222.474,324.285,215.015z M294.285,215.015 c-18.052,2.093-34.982,7.911-50,16.669V128h50V215.015z M162.669,30h53.232v8h-53.232V30z M64.285,68h250v30h-250V68z M84.285,128 h50v275h-50V128z M164.285,403V128h50v127.768c-21.356,23.089-34.429,53.946-34.429,87.802c0,21.411,5.231,41.622,14.475,59.43 H164.285z M309.285,443c-54.826,0-99.429-44.604-99.429-99.43s44.604-99.429,99.429-99.429s99.43,44.604,99.43,99.429 S364.111,443,309.285,443z'/%3E%3Cpolygon points='342.248,289.395 309.285,322.358 276.323,289.395 255.11,310.608 288.073,343.571 255.11,376.533 276.323,397.746 309.285,364.783 342.248,397.746 363.461,376.533 330.498,343.571 363.461,310.608 '/%3E%3C/g%3E%3C/svg%3E");
  }
  #search {
    padding: 5px 10px;
  }
  .search, input[type="button"] {
    margin-left: auto;
    display: block;
  }
</style>