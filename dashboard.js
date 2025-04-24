$(document).ready(function(){
    if(sessionStorage.getItem('sessionVar') != 'pass'){
        window.location.href = `./index.html`;
    }
    else{
        let navOpts = document.querySelector('.sideNav');

        if(sessionStorage.getItem('sessionVar') == 'pass'){
            navOpts.innerHTML = `
            <ul>
                <li>
                    <a href="./dashboard.html"><i class='bx bxs-dashboard'></i></a> <!--Dashboard -->
                </li>
                <li>
                    <a href="./alerts.html"><i class='bx bxs-bell' ></i></a> <!--Alert -->
                </li>
                <li>
                    <a href="./requests.html"><i class='bx bxs-layer' ></i></a> <!--Request -->
                </li>
                <li>
                    <a href="./settings2.html"><i class='bx bxs-user'></i></a> <!--Request -->
                </li>
                <li>
                        <a href="#" id="logoutBtn"><i class='bx bx-log-out-circle'></i></a>
                    </li>
            </ul>`;
        }
        else if(sessionStorage.getItem('sessionVar') == 'userPass'){
            navOpts.innerHTML =`
            <ul>
                <li>
                    <a href="./userDash.html"><i class='bx bxs-dashboard'></i></a> <!--Dashboard -->
                </li>
                <li>
                    <a href="./settings2.html"><i class='bx bxs-user'></i></a> <!--Request -->
                </li>
                <li>
                        <a href="#" id="logoutBtn"><i class='bx bx-log-out-circle'></i></a>
                    </li>
            </ul>`;
        }


        let logout = document.getElementById('logoutBtn');
        logout.addEventListener('click', ()=>{
            $.post(
                "http://127.0.0.1:3000/logout",
                {
                    userMail : sessionStorage.getItem('userMail')
                },
                function(result){
                    sessionStorage.setItem('sessionVar', null);
                    window.location.href = `./index.html`;
                }
            )
        });

                    //  cards 
        //  assts card
        let totalAssets = document.getElementById('totalAssets');
        let availableAssets = document.getElementById('availableAssets');
        let onMoveAssets = document.getElementById('onMoveAssets');
        // tags card
        let totalTags = document.getElementById('totalTags');
        let avaiableTags = document.getElementById('availableTags');
        let assignedTags = document.getElementById('assignedTags');

        // readers card
        let totalReaders = document.getElementById('totalReaders');
        let onlineReaders = document.getElementById('onlineReaders');
        let offlineReaders = document.getElementById('offlineReaders');

        // charts

        // movements chart
        // let movements = document.getElementById('movementsChart');

        // alerts chart
        // let alerts = document.getElementById('alertsChart');

        // table holder
        let tableHolder = document.getElementById('tableHolder');

        // tile holder
        let tileHolder = document.getElementById('tileHolder');

        // performance panel 
        let performancePanel = document.getElementById('performancePanel');

        let count = 1;

//  setting up charts 

let movements = document.getElementById('movementsChart');
let alerts = document.getElementById('alertsChart');


let config1 = {
    type : 'bar',
    data : {
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
        datasets : [{
            // backgroundColor : '#3f9dec',
            backgroundColor : '#28cc84',
            // backgroundColor : '#262f5a',
            data : [1,2,3,4,5,6,7]
        }]
    },
    options : {
        plugins : {
            legend : {display : false}  
        },
        maintainAspectRatio : false
    }
}

let config2 = {
    type : 'bar',
    data : {
        labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
        datasets : [{
            // backgroundColor : '#3f9dec',
            backgroundColor : '#28cc84',
            // backgroundColor : '#262f5a',
            data : [7,6,5,4,3,2,1]
        }]
    },
    options : {
        plugins : {
            legend : {display : false}  
        },
        maintainAspectRatio : false
    }
}

 let chart1 = new Chart(movements, config1);
 let chart2 = new Chart(alerts, config2);



        // let opts 
        // let chartTypeBtn = document.getElementById('');
        setCards(totalAssets, availableAssets, onMoveAssets, totalTags, avaiableTags, assignedTags, totalReaders, onlineReaders, offlineReaders);
        setChart1(chart1);
        setChart2(chart2);
        // setChart(movements, 'bar', alerts, 'bar', 1);
        setTable(tableHolder);
        setTiles(tileHolder);
        setPerformancePanel(performancePanel);

        setInterval(()=>{
            setCards(totalAssets, availableAssets, onMoveAssets, totalTags, avaiableTags, assignedTags, totalReaders, onlineReaders, offlineReaders);
        }, 5000);
        // setInterval(()=>{
        //     // setChart(chart1, chart2);
        //     setChart(movements, 'bar', alerts, 'bar', 1);
        // }, 10000);

        // setInterval(()=>{
        //     if(count == 1){
        //         setChart(movements, 'bar', alerts, 'bar', 1);
        //         count++;
        //     }
        //     else if(count == 2){
        //         setChart(movements, 'bar', alerts, 'bar', 2);
        //         count--;
        //     }
        // }, 5000);
        setInterval(()=>{
            setChart1(chart1);
            // setChart1(chart1, chart2);
        }, 4000);
        setInterval(()=>{
            // setChart(chart1, chart2);
            setChart2(chart2);
        }, 4000);
        setInterval(()=>{
            setTable(tableHolder);
        }, 5000);
        setInterval(()=>{
            setTiles(tileHolder);
        }, 5000);
        setInterval(()=>{
            setPerformancePanel(performancePanel);
        }, 5000);
    }
})

function setCards(el1, el2, el3, el4, el5, el6, el7, el8, el9){
    // console.log(1);
    $.post(
        "http://127.0.0.1:3000/setCards",
        {
            userDept : sessionStorage.getItem('userDept')
        },
        function(result){
            el1.innerText = result[0];
            el2.innerText = result[1];
            el3.innerText = result[2];

            el4.innerText = result[3];
            el5.innerText = result[4];
            el6.innerText = result[5];

            el7.innerText = result[6];
            el8.innerText = result[7];
            el9.innerText = result[8];
        }
    );
}
function setChart1(chart1){
    $.post(
        "http://127.0.0.1:3000/getChartData1",
        {
            dept : sessionStorage.getItem('userDept')
        },
        function(result){
            // console.log(none);
            // console.log(result);
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
            // console.log(result);
            chart2.data.labels = result[0];
            chart2.data.datasets[0].data = result[1];
            chart2.update();
        }
    )
}

function setTable(panel){
    // console.log(3);
    $.post(
        "http://127.0.0.1:3000/setTable",
        {
            userDept : sessionStorage.getItem('userDept')
        },
        function(result){
            let arr = ['serial no.','asset id','date', 'time', 'custodian name','custodian id','requestor name','requestor id','request status', 'starting point', 'destination'];
            let element =  document.querySelector('table');
            element.remove();
            let table = document.createElement('table');
            table.className = 'dynamicTable';
            let thead = document.createElement('thead');
            let tbody = document.createElement('tbody');
            let tr = document.createElement('tr');

            for(let i = 0; i<arr.length; i++){
                let th = document.createElement('th');
                th.innerText = arr[i];
                tr.appendChild(th);
            }
            thead.append(tr);

            for(let x in result){
                let row = tbody.insertRow(x);
                for(let i = 0; i < Object.values(result[x]).length; i++){
                    if( Object.values(result[x])[i] != null){
                    row.insertCell(i).innerText = Object.values(result[x])[i];
                    }
                    else{
                        row.insertCell(i).innerText = 'NA';  
                    }
                } 
            }
            table.append(thead);
            table.append(tbody);
            panel.append(table); 
        }
    )
}
function setTiles(panel){
    // console.log(4);
    $.post(
        "http://127.0.0.1:3000/getTileData",
        function(result){
            let emptyTile = document.querySelectorAll('.tile');
            for(let i = 0; i < emptyTile.length; i++){
                emptyTile[i].remove();
            }
            let len = result[0].length;
            for(let i = 0; i < len; i++){
                let tile = document.createElement('section');
                tile.className = 'tile';
                let tileHeader = document.createElement('div');
                tileHeader.className = 'deptName';
                let tileData = document.createElement('div');
                tileData.className = 'deptAssets';

                tileHeader.innerText = result[0][i];
                tileData.innerText = result[1][i];

                tile.append(tileHeader, tileData);
                panel.append(tile);
            }
        }
    )
}

function setPerformancePanel(performancePanel){
    // console.log(5);
    $.post(
        "http://127.0.0.1:3000/getPerformanceData",
        function(result){
            // console.log(result);
            let emptyPtile = document.querySelectorAll('.ptile');
            for(let i = 0; i < emptyPtile.length; i++){ 
                emptyPtile[i].remove();
            }
            let len = result[0].length;
            for(let i = 0; i < len; i++){
                let tile = document.createElement('section');
                tile.className = 'ptile';
                let tileHeader = document.createElement('div');
                tileHeader.className = 'tileName';
                let tileData = document.createElement('div');
                tileData.className = 'tileValue';

                tileHeader.innerText = result[0][i];
                tileData.innerText = result[1][i];

                tile.append(tileHeader, tileData);
                performancePanel.append(tile);
            }
        }
    )
}

// Request asset form script

let reqName = document.getElementById('reqName');
let reqID = document.getElementById('reqID');
let assetID = document.getElementById('assetID');
let assetDept = document.getElementById('assetDept');
let source = document.getElementById('source');
let destination = document.getElementById('destination');


let assetForm = document.getElementById('assetForm');
let assetFormFront = document.getElementById('assetFormFront');
let assetFormBack = document.getElementById('assetFormBack');
let submitAssetForm = document.getElementById('submitAssetForm');
let modal = document.querySelectorAll('.modal');

let launchRequestForm = document.getElementById('launchRequestForm');


let contactModalCounter = 0;
let assetModalCounter = 0;
let formResponseCounter = 0;
let formSliderCounter = 0;
let formCounter = 0;

submitAssetForm.addEventListener('click', (e)=>{
    e.preventDefault();
    let reqNameValue = reqName.value;
    let reqIDValue = reqID.value;
    let assetIDValue = assetID.value;
    let assetDeptValue = assetDept.value;
    let sourceValue = source.value;
    let destinationValue = destination.value;

    let inputState1 = inputCheck(reqName, reqNameValue, 'string');
    let inputState2 = inputCheck(reqID, reqIDValue, 'number');
    let inputState3 = inputCheck(assetID, assetIDValue, 'number');
    let inputState4 = inputCheck(assetDept, assetDeptValue, 'string');
    let inputState5 = inputCheck(source, sourceValue, 'string');
    let inputState6 = inputCheck(destination, destinationValue, 'string');
 

    if(inputState1 && inputState2 && inputState3 && inputState4 && inputState5 && inputState6){
        if(sourceValue.trim().toUpperCase() != destinationValue.trim().toUpperCase()){
        $.post(
            "http://127.0.0.1:3000/reqAsset",
            {
                reqName : reqNameValue,
                reqID : reqIDValue,
                assetID : assetIDValue,
                assetDept : assetDeptValue,
                source : sourceValue,
                destination : destinationValue
            },
            function(result){
                // console.log(result);
                let icon = assetFormBack.querySelector('.responseIcon');
                let responseTitle = assetFormBack.querySelector('.responseTitle');
                let responseMsg = assetFormBack.querySelector('.responseMsg');

                if(parseInt(result[0]) == 1){
                    // query failure
                    icon.classList.remove('bx');
                    icon.classList.remove('bx-sad');
                    icon.className = 'bx bx-party responseIcon';
                    responseTitle.innerText = 'Request received';
                    responseMsg.innerText = result[1];
                    assetFormBack.style.backgroundColor = '#A6DBCB';
                    assetFormFront.style.transform = 'perspective(600px) rotateY(-180deg)';
                    assetFormFront.style.transition = 'transform 0.6s linear';
                    assetFormBack.style.transform = 'perspective(600px) rotateY(0deg)';
                    assetFormBack.style.transition = 'transform 0.6s linear';
                }
                else if(parseInt(result[0]) == 2){
                    // condition not satisfied
                    icon.classList.remove('bx');
                    icon.classList.remove('bx-sad');
                    icon.className = 'bx bx-party responseIcon';
                    responseTitle.innerText = 'Request Denied';
                    responseMsg.innerText = result[1];
                    assetFormBack.style.backgroundColor = '#f76045';
                    assetFormFront.style.transform = 'perspective(600px) rotateY(-180deg)';
                    assetFormFront.style.transition = 'transform 0.6s linear';
                    assetFormBack.style.transform = 'perspective(600px) rotateY(0deg)';
                    assetFormBack.style.transition = 'transform 0.6s linear';
                }
                else if(parseInt(result) == 3){
                    // auxillery message for condition not satisfied
                    icon.classList.remove('bx');
                    icon.classList.remove('bx-sad');
                    icon.className = 'bx bx-party responseIcon';
                    responseTitle.innerText = 'Request denied';
                    responseMsg.innerText = 'Asset alread present at the destination'
                    assetFormBack.style.backgroundColor = '#f76045';
                    assetFormFront.style.transform = 'perspective(600px) rotateY(-180deg)';
                    assetFormFront.style.transition = 'transform 0.6s linear';
                    assetFormBack.style.transform = 'perspective(600px) rotateY(0deg)';
                    assetFormBack.style.transition = 'transform 0.6s linear';
                }
                else{
                    icon.classList.remove('bx');
                    icon.classList.remove('bx-sad');
                    icon.className = 'bx bx-party responseIcon';
                    responseTitle.innerText = 'Request Denied';
                    responseMsg.innerText = 'Unknown error'
                    assetFormBack.style.backgroundColor = '#A6DBCB';
                    assetFormFront.style.transform = 'perspective(600px) rotateY(-180deg)';
                    assetFormFront.style.transition = 'transform 0.6s linear';
                    assetFormBack.style.transform = 'perspective(600px) rotateY(0deg)';
                    assetFormBack.style.transition = 'transform 0.6s linear';
                }
            }
        )
        }
        else{
            let element1 = source.parentElement.nextElementSibling;
            let element2 = destination.parentElement.nextElementSibling;
            element1.innerText = `Value cannot be same`;
            element2.innerText = `Value cannot be same`;
            element1.style.visibility = `visible`;
            element2.style.visibility = `visible`;
        }
    }
});

$('.clearfield').click(function(e){
    e.preventDefault();
    this.previousElementSibling.value = '';
});

$('.closeformModal').click(function(e){
    e.preventDefault();
    // console.log('hey');
    let element = this.parentElement;
    element.style.top = '0%';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, -110%)';
})

$('.closeModal').click(function(e){
    e.preventDefault();
    let element = this.parentElement.parentElement;
    element.style.top = '0%';
    element.style.left = '50%';
    element.style.transform = 'translate(-50%, -110%)';
})

function inputCheck(element, elementValue, type){
    // console.log(type);
    errMsgElement = element.parentElement.nextElementSibling;
    // console.log(errMsgElement);
    if(elementValue.trim() == 0){
        // message to be shown if the field is 0
        let errMsg = `Field cannot be empty`;
        errMsgElement.innerText = errMsg;
        errMsgElement.style.visibility = 'visible';
        return 0;
    }  
    else if(typeCheck(elementValue, type) == 0){
        // message to be shown if the type doesnt match
        let errMsg = `Field has to be a ${type}`;
        errMsgElement.innerText = errMsg;
        errMsgElement.style.visibility = 'visible';
        return 0;
    }
    else{
        let errMsg = `Error Message`;
        errMsgElement.value = errMsg;
        errMsgElement.style.visibility = 'hidden';
        return 1;
    }
}

function typeCheck(elementValue, type){
    if(type == 'string' && isNaN(elementValue) == false){
        return 0;
    }
    else if(type == 'number' && isNaN(elementValue) == true){
        return 0;
    }
    else{
        return 1;
    }
}


launchRequestForm.addEventListener('click', (e)=>{
    e.preventDefault();

    reqName.value = sessionStorage.getItem('userName');
    reqID.value = sessionStorage.getItem('userID');
    assetDept.value = sessionStorage.getItem('userDept');

    reqName.readOnly = true;
    reqID.readOnly = true;
    assetDept.readOnly = true;
    // d2dae7
    reqName.style.backgroundColor = '#afb5bd';
    reqID.style.backgroundColor = '#afb5bd';
    assetDept.style.backgroundColor = '#afb5bd';


    // console.log(1);
    for(let i = 0; i < modal.length; i++){
        if(modal[i].id != assetForm.id){
            modal[i].style.top = `0%`;
            modal[i].style.transform = `translate(-50%, -110%)`;
            contactModalCounter = 0;
        }
    }
    if(assetModalCounter == 0){
        // console.log('there');
        assetFormFront.style.transform = 'perspective(600px) rotateY(0deg)';
        assetFormFront.style.transitiion = 'none';
        assetFormBack.style.transform = 'perspective(600px) rotateY(180deg)';
        assetFormBack.style.transitiion = 'none';
        assetForm.style.transition = `all 0.4s ease-in-out 0s`;
        assetForm.style.top = `50%`;
        assetForm.style.transform = `translate(-50%, -50%)`;
        assetModalCounter = 1;
    }
    else if(assetModalCounter == 1){
        // console.log('here');
        assetForm.style.top = `0%`;
        assetForm.style.transition = `all 0.4s ease-in-out 0s`;
        assetForm.style.transform = `translate(-50%, -110%)`;
        assetModalCounter = 0;
    }

})


// 
// let movements = document.getElementById('movementsChart');
// let alerts = document.getElementById('alertsChart');


// let config1 = {
//     type : 'bar',
//     data : {
//         labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
//         datasets : [{
//             backgroundColor : '#3f9dec',
//             data : [1,2,3,4,5,6,7]
//         }]
//     },
//     options : {
//         maintainAspectRatio : false
//     }
// }

// let config2 = {
//     type : 'bar',
//     data : {
//         labels : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Nov', 'Dec'],
//         datasets : [{
//             backgroundColor : '#3f9dec',
//             data : [7,6,5,4,3,2,1]
//         }]
//     },
//     options : {
//         maintainAspectRatio : false
//     }
// }

//  new Chart(movements, config1);
//  new Chart(alerts, config2);