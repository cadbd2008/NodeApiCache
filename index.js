const request = require('request')
// //模拟调用api
setInterval(() => {
    mockData();
}, 500)
function mockData(){
    const requestUrl ='http://127.0.0.1:3001/api/';
    let parms = parseInt(Math.random()*100)
    let result = request(requestUrl + parms);
}