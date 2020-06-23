<template>
    <div class="modal" v-if="show">
        <div class="content first_prize" v-if="(priceIndex === 1 || priceIndex === 0) && !shareBg">
            <img v-if="priceIndex === 0" src="../assets/image/mine_first_prize.png" alt="一等奖">
            <img v-if="priceIndex === 1" src="../assets/image/mine_second_prize.png" alt="二等奖">
            <div class="form">
                <input type="text" value="" placeholder="姓名" readonly>
                <input type="text" value="" placeholder="电话" readonly>
                <input type="text" value="" placeholder="邮寄地址" readonly>
            </div>
            <div class="submit" @click="cancle()"></div>
        </div>

        <div class="money" v-if="priceIndex !== 1 && priceIndex !== 0 && !shareBg">
            <div class="position" v-if="priceIndex === 3 || priceIndex === 6 || priceIndex === 5 || priceIndex === 4 ">
                <img  src="../assets/image/bingo.png" alt="现金红包">
                <img class="number" :src="numberType" alt="">
            </div>
            <img v-if="priceIndex === 2 || priceIndex === 7" src="../assets/image/none.png" alt="很抱歉">

            <div class="submit-btn">
                <div class="poster" @click.prevent="poster"></div>
                <div class="share" @click.prevent="share"></div>
            </div>
        </div>

        <div class="share-bg" v-if="shareBg" @click="shareBg = false;cancle()">
            <img @click.stop src="../assets/image/share.png" alt="分享">
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
        },
        priceIndex: {
            type: Number,
            default: 2
        }
    },
    data() {
        return {
            shareBg: false,
        }
    },
    methods: {
        poster() {
            this.$store.commit("SET_INDEX", 3)
        },
        share() {
            this.shareBg = true
        }
    },
    computed: {
        numberType() {
            let priceIndex = this.priceIndex
            if(priceIndex === 3){
                return require("../assets/image/50r.png")
            }
            if(priceIndex === 6){
                return require("../assets/image/10r.png")
            }
            if(priceIndex === 5){
                return require("../assets/image/2r.png")
            }
            if(priceIndex === 4){
                return require("../assets/image/1r.png")
            }
        }
    },
    watch: {
        show() {
            this.shareBg = false
        }
    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/modal.scss");
.modal{
    .content,
    .money{
        width: 95%;
        img{
            width: 100%;
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

.first_prize{
    position: relative;
    .submit{
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 300px;
        height: 88px;
        transform: translateX(-50%);
    }
    .form{
        width: 100%;
        position: absolute;
        top: 540px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        padding: 40px 100px;
        input{
            padding: 0 20px;
            height: 88px;
            margin-bottom: 20px;
            border: none;
            font-size: 30px;
            font-weight: 600;
            color: #f17d48;
            text-align: center;
        }

        input::-webkit-input-placeholder{
            color:#f17d48;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#f17d48;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#f17d48;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#f17d48;
        }
    }
}

.money{
    position: relative;
    .position{
        
        position: relative;
    }
    .number{
        width: 128px !important;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 260px;
    }
    .submit-btn{
        position: absolute;
        bottom: 75px;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        >div{
            height: 60px;
            width: 200px;
            margin-bottom: 25px;
        }
    }
}

.share-bg{
    position: fixed;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    img{
        width: 360px;
        position: absolute;
        right: 60px;
        top: 60px;
    }
}
</style>

