const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SCHEMA

const Students = new Schema({
    student_fName:{
        type: String
    },
    student_lName:{
        type: String
    },
    student_studentId:{
        type: Number
    },
    student_subjects:{
        type: [String]
    },
    student_year:{
        type: Number
    },
    student_grades:{
        type: String
    }
});

module.exports = mongoose.model('Students', Students);