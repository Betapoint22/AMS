app.post('/getChartData', (req, res)=>{

    let dataArr = [];
    let labelArr = [];
    let totalArr = [];
    let count = 0;
    let eCount = 0;
    let a = 22;
    let b = 16;
    for(let i = a; i >=b; i--){
        let query = `SELECT count(*) AS '${count}' FROM History INNER JOIN Employees ON Employees.emp_no=History.emp_id INNER JOIN department ON department.dept_name=Employees.dept_work where dept_work='COMMON ELECTRONICS ENGG' and SUBSTRING(movement_time,1,2) = '${i}'`;
        let day = moment().subtract(count, 'days').format('ddd');
        labelArr.push(day);
        count++;
        // console.log(query);
        let queryResult = mssql.query(query, (err, result)=>{
            if(err) throw err
            else{
                eCount++;
                let index = parseInt(Object.keys(result.recordset[0]));
                let value = parseInt(Object.values(result.recordset[0]));
                dataArr[index] = value;
                if(eCount == (a-b+1)){
                    totalArr.push(labelArr, dataArr);
                    console.log(dataArr);
                    res.send(totalArr);
                }
            }
        })
    }
})