const express = require("express");
const { default: mongoose } = require("mongoose");
const { createproduct } = require("./controller/productController");
const productRouters = require('./routes/Product')
const server = express();

async function main(){

        await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce')
  
}
server.use(express.json())
server.use('/products', productRouters.router)
main().catch(()=> console.log("error"))

server.get('/', (req,res)=>{
    res.json({status:"success"})
})



server.listen(8080, ()=>{
    console.log(`server started`)
})
