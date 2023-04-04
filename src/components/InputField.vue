<template>
    <Field :name="Name" :type="type" class="form-control mb-3" :value="value" />
</template>

<script>
import { Field } from 'vee-validate';
export default {
    components: {
        Field
    },
    props: {
        Label: {
            type: String,
            default: "Username"
        },
        type: {
            type: String,
            default: "text"
        },
        Name: {
            type: String,
            default: "belumDiisi"
        },
        value: {
            type: String
        }
    },

}
</script>