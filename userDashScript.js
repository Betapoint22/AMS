if(sessionStorage.getItem('sessionVar') != 'userPass'){
    window.location.href = `./index.html`;
}
else{

    // console.log(sessionStorage.getItem('userID'));
    
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
            </ul>`;
        }

let numberOfAssets = document.getElementById('numberOfAssets');
let userDepartment = document.getElementById('department');
let movementPerMonth = document.getElementById('movementPerMonth');
let movementPerWeek = document.getElementById('movementPerWeek');

let totalRequestsSent = document.getElementById('totalRequest');
let totalRequestsApproved = document.getElementById('approvedRequest');
let totalRequestsDenied = document.getElementById('deniedRequest');
let totalRequestsPending = document.getElementById('pendingRequest');

let alertsReceived = document.getElementById('alerts');


$.post(
    "http://127.0.0.1:3000/setUserCards",
    {
        userID : sessionStorage.getItem('userID')
    },
    function(result){
        console.log(result);
        numberOfAssets.innerText = result[0];
        userDepartment.innerText = result[1];
        movementPerMonth.innerText = result[2];
        movementPerWeek.innerText = result[3];
    }
)

$.post(
    "http://127.0.0.1:3000/setRequestCards",
    {
        userID : sessionStorage.getItem('userID')
    },
    function(result){
        totalRequestsSent.innerText = result[0];
        totalRequestsApproved.innerText = result[1];
        totalRequestsDenied.innerText = result[2];
        totalRequestsPending.innerText = result[3];
    }
)
$.post(
    "http://127.0.0.1:3000/setAlertsCard",
    {
        userID : sessionStorage.getItem('userID')
    },
    function(result){
        alertsReceived.innerText = result;
    }
)

$.post(
    "http://127.0.0.1:3000/setMovementsTable",
    {
        userID : sessionStorage.getItem('userID')
    },
    function(result){
        // console.log(1);
        let param = document.querySelector('.movementsTable');
        let arr = ['ID', 'Approve date', 'Approve time','emp id', 'starting point', 'destination', 'tag ID', 'approve status', 'movement status','movement time','reach time'];
            let element =  document.querySelector('.movementsTable table');
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
                    row.insertCell(i).innerText = Object.values(result[x])[i];
                } 
            }
            table.append(thead);
            table.append(tbody);
            param.append(table); 
    }
)

$.post(
    "http://127.0.0.1:3000/setAssetsTable",
    {
        userID : sessionStorage.getItem('userID')
    },
    function(result){
        // console.log(2);
        let param = document.querySelector('.assetsTable');
        let arr = ['Asset ID', 'Asset Name', 'Location'];
            let element =  document.querySelector('.assetsTable table');
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
                    row.insertCell(i).innerText = Object.values(result[x])[i];
                } 
            }
            table.append(thead);
            table.append(tbody);
            param.append(table); 
    }
)


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

} // end of else 