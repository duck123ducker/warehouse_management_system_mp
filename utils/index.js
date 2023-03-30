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

export { get_package_info }
