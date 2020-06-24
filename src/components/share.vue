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


@function rem($n){
  @return $n/(100)+rem;
}


.modal{
    width: rem(375);
    overflow: hidden;
    .content{
        width: 95%;
        img{
            width: rem(180);
            min-height: auto !important;
            position: absolute;
            right: rem(30);
            top: rem(30);
        }
    }
    .btn-close{
        margin: rem(15/2);
        width: rem(66 * 1.17/2);
        img{
            width: 100%;
        }
    }
}
</style>

