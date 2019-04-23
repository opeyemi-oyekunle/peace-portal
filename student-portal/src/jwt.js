export const getJwt = ()=>{
    return localStorage.getItem('accessToken')
}

export const getId = ()=>{
    return localStorage.getItem('id')
}

export const logout = ()=>{
    localStorage.removeItem('id')
    localStorage.removeItem('accessToken')
}
