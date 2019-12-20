const Koa = require('koa')
const app = new Koa()
let cache =[];
app.use((ctx, next) => {
    if (ctx.url.indexOf('/api/') > -1) {
        let result = getApiData(ctx.url.split('/api/')[1])
    }
    async function getApiData(key){
        let cacheValue = null;
        cache.map((item,index)=>{
            if (item.key === key){
                cacheValue = item.value;
            }
        })
        if(cacheValue!=null){
            console.log(`缓存，${key}:${cacheValue}`);
            return cacheValue
        }else{
            let result = await new Promise(resolve=>{
                setTimeout(()=>{
                    let value = 'value'+key;
                    cache.push({key,value})
                    resolve(value)
                },300)
            })
            console.log(`请求，${key}:${result}`);
            return result;
        }
    }

    setInterval(() => {
        const hours = new Date().getHours();
        if(hours === 0){
            cache =[];
        }
    }, 1000 * 60 * 60 );
})

app.listen(3001,()=>{
    console.log('api已启动')
})