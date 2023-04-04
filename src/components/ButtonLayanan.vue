<template>
    <button :class="'btn btn-sm d-inline-flex align-items-center '+ Color">
       {{ Label }}
    </button>
</template>

<script>
export default {
    props: {
        Label: {
            type: String,
            default: 'Kunjungi'
        },
        Color: {
            type: String,
            default: 'btn-primary'
        }
    }
}
</script>