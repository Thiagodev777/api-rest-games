class Helpers {
    verifyType(title, price, year){
        if(typeof(title) === 'string' && typeof(price) === 'number' && typeof(year) === 'number') {
            return true
        } else {
            return false
        }
    }
    geraId(){
        return Math.floor(Math.random() * 1000)
    }
}
module.exports = Helpers;