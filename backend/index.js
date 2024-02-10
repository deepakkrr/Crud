const express = require("express");
const app = express();
const cors = require("cors");


require("./db/config");
const User = require("./db/user");
const Product=require("./db/product")

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  //niche jo likhe hai isse jab teeno chiz dallenge toh password nhi dikhayega
  result=result.toObject();
  delete result.password;
  res.send(result);
  
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  if (req.body.email && req.body.password) 
  {
    let user = await User.findOne(req.body).select("-password");
    if (user) 
    {
      res.send(user);
    }
    else {
    res.send({ result: "NO USER FOUND" });
    }
  }
  else 
  res.send({ result: "NO USER FOUND" });
});

app.post("/add", async (req,res) =>{
  let product=new Product(req.body);
  let result=await product.save();
  res.send(result);
});

app.get("/products", async (req,res)=>{
  let products=await Product.find();
  if(products.length>0)
  {
    res.send(products);
  }
  else{
    res.send({result:"No Products Found"})
  }
});

app.delete("/product/:_id", async (req,res)=>{
  // res.send(req.params.id);
  const result=await Product.deleteOne(req.params);
  res.send(result);
  
});

//api for getting single product(updation ke liye)

app.get("/product/:_id", async (req,res)=>{
     let result=await Product.findOne(req.params);
     if(result)
        res.send(result);
    else
        res.send({result:"no result found"});

});

app.put("/product/:_id", async (req,res)=>{
  let result=await Product.updateOne(
    req.params,
    {$set:req.body}
  )
  res.send(result);
});

app.get("/search/:key", async (req,res)=>{
  let result=await Product.find({
    "$or":[
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}},
      {category:{$regex:req.params.key}}
      
    ]
  })
res.send(result);
})


app.listen(5000);
