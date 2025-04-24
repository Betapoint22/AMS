const express = require('express');
const cors = require('cors');
const mssql = require('mssql');
const nodemailer = require('nodemailer');
const moment = require('moment');


const port = 3000;

let app = express();

app.use(express.urlencoded({extended : false}));
app.use(
    cors({
        origin : '*',
        methods : ['GET', 'POST', 'PUT' , 'DELETE'],
        allowHeaders : ['Content-Type']
    })
);

// const sqlConfig = {
//     server : '10.0.175.122',
//     user : 'SA',
//     password : 'Soulsvciot01',
//     database : 'asset',
//     // pool : {
//     //     max : 10,
//     //     min : 1,
//     //     idleTimeoutMillis : 3000
//     // },
//     options : {
//         encrypt : false,
//         trustServerCertificate : false
//     }
// }

// let count = 2;
// mssql.connect(sqlConfig, (err, result)=>{
//     if(err) throw err
//     else{
//         let query = `SELECT count(*) AS '${count}' FROM History INNER JOIN Employees ON Employees.emp_no=History.emp_id INNER JOIN department ON department.dept_name=Employees.dept_work where dept_work='COMMON ELECTRONICS ENGG' and SUBSTRING(movement_time,1,10) = '${moment().subtract(count, 'days').format('DD/MM/YYYY')}'`;
//         console.log(query);
//         let queryResult = mssql.query(query, (err, result)=>{
//             if(err) throw err
//             else{
//             console.log(result.recordset);
//             }
//         })

//     }
// });



// const moment = require('moment');


// // console.log(moment().format('ddd')) ;
// // console.log(moment().subtract(1, 'days').format('ddd'));

// let count = 0;
// let a = 22;
// let b = 16;
// let labelArr = [];
// for(let i = a; i >= b; i--){
//     let day = moment().subtract(count, 'days').format('ddd');
//     labelArr.push(day);
//     count++;
// }
// console.log(labelArr);

app.listen(port);


app.post('/getChartData1', (req, res)=>{
    res.send([['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],[1,2,3,4,5,6,7,8,9,10]]);
})

app.post('/getChartData2', (req, res)=>{
    res.send([['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'],[1,2,3,4,5,6,7,8,9,10]]);
})