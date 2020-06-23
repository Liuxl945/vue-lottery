<template>
    <div class="index">
        <div class="index-bg">
            <div class="back" @click.prevent="back"></div>
            <img class="bg-img" src="../assets/image/lottery-bg.jpg" alt="">

            <div class="content">
                <div class="go" @click="go">
                    <img src="../assets/image/go.png" alt="">
                </div>
                <div :style="initStyle">    
                    <img :style="rotateStyle" src="../assets/image/turntable.png" alt="">
                </div>
            </div>
        </div>

        <lottery-result :show="lotteryShow"></lottery-result>
    </div>
</template>

<script>

import lotteryResult from "../components/lottery-result"

const PRIZE_LIST = 8
const CIRCLE_ANGLE = 360



export default {
    components: {
        lotteryResult
    },
    data() {
        return {
            lotteryShow: true,
            lottery: [
                {
                    id: 0,
                    name: "1等奖"
                },
                {
                    id: 1,
                    name: "2等奖"
                },
                {
                    id: 2,
                    name: "再接再厉"
                },
                {
                    id: 3,
                    name: "3等奖"
                },
                {
                    id: 4,
                    name: "参与奖"
                },
                {
                    id: 5,
                    name: "5等奖"
                },
                {
                    id: 6,
                    name: "4等奖"
                },
                {
                    id: 7,
                    name: "再接再厉"
                }
            ],
            config: {
                duration: 4000, // 总旋转时间
                circle: 8, // 旋转圈数
                mode: "ease-in-out",
            },
            rotateAngle: 0, // 旋转角度
        }
    },
    created() {
        this.isRotating = false // 是否正在旋转
    },
    methods: {
        back() {
            this.$store.commit("SET_INDEX", 1)
        },
        go() {
            this.index = this.random(PRIZE_LIST - 1)
            this.rotating() // 开始旋转
        },
        random (max, min = 0) {
            return parseInt(Math.random() * (max - min + 1) + min)
        },
        rotating() {
            this.isRotating = true
            // 计算角度
            const angle = this.rotateAngle + this.config.circle * CIRCLE_ANGLE + (- this.rotateAngle % CIRCLE_ANGLE)
            this.rotateAngle = angle + this.index * CIRCLE_ANGLE / PRIZE_LIST

            setTimeout(() => {
                this.rotateOver()
            },this.config.duration + 1000)
        },
        rotateOver() {
            this.isRotating = false
            
            alert(this.lottery[this.index].name)
        }
    },
    computed: {
        rotateStyle () {
            return `
                -webkit-transition: transform ${this.config.duration}ms ${this.config.mode};
                transition: transform ${this.config.duration}ms ${this.config.mode};
                -webkit-transform: rotate(${this.rotateAngle}deg);
                    transform: rotate(${this.rotateAngle}deg);`
        },
        initStyle() {
            let angle = -(CIRCLE_ANGLE / PRIZE_LIST / 2)
            return `-webkit-transform: rotate(${angle}deg);
                      transform: rotate(${angle}deg);`
        }
    }
}
</script>

<style lang="scss" scoped>
.index,
.index-bg{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    .back{
        position: absolute;
        z-index: 110;
        left: 30px;
        top: 90px;
        width: 88px;
        height: 88px;
    }
    .bg-img{
        width: 100%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }
    .content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-40%);
        .go{
            z-index: 100;
            position: absolute;
            left: 50%;
            top: 47%;
            transform: translate(-50%,-50%);
        }
    }
}
</style>