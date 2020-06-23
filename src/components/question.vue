<template>
    <div class="modal" v-if="show">
        <div class="content" v-if="!successShow && !errorShow">
            <img class="bg" src="../assets/image/qestion-bg.png" alt="" srcset="">
            <div class="title">
                <img src="../assets/image/1.png" alt="">
            </div>

            <div class="qeustion-answer">
                <div class="content-wapper">
                    <p>{{selectData.title}}</p>
                </div>

                <ul class="answer">
                    <li class="answer-item" v-for="item in selectData.answer" :key="item.tips" @click="selectAnswer">
                        <div class="order">{{item.tips}}</div>
                        <div class="item">{{item.name}}</div>
                        <div class="right-or-wrong" v-if="selectData.isAnser">
                            <img :src="item.yes ? right : wrong" >
                        </div>
                    </li>
                </ul>
            </div>
            
        </div>

        <div class="success-error" v-show="successShow || errorShow ">
            <img src="../assets/image/success.png" v-if="successShow" alt="成功">
            <img src="../assets/image/error.png" v-if="errorShow" alt="失败">
            <div class="close" @click="closeModal"></div>
            <div class="again" @click="again"></div>
            <div class="poster" @click="poster"></div>
        </div>
    </div>
</template>

<script>

const data = require("./question.json")

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
        dataindex: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            right: require("../assets/image/right.png"),
            wrong: require("../assets/image/wrong.png"),
            index: 0,
            successShow: false,
            errorShow: false,
            questionData: data
        }
    },
    computed: {
        selectData() {
            return this.questionData[this.dataindex][this.index]
        }
    },
    methods: {
        selectAnswer() {
            let index = this.index
            this.questionData[index].isAnser = true

            if(index === this.questionData.length -1 ){
                
                this.successShow = true
                return
            }
            setTimeout(() => {
                this.closeModal()
            },200)
        },
        closeModal() {
            this.cancle()
            this.index = 0
            this.errorShow = false
            this.successShow = false

            this.questionData.forEach(element => {
                element.isAnser = false
            })
        },
        again() {
            if(this.successShow){
                // 抽奖
                this.$store.commit("SET_INDEX", 2)

            }else{
                // 继续答题
                this.index = 0
                this.errorShow = false
            }
        },
        poster() {
            // 生成海报
            this.$store.commit("SET_INDEX", 3)
        }
    }
}
</script>

<style lang="scss" scoped>
@import url("../assets/modal.scss");

.content{
    width: 95%;
    position: relative;
    >img{
        width: 100%;
    }
    .title{
        position: absolute;
        height: 46px;
        top: 200px;
        left: 50%;
        transform: translateX(-50%);
        >img{
            height: 100%;
        }
    }
    .qeustion-answer{
        position: absolute;
        top: 320px;
        width: 76%;
        left: 50%;
        transform: translateX(-50%);
    }
    .content-wapper{
        background: #fff;
        padding: 40px;
        font-size: 30px;
        font-weight: 600;
        color: #b77500;
        text-align: justify;
        box-shadow: 0  2px 18px rgba(194, 110, 40, 0.33);
        border-radius: 15px;
        line-height: 44px;
        margin-bottom: 40px;
    }

    .answer-item{
        background: #aad26d;
        &:active{
            background: #a2ce5f;
        }
        height: 74px *1.17;
        align-items: center;
        margin-bottom: 20px;
        display: flex;
        border-radius: 15px;
        padding: 20px;
        color: #fff;
        font-size: 36px;
        .order{
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f0b245;
            height: 40px * 1.17;
            width: 40px * 1.17;
            border-radius: 44px;
            font-size: 40px;
        }
        .item{
            flex: 1;
            padding-left: 48px * 1.17;
        }
        
    }
}
.success-error{
    position: relative;
    width: 75%;
    img{
        width: 100%;
    }
    .close{
        position: absolute;
        right: 0;
        top: 120px;
        width: 70px;
        height: 70px;
    }
    .again{
        position: absolute;
        left: 50px;
        bottom: 0;
        width: 220px;
        height: 76px;
    }
    .poster{
        position: absolute;
        right: 30px;
        bottom: 0;
        width: 220px;
        height: 76px;
    }
}
</style>