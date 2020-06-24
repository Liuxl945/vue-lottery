import axios from "axios"

// const URL = "http://127.0.0.1:30009"
const URL = "http://h5.nxsound.com/ih5/20_06lslz"

export default {
    async getAjax(object) {

        let form = new FormData()
        if(JSON.stringify(object) === "{}"){
            form = object
        }else{
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const element = object[key]
                    form.append(key,element)
                }
            }
        }
        

        let res = await axios({
            url: `${URL}/ajax.php`,
            method: 'post',
            data: form
        })

        return res
    },

    async getWxSdk() {
        let data = await axios({
            url: `${URL}/ajax_share.php`
        })

        return data
    }
}