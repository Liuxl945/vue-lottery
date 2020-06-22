<template>
    <div id="home">
        <div class="bg">
            <img class="bg-1" src="../assets/image/index-bg.jpg">
            <div class="logo">
                <img class="animated"  src="../assets/image/logo.png" alt="logo" srcset="">
            </div>

            <div class="sence" v-show="gogogoshow">
                <canvas id="gameStage" width="750px" height="1334px"></canvas>
            </div>

            <div class="btn-go" @click="initGo" @touchstart = start @touchend = end>
                <img class="animated" src="../assets/image/btn.png" alt="开始">
            </div>

            
            <div class="right">
                <div class="btn">我的奖品</div>
                <div class="btn" @click="ruleModal = true ">活动规则</div>
            </div>
        </div>
        
        

        <v-rule :show="ruleModal" :cancle="cancleRuleModal"></v-rule>
        <v-question :show="questionModal" :cancle="cancleQuestionModal"></v-question>
    </div>
</template>

<script>
import rule from "@/components/rule"
import question from "@/components/question"

let img = new Image()
img.src = require("../assets/image/long.png")



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
        setTimeout(() => {
            this.mycanvas = document.getElementById('gameStage')
            this.ctx = this.mycanvas.getContext('2d')
            img.onload = ()=> {
                
                this.ctx.drawImage(img,this.imageIndex,100)
                this.ctx.drawImage(img,this.imageIndex,0)
            }
            
        }, 20)
    },
    methods: {
        initGo() {
            if(!this.gogogoshow){
                this.gogogoshow = true
            }
        },
        cancleRuleModal() {
            this.ruleModal = false
        },
        cancleQuestionModal() {
            this.questionModal = false
        },
        start() {
        clearInterval(this.loop); //再次清空定时器，防止重复注册定时器
            this.loop = setInterval(() => {
                this.gogogo()
            },20);
        },
        end() {
            clearInterval(this.loop); //清空定时器，防止重复注册定时器
        },
        gogogo() {
            if(!this.ctx || this.activeIndex === 6){
                return
            }
            this.imageIndex -= 10
            
            if(this.imageIndex % 790 === 0){
                this.activeIndex ++
                alert(`场景${this.activeIndex}`)
                this.questionModal = true
                return
            }


            // this.cxt.fillRect(0,0,this.mycanvas.width,this.mycanvas.height)
            this.ctx.drawImage(img,this.imageIndex,0)
        }
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
        top: 100px;
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

        img{
            width: 178px * 1.17;
            height: 92px * 1.17;
        }
    }
    .right{
        position: fixed;
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
    }
}
</style>