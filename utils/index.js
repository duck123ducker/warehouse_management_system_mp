import {global} from './global'

async function get_package_info(pack_id, request_cache) {
    const res = await uni.request({
        url: global.url + '/pack',
        data: {
            package_id: pack_id
        }
    })
    request_cache.value.package_info[pack_id] = res.data
    return res.data
}
async function inbound(pack_id, num, method) {
    const res = await uni.request({
        url: global.url + '/update',
        method: 'POST',
        data: {
            method: (()=>method==='入库'?'inbound':'outbound')(),
            pack_id: pack_id,
            params: {
                num: num
            }
        }
    })
    return res.data
}
async function create(info) {
    const res = await uni.request({
        url: global.url + '/create',
        method: 'POST',
        data: info
    })
    return res.data
}
export { get_package_info, inbound, create }
