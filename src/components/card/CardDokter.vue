<template>
    <div class="card border-0">
        <div class="row">
            <div class="col-6 py-2">
                    <img :src="Image" class="img-fluid rounded" alt="">
            </div>
            <div class="col-6 py-3 px-3">
                <p class="mb-1" style="font-size: 14px;"><b>{{ nama }}</b></p>
                <p class="text-secondary text-sm mb-1" :style="styleParagraph">
                    {{Label}}
                </p>
                <div class="d-flex justify-content-start" :style="styleParagraph">
                    <p class="rounded mb-1 me-1"><i class="ms-1 fa-solid fa-briefcase"></i> 1 tahun &nbsp;</p>
                    <p class="rounded mb-1"><i class="ms-1 fa-solid fa-thumbs-up"></i>
                        100% &nbsp;</p>
                </div>
                <div>
                    <p class="mb-1" :style="styleParagraph">Rp. {{ biaya }}</p>
                </div>
                <div class="pt-3">
                    <button class="btn btn-sm text-light w-50"
                        :style="styleButton">Chat</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            styleButton: {
                'background-color': '#00235B',
                'font-size': '12px'
            },
            styleParagraph: {
                'font-size': '12px'
            }
        }
    },
    props: {
        Image: {
            type: String,
            default: 'https://cdn-icons-png.flaticon.com/512/607/607414.png?w=740&t=st=1687343323~exp=1687343923~hmac=6ae1247f67266ade2cc56a174f395c19bebdea021b2e15d3d4a28ae32c3f2276'
        },
        nama: {
            type: String,
            default: ''
        },
        biaya: {
            type: String,
            default: ''
        },
        Label: {
            type: String,
            default: ''
        }
    }
}
</script>