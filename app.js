const express = require('express')
const fileupload = require('express-fileupload')
const path = require('path');
var http = require('http')
var PythonShell = require('python-shell');

const spawn = require('child_process').spawn
const process = spawn('python',["./verify.py"])

const app = express()
app.set('view engine','ejs')
app.use(fileupload())



app.get("/",async(req,res,next)=>{
  res.status(200)
  res.render("index")
})


app.post("/upload",async(req,res,next)=>{

  try{
    if(req.files){


      const file = req.files.mFile
      const videotype = req.body.filename
      //console.log(videotype);
      const timeunique = new Date().getTime().toString()
      const filename = "Video.mp4";
      const savepath = path.join(__dirname,"public","uploads","GESTURE_PRACTICE_"+videotype+"_"+timeunique+"_"+filename)
      console.log(savepath);
      await file.mv(savepath)
      await pyscripts();

      // PythonShell.run('./verify.py', function (err) {
      //   if (err) throw err;
      //   console.log('finished');
      // });

      res.send({
        success:true,
        message:"File uploaded"
      });

      res.redirect('/')

    }



  }catch(error){
    console.log(error);
    res.send("Only API is being used")
  }
})



app.listen(8080||process.env.IP||'192.168.0.220'||'192.168.0.171' ||process.env.OPENSHIFT_NODEJS_IP||'192.168.1.4',()=>{
  console.log("Server started and listening on port 8080")
})
