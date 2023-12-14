
export const setCookie = (name, value) => {
    document.cookie = `${name}=${value}+; Path=/`
}
export const getCookie = (name) => {
    var co = document.cookie.split('; ')
    for (let i in co) {
        var cookie = co[i].split('=');
        if (cookie[0] === name) {
            console.log('extracting cookie');
            return cookie[1]
        }
    }
    return -1
}
export const deleteCookie = (name) => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'

}
