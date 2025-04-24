let movements = document.getElementById('movementsChart');
let alerts = document.getElementById('alertsChart');


let config1 = {
    type : 'bar',
    data : {
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
        datasets : [{
            backgroundColor : '#3f9dec',
            data : [1,2,3,4,5,6,7]
        }]
    },
    options : {
        maintainAspectRatio : false
    }
}

let config2 = {
    type : 'bar',
    data : {
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
        datasets : [{
            backgroundColor : '#3f9dec',
            data : [7,6,5,4,3,2,1]
        }]
    },
    options : {
        maintainAspectRatio : false
    }
}

 let chart1 = new Chart(movements, config1);
 let chart2 = new Chart(alerts, config2);


 setChart1(chart1);
 setChart2(chart2);

 setInterval(()=>{
    setChart1(chart1, chart2);
}, 4000);

setInterval(()=>{
    setChart2(chart1, chart2);
}, 4000);

 function setChart1(chart1){
    $.post(
        "http://127.0.0.1:3000/getChartData1",
        {
            dept : sessionStorage.getItem('userDept')
        },
        function(result){
            // console.log(none);
            console.log(result);
            chart1.data.labels = result[0];
            chart1.data.datasets[0].data = result[1];
            chart1.update();
        }
    )
}

function setChart2(chart2){
    $.post(
        "http://127.0.0.1:3000/getChartData2",
        {
            dept : sessionStorage.getItem('userDept')
        },
        function(result){
            // console.log(result);
            console.log(result);
            chart2.data.labels = result[0];
            chart2.data.datasets[0].data = result[1];
            chart2.update();
        }
    )
}