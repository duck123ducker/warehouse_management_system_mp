import {global} from './global'

async function get_package_info(pack_id, request_cache) {
    if (!request_cache.value.package_info.hasOwnProperty(pack_id)) {
        const res = await uni.request({
            url: global.url + '/pack',
            data: {
                package_id: pack_id
            }
        })
        request_cache.value.package_info[pack_id] = res.data
    }
    return request_cache.value.package_info[pack_id]
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
export { get_package_info, inbound }
