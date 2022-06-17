<template>
    <div class="modal">
        <div class="modal__overflow" @click="data.showModal = false, data.editModal = false"></div>
        <div class="modal__content">
            <div class="form__title">{{title}}</div>
            <form ref="addItem" action="" v-if="!data.editModal">
                <div>
                    <span> Тип оборудования</span>
                    <input type="text" :class="{error:valid.type}" v-model="form.type">
                </div>
                <div>
                    <span> Серийные номера</span>
                    <input type="text" :class="{error:valid.number}" name="" id="" v-model="form.number">
                </div>
                <div>
                    <span> Примечание</span>
                    <textarea name="" id="" v-model="form.desc" :class="{error:valid.desc}"></textarea>
                </div>
                <button type="button" @click="add()">{{ button }}</button>
            </form>
            <form ref="addItem" action="" v-else>
                <div>
                    <span> Тип оборудования</span>
                    <input type="text" v-model="edit.type" :class="{ error: valid.type }">
                </div>
                <div>
                    <span> Серийные номера</span>
                    <input type="text" name="" id="" v-model="edit.number" :class="{ error: valid.number }">
                </div>
                <div>
                    <span> Примечание</span>
                    <textarea name="" id="" v-model="edit.desc" :class="{error:valid.desc}"></textarea>
                </div>
                <button type="button" @click="add()">{{ button }}</button>
            </form>
            {{ valid }}
        </div>

    </div>
</template>

<script setup>
    import { reactive, computed } from 'vue'
    import { useDataStore } from '@/stores/data'

    const data = useDataStore()
    const edit = computed(() => {
        if(data.editModal) {
            return data.data[data.editItem]
        } else {
            data.editItem = ''
        }
    })

    const title = computed(() => {
        return !data.editModal ? 'Добавить запись' : 'Изменить запись'           
    })

    const button = computed(() => {
        return !data.editModal ? 'Добавить' : 'Изменить'           
    })
    const form = reactive({
        type: '',
        number: '',
        desc: ''           
    })
    const valid = computed(() => {
        let arr = {}
        if (data.editModal) {
            console.log(edit.value)
            arr = {
                error: edit.value.type.length < 5 || edit.value.number.length < 5 || edit.value.desc.length < 5,
                type: edit.value.type.length < 5,
                number: edit.value.number.length < 5,
                desc: edit.value.desc.length < 5,
            }
        } else {
            arr = {
                error: form.type.length < 5 || form.number.length < 5 || form.desc.length < 5,
                type: form.type.length < 5,
                number: form.number.length < 5,
                desc: form.desc.length < 5,
            }
        }
        return arr
    })

    
    const add = () => {    
        if (!valid.value.error) {

            if(data.editModal) {  
                let arr = {
                    id: edit.value.id,
                    type: edit.value.type,
                    number: edit.value.number,
                    desc: edit.value.desc
                }          
                data.edit(arr)
            } else {
                data.idList += 1
                let arr = {
                    id: data.idList,
                    type: form.type,
                    number: form.number,
                    desc: form.desc
                }
                data.add(arr)
            }
            
            form.type = '';
            form.number = '';
            form.desc = '';

            data.showModal = false      
            data.editModal = false
            data.editItem = ''
        }
    }


</script>

<style scoped>
    .modal {
        display: none;
        min-height: 0;
        overflow: hidden;
    }
    .modal.show {
        display: block;
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    select, input, textarea {
        margin: 20px 0;
        height: 30px;
    }
    textarea {
        width: 500px;
        height: 100px;
    }
    .modal__overflow {
        width: 100%;
        height: 100%;
        background: #000;
        opacity: .7;
    }
    .modal__content {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50%;
        padding: 50px;
        background: #fff;
    }
    .error {
        border: 1px solid #8b0707;
        border-radius: 5px;
    }
    .form__title {
        font-size: 24px;
        font-weight: bold;
    }
    .modal__content form > div {
        display: flex;
        flex-direction: column;
        margin: 20px 0;
    }
</style>
