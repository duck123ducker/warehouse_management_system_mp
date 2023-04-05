import { use_store } from '../store'
import * as base64 from "base-64"
import { login } from './index'

uni.addInterceptor('request', {
    invoke(args) {
        args.url = 'https://xxx.xxx/api' + args.url
        const store = use_store()
        args.header.Authorization = 'Bearer ' + store.token
    },
	success(args) {
		if(args.data === 'expired') {
			uni.showToast({title: '未登录！请登录后再进行操作！',icon: 'none',duration: 2000,mask: false,})
		}else if(args.data === 'no permission') {
			uni.showToast({title: '权限不足！请联系管理员！',icon: 'none',duration: 2000,mask: false,})
		}
	},
})

async function req(url, params, method) {
    await check_exp(url);
    return uni.request({
        url: url,
        data: params,
        method: method,
        header: {},
    });
}

function get(url, params) {
    return req(url, params,'GET')
}

function post(url, params) {
    return req(url, params,'POST')
}

async function check_exp(url) {
    if(url !== '/login') {
        const store = use_store()
        const payload = store.token.split('.')[1]
        if(JSON.parse(base64.decode(payload)).exp < parseInt(Date.parse(new Date())/1000)) {
            const res_ = await login(uni.getStorageSync('id&passwd'))
            if(res_.code === 200){
                store.token = res_.data.token
                uni.SetStorageSync('token', res_.data.token)
            }
            else {
                store.token = null
                uni.removeStorageSync('token')
                uni.showToast({title: '登录已过期！请重新登录！', icon: 'none',})
            }
        }
    }
}
export default { get, post }
