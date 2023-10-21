const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Routers
const studentRoutes = express.Router();
const Student = require('./model/students.model');

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://thisiskalashgajjar:Kalash220504@thisiskalashgajjar.orzvxh6.mongodb.net/?retryWrites=true&w=majority',
{useNewUrlParser:true});

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

studentRoutes.route('/').get((req, res)=>{
    Student.find({})
    .then(students=>res.json(students))
    .catch(err=>console.log(err));
});

studentRoutes.route('/:id').get((req, res)=>{
    const id = req.params.id;
    Student.findById(id)
    .then(students => res.json(students))
    .catch(err=>console.log(err));
});

studentRoutes.route('/student').post((req, res)=>{
    console.log(req.body)
    let student = new Student(req.body);

    student.save()
    .then(todo=>{
        res.status(200).json({'student':'Saved Successfully'});
    })
    .catch(err=>{
        res.status(400).json({'student':err});
    })
});

studentRoutes.route('/student/:id').post((req, res)=>{
    let id = req.params.id;
    Student.findById(id, (student, err)=>{
        if (err)
            res.status(400).json({'student':err});
        else{
            //Assign new values to be updated
            student.student_fName = req.body.student_fName;
            student.student_lName= req.body.student_lName;
            student.student_studentId = req.body.student_studentId;
            student.student_subjects = req.body.student_subjects;
            student.student_year = req.body.student_year;
            student.student_grades = req.body.student_grades;

            //updating values in MongoDB
            student.save()
            .then(student=>{
                res.status(200).json({'student':'Saved Successfully'});
            })
            .catch(err=>{
                res.status(400).json({'student':err});
            });
        }
    })
});

// Delete One Student

studentRoutes.route('/:id').get((req, res)=>{
    const id = req.params.id;
    Student.remove(id)
    .then(students => res.json(students))
    .catch(err=>console.log(err));
});


app.use(studentRoutes);

app.listen(7777,()=>{
    console.log("Server is running at port 7777");
});