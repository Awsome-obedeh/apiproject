// declear packages variables
const express=require("express")
const cors=require("cors")

const app=express()
const PORT=2000
// use cors and json()
app.use(cors())
app.use(express.json())

// dummy students daya
let students=[
    {id:1, name:"oluwasegun emmanuel", email:"emma@gmail.com" },
    {id:2, name:"akao emmanuel", email:"akao@gmail.com" },
    {id:3, name:"arthur ", email:"arthur@gmail.com" }
    
]

// get-  get's you data
app.get('/students', (req,res)=>{
    res.json(students)
})



// post
app.post('/students', (req,res)=>{
    // we need to take incoming data
    const {name,email}=req.body;
    // if students are not passed , tell the person to add studnets details 
    if(!name || !email){
        return res.status(400).json({msg:"student name and email are required"})

    }
    const newStudent={
        id:students.length+1,
        name:name,
        email:email
    }
    // add the new students record into the student list
    students.push(newStudent)
    // tell the user the student has been added successfully
    res.status(200).json(newStudent)


})
// put(update)
app.put("/students/:studentId", (req,res)=>{
    // get students id
    const studentId=parseInt(req.params.studentId)
    // get the data from thr query body
    const { name, email } = req.body;
   let  targetStudent=students.find((student)=> student.id ===studentId)
    // check if studet actually exists
 
    if(!targetStudent){
        return res.status(404).json({msg:'student not found'})
    }

    // replace student existing records with new records
    targetStudent.name=name || targetStudent.name
    targetStudent.email=email || targetStudent.email
    res.json(targetStudent)
})
// delete
app.delete("/students/:studentId", (req,res)=>{
    // tget the particular student id
    const studentId=parseInt(req.params.id)
    studnet=students.filter((student)=>student.id !==studentId)
    res.json({msg:"you have successfully deleted the student"})

})

// start teh application
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})

// HTTP STATUS CODE
// 200
// 201
// 400
// 404
// 500

