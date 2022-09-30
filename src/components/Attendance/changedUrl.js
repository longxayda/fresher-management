function setTime() {
    var today = new Date();
    var time = today.getHours();
    var text = ""
    var tmp = text
    // if (time == 7 || time == 11 || time == 17 || time == 18 || time == 20){
        var possible = "abcdefghijklmnopqrstuvwxyz123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log(text)
    // }
    return text;

}

export default setTime;