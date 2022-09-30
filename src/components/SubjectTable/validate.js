const validateUnit = (unit) => {
    let res = {
        status:true,
        mess:''
    }
    if(unit.length===0){
        res.status=false
        res.mess= `Please input unit!`
    }
    return res
}

const validateDay = (day) => {
    let res = {
        status:true,
        mess:''
    }
    if(day.length===0){
        res.status=false
        res.mess= `Please input day!`
    }
    return res
}

const validateContent = (content, numChar) => {
    let regex =  /^[a-zA-Z0-9]+$/;
    let res = {
        status:true,
        mess:''
    }
    if(content.length<numChar){
        res.status=false
        res.mess= `Content must have least ${numChar} characters!`
    }
    else if( !regex.test(content) ){
        res.status=false
        res.mess= 'Only letters and numbers'
    }
    return res
}

const validateLearningObjective = (learningObjective) => {
    let res = {
        status:true,
        mess:''
    }
    if(learningObjective.length === 0){ 
        res.status=false
        res.mess= `Must have at least 1 learning objective`
    }
    return res
}

const validateDeliveryType = (deliveryType) => {
    let res = {
        status:true,
        mess:''
    }
    if(deliveryType.length===0){
        res.status=false
        res.mess= `Must have at least 1 delivery type`
    }
    return res
}

const validateTrainingMaterial = (trainingMaterial) => {
    let regex =  /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+.pptx*$/
    let res = {
        status:true,
        mess:''
    }
    if( !regex.test(trainingMaterial) ){
        res.status=false
        res.mess= 'Invalid pptx file'
    }
    return res
}

const validateDuration = (duration) => {
    let res = {
        status:true,
        mess:''
    }
    if(duration.length===0){
        res.status=false
        res.mess= `Please input duration!`
    }
    return res
}


export {validateUnit,validateDay,validateContent,validateLearningObjective,validateDeliveryType, validateTrainingMaterial,validateDuration}