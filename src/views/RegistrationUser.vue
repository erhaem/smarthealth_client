<template>
    <div :class="bodyStyle">
        <div class="row">
            <div class="col-6">
                <InputField placeHolder="nama"/>
                <SelectOption/>
            </div>
            <div class="col-6">
                <InputField placeHolder="kelas"/>
                <InputField placeHolder="email" :class="inputStyle"/>
            </div>
        </div>
    </div>
</template>
<script>
import InputField from '@/components/InputField.vue';
import SelectOption from '@/components/SelectOption.vue';
export default {
    data(){
        return{
            bodyStyle: {
                'container' : true,
                'pt-5': true,
            },
            inputStyle: {
                'pt-3': true
            }
        }
    },
    components: {
        InputField, SelectOption
    }
}
</script>