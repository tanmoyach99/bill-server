const express=require('express');

const app=express();
const cors=require('cors');
const mongoose=require('mongoose');
const User = require('./models/user.js');
const jwt=require('jsonwebtoken');
const { createBill } = require('./controller/bill.js');
const { getBills } = require('./controller/bill.js');
const { removeBills } = require('./controller/bill.js');
const { updateBill } = require('./controller/bill.js');




app.use(cors());
app.use(express.json())
const PORT=5221;

mongoose.connect('mongodb+srv://tanmoy999:tanmoy99@cluster0.4x4xi.mongodb.net/powerhouse', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => console.log("db connected"))
  .catch((err) => console.log(`db connection err`, err));

app.post('/api/register',async(req,res)=>{

    try{
        await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });
       res.json({status:"ok"})

    }catch(err){
        console.log(err)
       res.json({status:"err",err:"something wrong"})
       
    }
     
});



app.post('/api/login',async(req,res)=>{

    try{
      const user=  await User.findOne({
          
            email:req.body.email,
            password:req.body.password
        });
        if(user){
            const token=jwt.sign({
                email:user.email,
                name:user.name

            },'secret23456');
           
            return res.json({status:'ok',user:true,email:user.email,name:user.name})
        }
        else{
            return res.json({status:'error',user:false})

        }
        

    }catch(err){
        res.json({status:"err",err:"something wrong"})
        console.log(err);
    }
     console.log(req.body)
    res.json({status:'ok'})
});

app.post('/api/create-bill',createBill);
// app.post('/api/bills',getBillList);
app.get('/api/billing-list',getBills);
app.delete('/api/delete-billing/:_id',removeBills)
app.put('/api/update-billing/:_id',updateBill)
app.listen(PORT,()=>{
    console.log('server is started')

})