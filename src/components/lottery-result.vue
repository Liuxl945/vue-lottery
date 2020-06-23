<template>
    <div class="modal" v-if="show">
        <div class="content first_prize" v-if="priceIndex === 1">
            <img src="../assets/image/first_prize.png" alt="一等奖">
            <img src="../assets/image/second_prize.png" alt="二等奖">
            <div class="form">
                <input type="text" value="" placeholder="姓名">
                <input type="text" value="" placeholder="电话">
                <input type="text" value="" placeholder="邮寄地址">
            </div>
            <div class="submit"></div>
        </div>

        <div class="money">
            <img v-if="priceIndex === 2" src="../assets/image/bingo.png" alt="现金红包">
            <img v-if="priceIndex === 3" src="../assets/image/none.png" alt="很抱歉">

            <div class="submit-btn">
                <div class="poster"></div>
                <div class="share"></div>
            </div>
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
            color: #ad8b50;
            text-align: center;
        }

        input::-webkit-input-placeholder{
            color:#ad8b50;
        }
        input::-moz-placeholder{   /* Mozilla Firefox 19+ */
            color:#ad8b50;
        }
        input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
            color:#ad8b50;
        }
        input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
            color:#ad8b50;
        }
    }
}

.money{
    .submit-btn{
        position: absolute;
        bottom: 0;
        background: darkblue;
        display: flex;
        flex-direction: column;
        >div{

            height: 88px;
            width: 100%;
            margin-bottom: 30px;
            background: firebrick;
        }
    }
}
</style>

