<template>
    <div id="home">

        <v-loading v-if="!img1load" :progress="progress"></v-loading>

        <div class="bg">
            <div v-if="!gogogoshow" style="height:100%">
                <img @load="loading2" class="bg-1" src="../assets/image/index-bg1.jpg">
                <div class="logo">
                    <img class="animated"  src="../assets/image/logo.png" alt="logo" srcset="">
                </div>
            </div>

            <div class="sence" v-show="gogogoshow">
                <div style="height:100%">
                    <img @load="loading1" :style="imgStyle" src="../assets/image/long1.jpg" style="min-height:100%">
                </div>
                <!-- <canvas id="gameStage" :width="width" :height="height"></canvas> -->
                <canvas id="gameStage2" :width="width" :height="height"></canvas>
            </div>

            <div class="btn-go" @click.prevent="start">
                <div class="fixed"></div>
                <img ref="img" @load="loading3" v-show="!activeIndex" class="animated" src="../assets/image/btn.png" alt="开始">
                <img ref="img" @load="loading4" v-show="activeIndex" class="animated" src="../assets/image/jixu.png" alt="开始">
            </div>
            
            <div class="right" >
                <div class="btn" @click.prevent="myPriceShowFunc">我的奖品</div>
                <div class="btn" @click="ruleModal = true ">活动规则</div>
            </div>
        </div>

        <v-rule :show="ruleModal" :cancle="cancleRuleModal"></v-rule>
        <v-myprice :show="mypriceShow && (!!prize_id || prize_id === 0 )" :cancle="mypriceShowShowHide" :priceIndex="prize_id"></v-myprice>
        <v-question :show="questionModal" :dataindex="activeIndex" :cancle="cancleQuestionModal" :playagain="init"></v-question>
    </div>
    
</template>

<script>
import rule from "@/components/rule"
import question from "@/components/question"
import myprice from "@/components/myprice"
import loading from "@/components/loading"
import { mapState } from "vuex"
import API from "../api/index"
import axios from "axios"

// let img = new Image()
let img1 = new Image()
let img2 = new Image()
let img3 = new Image()
// img.src = require("../assets/image/long1.jpg")
img1.src = require("../assets/image/11.png")
img2.src = require("../assets/image/22.png")
img3.src = require("../assets/image/33.png")

let index_img = 1
let BOTTOM_PX = 700 //船的位置

export default {
    components: {
        "v-rule": rule,
        "v-question": question,
        "v-myprice": myprice,
        "v-loading": loading,
    },
    data() {
        return {
            mypriceShow: false, //我的奖品
            ruleModal: false,   //规则
            questionModal: false,
            ctx: null,
            imageIndex: 0,
            recodeIndex:0,
            mycanvas: null,
            gogogoshow: false,
            activeIndex: 0,
            height: "1334px",
            width: "750px",
            progress: "0%"
        }
    },
    mounted() {

        API.getAjax({
            type: "getUserInfo",
        }).then( res => {
            this.$store.commit("SET_USER_INFO",res.data.data)
        })
        
        setTimeout(() => {
            this.init()
            this.height = `${window.innerHeight}px`
            this.width = `${window.innerWidth}px`
            BOTTOM_PX = window.innerHeight/7*4
        },35)
        
    },
    beforeDestroy() {
        clearInterval(this.loop)
        clearInterval(this.loop2)
    },
    methods: {
        loading1() {
            this.isload1 = true
            if(this.isload2 && this.isload3 && this.isload4){
                this.$store.commit("SET_IMG1_LOAD",true)
            }
        },
        loading2() {
            this.isload2 = true
            if(this.isload1 && this.isload3 && this.isload4){
                this.$store.commit("SET_IMG1_LOAD",true)
            }
        },
        loading3() {
            this.isload3 = true
            if(this.isload2 && this.isload1 && this.isload4){
                this.$store.commit("SET_IMG1_LOAD",true)
            }
        },
        loading4() {
            this.isload4 = true
            if(this.isload2 && this.isload3 && this.isload1){
                this.$store.commit("SET_IMG1_LOAD",true)
            }
        },

        async myPriceShowFunc() {
            let res = await API.getAjax({
                type: "my_prize",
            })

            if(res.data.data){
                this.$store.commit("SET_PRIZE_ID",Number(res.data.data.prize_id))
                this.$store.commit("SET_NEED_INPUT", res.data.data.need_input)
            }
            // this.$store.commit("SET_PRIZE_ID", 0)
            // this.$store.commit("SET_NEED_INPUT", 0)
            
            this.mypriceShow = true
            if(!(!!this.prize_id || this.prize_id === 0 )){
                alert("暂无奖品")
            }
        },
        mypriceShowShowHide() {
            this.mypriceShow = false
        },
        init() {
            this.activeIndex = 0
            this.questionModal = false
            this.imageIndex = 0
            this.recodeIndex = 0
            this.gogogoshow = false


            setTimeout(() => {
                // this.mycanvas = document.getElementById('gameStage')
                this.mycanvas2 = document.getElementById('gameStage2')
                // this.ctx = this.mycanvas.getContext('2d')
                this.ctx2 = this.mycanvas2.getContext('2d')
                
                
                img1.onload = () => {
                    // this.$store.commit("SET_IMG2_LOAD",true)
                    this.ctx2.drawImage(img1,-80,BOTTOM_PX)
                }
                
            }, 300)
        },
        cancleRuleModal() {
            this.ruleModal = false
        },
        cancleQuestionModal() {
            this.questionModal = false
        },
        start(e) {
            if(!this.gogogoshow){
                this.gogogoshow = true
                this.renderCenes()

                clearInterval(this.loop2)
                this.loop2 = setInterval(() => {
                    index_img++
                    this.renderBoating()
                },400)

                return
            }else{
                clearInterval(this.loop) //再次清空定时器，防止重复注册定时器
                this.loop = setInterval(() => {
                    this.renderCenes()
                },60)
            }
        },
        renderCenes() {
            if(!this.ctx2 || this.activeIndex === 8){
                return
            }
            let height = window.innerHeight * 2
            
            this.imageIndex -= 10 * height / 1334
            this.recodeIndex -=10
            let arr = [-200,-1040,-2000,-2560,-3590,-4550,-5670,-6830]
            
            if(this.recodeIndex === arr[this.activeIndex]){
                this.activeIndex ++
                
                this.questionModal = true
                clearInterval(this.loop)
                return
            }
            // this.ctx.fillStyle = "#89ffef"
            // this.ctx.fillRect(0,0,this.mycanvas.width,this.mycanvas.height)
            // this.ctx.drawImage(img,this.imageIndex,0)
        },
        renderBoating() {
            let data
            if(index_img === 1){
                data = img1
            }else if(index_img === 2){
                data = img2
            }else if(index_img === 3){
                data = img3
                index_img = 0
            }
            
            this.ctx2.clearRect(0,0,this.mycanvas2.width,this.mycanvas2.height)
            this.ctx2.drawImage(data,-80,BOTTOM_PX)
        },
    },
    computed: {
        imgStyle() {
            return `
                -webkit-transform: translateX(${this.imageIndex}px);
                    transform: translateX(${this.imageIndex}px);`
        },
        ...mapState({
            img1load: state => state.img1load,
            prize_id: state => state.prize_id,
        })
    }
}
</script>

<style lang="scss" scoped>

@function rem($n){
  @return $n/(100)+rem;
}

/*变大变小*/
@keyframes bigAndSmall195 {
	0% {
		transform: scale(1, 1)
	}
	50% {
		transform: scale(0.95, 0.95)
	}
	100% {
		transform: scale(1, 1)
	}
}

@-webkit-keyframes bigAndSmall195 {
	0% {
		transform: scale(1, 1)
	}
	50% {
		transform: scale(0.95, 0.95)
	}
	100% {
		transform: scale(1, 1)
	}
}
.bigAndSmall {
	animation: 1.8s linear bigAndSmall195 infinite;
	-webkit-animation: 1.8s linear bigAndSmall195 infinite
}

#home{

    width: 100%;
    height: 100%;
    position:relative;
    overflow: hidden;
    .bg{
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .logo{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: rem(60);
        img{
            width: rem(300);
        }
    }
    .animated{
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-delay: 0.5s;
        animation: 1.8s linear bigAndSmall195 infinite;
    }
    .bg-1{
        min-height: 100%;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
    }
    .btn-go{
        z-index: 4;
        width: rem(178 * 1.5/2);
        height: rem(92 * 1.5/2);
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 8%;
        .fixed{
            position: absolute;
            width: rem(178 * 1.5/2);
            height: rem(92 * 1.5/2);
            z-index: 10;
        }
        img{
            width: rem(178 * 1.5/2);
            height: rem(92 * 1.5/2);
        }
    }
    .right{
        position: absolute;
        right: 0;
        bottom: 8%;

        .btn{
            margin: rem(14  * 1.17/2) 0;
            box-sizing: border-box;
            background: #e74244;
            color: #fff;
            border: rem(2/2) solid #f4ddc1;
            border-right: none;
            height: rem(42 * 1.17/2);
            text-align: center;
            line-height: rem(42 * 1.17/2);
            font-size: rem(24/2);
            width: rem(110 * 1.17/2);
            border-top-left-radius: rem(100/2);
            border-bottom-left-radius: rem(100/2);;
        }
    }

    .sence{
        overflow: hidden;
        z-index: 3;
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        #gameStage{
            position: absolute;
        }
        #gameStage2{
            left: 0;
            top: 0;
            position: absolute;
            z-index: 2;
        }
        img{
            height: 100%;
        }
    }
}
</style>