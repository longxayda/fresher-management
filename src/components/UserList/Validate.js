

const ValidateUserName = (username,numChar) => {
    let regex =  /^[a-zA-Z0-9.]+$/;
    let res = {
        status:true,
        mess:''
    }
    if(username.length<numChar){
        res.status=false
        res.mess= `Username must have least ${numChar} characters!`
    }
    else if( !regex.test(username) ){
        res.status=false
        res.mess= 'Only letters and numbers'
    }
    return res
}
const ValidateEmail = (email) => {
    let regex =  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    let res = {
        status:true,
        mess:''
    }
    if( !regex.test(email) ){
        res.status=false
        res.mess= 'Invalid email'
    }
    return res
}
const ValidatePassword = (password) => {
    let res = {
        status:true,
        mess:''
    }
    if(password.length===0){
        res.status=false
        res.mess= `Please fill password`
    }
    return res
}
const ValidateRoleArr = (role) => {
    let res = {
        status:true,
        mess:''
    }
    if(role.length===0){
        res.status=false
        res.mess= `Must have at least 1 role`
    }
    return res
}

export {ValidateUserName,ValidateEmail,ValidatePassword,ValidateRoleArr}