<template>
    <div class="modal" v-if="show" @click="cancle">
        <div class="content">
            <img @click.stop src="../assets/image/share.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        cancle: {
            type: Function,
            default: () => {
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/modal.scss");
.modal{
    .content{
        width: 95%;
        img{
            width: 360px;
            min-height: auto !important;
            position: absolute;
            right: 60px;
            top: 60px;
        }
    }
    .btn-close{
        margin: 15px;
        width: 66px  * 1.17;
        img{
            width: 100%;
        }
    }
}
</style>

