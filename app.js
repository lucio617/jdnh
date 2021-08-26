const express = require('express');
const http = require('http');
const app = express();
const port =process.env.PORT|| 3000;
const path = require('path');
var nodemailer=require('nodemailer');
// var bodyParser=require('body-parser')
// var urlencodedParser=bodyParser.urlencoded({extended : false});
// const mongoose = require('mongoose');
// const bodyparser = require('body-parser');

//mongoose.connect('mongodb://localhost/feedback', { useNewUrlParser: true });

//EXPRESS SPECIFIC STUFF
app.use('/css', express.static('css'));//serving static files such as fonts css etc.
app.use('/fonts', express.static('fonts'));
app.use('/images', express.static('images'));
app.use('/img', express.static('img'));
app.use('/js', express.static('js'));
app.use('/ultrasound', express.static('ultrasound'));
app.use('/operation theatre', express.static('operation theatre'));
app.use('/indoor', express.static('indoor'));
// app.use(express.urlencoded());
app.use(express.urlencoded({
    extended: true
  }))

app.set('view engine', 'html')
app.set('css', path.join(__dirname, 'css'))

// const feedbackSchema = new mongoose.Schema({
//     name: String,
//     number: String,
//     mail: String,//variable name and name="" value in html should be same
//     message: String
// });

// var feedback = mongoose.model('feedback', feedbackSchema);

//routes
app.get("/", (req, res) => {
   // const con = "This is the best content ";
   // const params = { 'title': 'PubG is the best game', 'content': con }
   // res.sendFile(__dirname + '/home.html', params);
     res.send("First get express app");
});


app.post("/",(req, res) => {
    
    console.log(req.body);
    const params={'message':'Your form has been submitted successfully'}
    //res.status(200).render("home.html",params)//dont use render in case of html files (use sendFile instead)
    res.sendFile(__dirname+'/home.html');
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'jdnh321@gmail.com',
            pass: 'myhospital'
        }

    });
    var details=req.body.name+req.body.mail+req.body.number+req.body.message;
    var mailOptions={
        from:'jdnh321@gmail.com',
        to:'culcruzader@gmail.com',
        subject:'response',
        text:details
    }
    
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log("mail sent")
        }
    });
    // var myData = new feedback(req.body);
    // myData.save().then(() => {
    //     res.send('This item has been saved to the database')
    // }).catch(() => {
    //     res.status(400).send('item was not saved to the databse')
    // })
})

//Heroku Check
if(process.env.NODE_EN=="production"){

}

app.listen(port, () => {
    console.log('Application started');
})
