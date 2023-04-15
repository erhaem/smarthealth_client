<template>
    <div>
        {{ idObat }}
    </div>
</template>
<script>
import axios from 'axios'
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            detailMedicines: '',
            idObat: []
        }
    },
    created() {
        const cookie = Cookies.get("user");
        const parsing = JSON.parse(cookie);
        console.log(parsing.data.token);
        this.idObat = this.$route.params.id
        axios.get('https://berobatplus.shop/api/master/obat/data_obat/' + this.idObat, {
            headers: {
                Authorization: "Bearer " + parsing.data.token
            }
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        })
    },
}
</script>