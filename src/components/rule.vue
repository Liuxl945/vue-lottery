<template>
    <div class="modal" v-if="show">
        <div class="content">
            <img src="../assets/image/rule.png" alt="">
        </div>
        <div class="btn-close" @click="cancle()">
            <img src="../assets/image/close.png" alt="">
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
            width: 100%;
        }
    }
    .btn-close{
        margin: rem(15/2);
        width: rem(33 * 1.17) ;
        height: rem(66 * 1.17/2);
        img{
            width: 100%;
        }
    }
}
</style>


