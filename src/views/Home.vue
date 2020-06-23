<template>
    <div id="home">
        <div class="bg">
            <div v-if="!gogogoshow">
                <img class="bg-1" src="../assets/image/index-bg.jpg">
                <div class="logo">
                    <img class="animated"  src="../assets/image/logo.png" alt="logo" srcset="">
                </div>
            </div>

            <div class="sence" v-show="gogogoshow" >
                <canvas id="gameStage" width="750px" height="1334px"></canvas>
                <canvas id="gameStage2" width="750px" height="1334px"></canvas>
            </div>

            <div class="btn-go" @touchstart.prevent="start" @touchend.prevent="end">
                <div class="fixed"></div>
                <img class="animated" src="../assets/image/btn.png" alt="开始">
            </div>

            
            <div class="right" >
                <div class="btn">我的奖品</div>
                <div class="btn" @click="ruleModal = true ">活动规则</div>
            </div>
        </div>

        <v-rule :show="ruleModal" :cancle="cancleRuleModal"></v-rule>
        <v-question :show="questionModal" :dataindex="activeIndex" :cancle="cancleQuestionModal"></v-question>
    </div>
    
</template>

<script>
import rule from "@/components/rule"
import question from "@/components/question"
import axios from "axios"

let img = new Image()
let img1 = new Image()
let img2 = new Image()
let img3 = new Image()
img.src = require("../assets/image/long.png")
img1.src = require("../assets/image/11.png")
img2.src = require("../assets/image/22.png")
img3.src = require("../assets/image/33.png")

let index_img = 1
const BOTTOM_PX = 600 //船的位置

export default {
    components: {
        "v-rule": rule,
        "v-question": question
    },
    data() {
        return {
            ruleModal: false,
            questionModal: false,
            ctx: null,
            imageIndex: 0,
            mycanvas: null,
            gogogoshow: false,
            activeIndex: 1
        }
    },
    mounted() {
        this.imageIndex = 0
        this.gogogoshow = false

        setTimeout(() => {
            this.mycanvas = document.getElementById('gameStage')
            this.mycanvas2 = document.getElementById('gameStage2')
            this.ctx = this.mycanvas.getContext('2d')
            this.ctx2 = this.mycanvas2.getContext('2d')
            img.onload = ()=> {
                this.ctx.drawImage(img,this.imageIndex,100)
                this.ctx.drawImage(img,this.imageIndex,0)
            }
            img1.onload = () => {
                this.ctx2.drawImage(img1,-80,BOTTOM_PX)
            }
            
        }, 20)
    },
    beforeDestroy() {
        clearInterval(this.loop)
        clearInterval(this.loop2)
    },
    methods: {
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
                },200)

                return
            }else{
                clearInterval(this.loop) //再次清空定时器，防止重复注册定时器
                this.loop = setInterval(() => {
                    this.renderCenes()
                },20)
            }
        },
        end(e) {
            clearInterval(this.loop) //清空定时器，防止重复注册定时器
        },
        renderCenes() {
            if(!this.ctx || this.activeIndex === 6){
                return
            }
            this.imageIndex -= 20
            
            if(this.imageIndex % 800 === 0){
                this.activeIndex ++
                // alert(`场景${this.activeIndex}`)
                this.questionModal = true
                clearInterval(this.loop)
                return
            }

            this.ctx.drawImage(img,this.imageIndex,0)
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

            this.ctx2.drawImage(data,-80,BOTTOM_PX)
        },
    }
}
</script>

<style lang="scss" scoped>

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
        top: 60px;
    }
    .animated{
        animation-duration: 1s;
        animation-fill-mode: both;
        animation-delay: 0.5s;
        animation: 1.8s linear bigAndSmall195 infinite;
    }
    .bg-1{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-54%);
        width: 100%;
    }
    .btn-go{
        z-index: 4;
        width: 178px * 1.17;
        height: 92px * 1.17;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 120px;
        .fixed{
            position: absolute;
            width: 178px * 1.17;
            height: 92px * 1.17;
            z-index: 10;
        }
        img{
            width: 178px * 1.17;
            height: 92px * 1.17;
        }
    }
    .right{
        position: absolute;
        right: 0;
        bottom: 100px;

        .btn{
            margin: 14px  * 1.17 0;
            box-sizing: border-box;
            background: #e74244;
            color: #fff;
            border: 2px solid #f4ddc1;
            border-right: none;
            height: 38px * 1.17;
            text-align: center;
            line-height: 34px * 1.17;
            font-size: 24px;
            width: 110px * 1.17;
            border-top-left-radius: 100px;
            border-bottom-left-radius: 100px;;
        }
    }

    .sence{
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
            position: absolute;
            z-index: 2;
        }
    }
}
</style>