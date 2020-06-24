<template>
    <div class="modal" v-if="show">
        <div class="content first_prize" v-if="(priceIndex === 1 || priceIndex === 0) && !shareBg">
            <img v-if="priceIndex === 0" src="../assets/image/mine_first_prize.png" alt="一等奖">
            <img v-if="priceIndex === 1" src="../assets/image/mine_second_prize.png" alt="二等奖">
            <div class="form" v-if="need_input === 1">
                <input type="text" v-model="username" placeholder="姓名" :readonly="need_input !== 1">
                <input type="text" v-model="phone" placeholder="电话" :readonly="need_input !== 1">
                <input type="text" v-model="address" placeholder="邮寄地址" :readonly="need_input !== 1">
            </div>
            <div class="submit" @click="changeCancle" :class="need_input === 1 ? 'show': ''">修改</div>
        </div>


        <div class="money" v-if="priceIndex !== 1 && priceIndex !== 0 && !shareBg">
            <div class="position" v-if="priceIndex === 3 || priceIndex === 6 || priceIndex === 5 || priceIndex === 4 ">
                <img  src="../assets/image/bingo.png" alt="现金红包">
                <img class="number" :src="numberType" alt="">
            </div>
            <img v-if="priceIndex === 2 || priceIndex === 7" src="../assets/image/none.png" alt="很抱歉">

            <div class="submit-btn">
                <div class="poster" @click.prevent="poster" v-if="priceIndex === 2 || priceIndex === 7"></div>
                <div class="share" @click.prevent="share"></div>
            </div>
        </div>

        <div class="share-bg" v-if="shareBg" @click="shareBg = false;cancle()">
            <img @click.stop src="../assets/image/share.png" alt="分享">
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex"
import API from "../api/index"

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
        },

    },
    data() {
        return {
            shareBg: false,
            username: "",
            phone: "",
            address: ""
        }
    },
    methods: {
        changeCancle() {
            if(this.need_input === 1){

                if(!this.username){
                    alert("请填写用户名")
                    return
                }
                if(!this.phone){
                    alert("请填写手机")
                    return
                }
                if(!this.address){
                    alert("请填写地址")
                    return
                }

                 API.getAjax({
                    type: "save_info",
                    username: this.username,
                    phone: this.phone,
                    address: this.address
                }).then(res => {
                    if(res.data.status === 1){
                        // 信息提交成功
                        alert("提交成功")
                    }
                    this.cancle()
                })
            }else{
                this.cancle()
            }
        },
        poster() {
            this.$store.commit("SET_INDEX", 3)
        },
        share() {
            if(!(this.priceIndex === 2 || this.priceIndex === 7)){
                this.cancle()
            }else{
                this.shareBg = true
            }
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
        },
        ...mapState({
            need_input: state => state.need_input,
        })
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

@function rem($n){
  @return $n/(100)+rem;
}

.modal{
    width: rem(375);
    overflow: hidden;
    .content,
    .money{
        width: 95%;
        img{
            width: 100%;
        }
    }
    .btn-close{
        margin: rem(15/2);
        width: rem(66  * 1.17/2);
        height: rem(66 * 1.17/2);
        img{
            width: 100%;
        }
    }
}

.first_prize{
    position: relative;
    .submit{
        opacity: 0;
        background: rgb(240, 127, 67);
        border-radius: rem(5);
        position: absolute;
        bottom: 0;
        left: 50%;
        width: rem(150);
        height: rem(44);
        transform: translateX(-50%);
        box-shadow: rem(-5/2) rem(5) rgb(238, 92, 61);
        text-align: center;
        text-align: center;
        line-height: rem(44);
        font-weight: 600;
        color: #fff;
        font-size: rem(16);
    }
    .show{
        opacity: 1 !important;
    }
    .form{
        width: 100%;
        position: absolute;
        top: 50%;
        border-radius: rem(10);
        display: flex;
        flex-direction: column;
        padding: rem(20) rem(50);
        input{
            padding: 0 rem(10);
            height: rem(44);
            margin-bottom: rem(10);
            border: none;
            font-size: rem(15);
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
        width: rem(128/2) !important;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 28%;
    }
    .submit-btn{
        position: absolute;
        bottom: 9%;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        >div{
            height: rem(30);
            width: rem(100);
            margin-bottom: rem(25/2);
        }
    }
}

.share-bg{
    position: absolute;
    left: 0;
    right: 0;
    top:0;
    bottom: 0;
    img{
        width: rem(200);
        position: absolute;
        right: rem(20);
        top: rem(20);
    }
}
</style>

