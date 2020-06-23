import axios from "axios"

// const URL = "http://127.0.0.1:30009"
const URL = "http://h5.nxsound.com/ih5/20_06lslz"

export default {
    async getUserInfo() {
        let data = await axios({
            url: `${URL}/getUserInfo`
        })

        return data
    },

    async getWxSdk() {
        let data = await axios({
            url: `${URL}/ajax_share.php`
        })

        return data
    }
}