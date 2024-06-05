const express=require("express")
const mongoose=require('mongoose')
const cors=require("cors")
const TeacherModel=require('./models/teacher')

const app=express();
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://inhouse123:inhouse123@cluster0.evihmre.mongodb.net/co_attainment", {
  dbName: "co_attainment", // Specify the database name separately
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.post("/login", (req, res) => {
//    console.log("connected")
  const { email, password } = req.body;
  TeacherModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.status(401).json("Invalid password");
        }
      } else {
        res.status(404).json("User not found");
      }
    })
    .catch(err => {
      console.error("Error during login:", err);
      res.status(500).json("An error occurred during login");
    });
});
app.post('/teachers',(req,res)=>{
  TeacherModel.create(req.body)
  .then(teachers=>res.json(teachers))
  .catch(err=>res.json(err))
})
app.listen(3005,()=>{
    console.log("server is running")
})