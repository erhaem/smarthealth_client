<template>
    <div>
        {{ indexIs }}
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            indexIs: this.$route.params.userIndex
        }
    },
}
</script>
  