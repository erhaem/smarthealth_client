<template>
    <div class="col">
        <input :type="type" :class="objectForm" :placeholder="placeHolder">
    </div>
</template>

<script>
export default {
    data(){
        return {
            objectForm: {
                'form-control': true
            }
        }
    },
    props: {
        type: {
            type: String,
            default: "text"

        },
        placeHolder: {
            type: String,
            default: "Belum Diisi"
        }
    }
}
</script>