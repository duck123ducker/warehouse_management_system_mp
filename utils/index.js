import request from './request'
import md5 from 'js-md5'

function get_package_info(pack_id, request_cache) {
    return request.get('/pack', {package_id: pack_id}).then((res) => {
        request_cache.value.package_info[pack_id] = res.data;
        return res.data;
    })
}
function inbound(pack_id, num, method) {
    return request.post('/update', {
        method: (() => method === '入库' ? 'inbound' : 'outbound')(),
        pack_id: pack_id,
        params: {
            num: num
        }
    }).then(res => res.data)
}
function create(info) {
    return request.post('/create', info).then(res => res.data)
}
function modify(info) {
    return request.post('/modify', info).then(res => res.data)
}

function login(info) {
    const info_ = JSON.parse(JSON.stringify(info))
    info_.passwd = md5(info_.passwd + 'duckDucker')
    return request.post('/login', info_).then(res => res.data)
}
export { get_package_info, inbound, create, modify, login }
