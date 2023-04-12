<template>
    <div class="container col-xxl-10 col-xl-10 px-4 py-4 bg-primary">
        <div class="row align-items-center g-lg-5 py-5">
            
        </div>
    </div>
</template>
<script>
import InputField from '@/components/InputField.vue';
import SelectOption from '@/components/SelectOption.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
export default {
    data() {
        return {
            bodyStyle: {
                'container': true,
                'pt-5': true,
            },
            inputStyle: {
                'pt-3': true
            }
        }
    },
    components: {
        InputField, SelectOption, HeaderComponent, FooterComponent
    }
}
</script>