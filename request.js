// panelSelector - 1 - Movement requests panel
// panelSelector - 2 - Access requests panel

// tableSelector - 1 - total requests
// tableSelector - 2 - pending requests
// tableSelector - 3 - approved requests
// tableSelector - 4 - denied requests 

if(sessionStorage.getItem('sessionVar') != 'pass'){
    window.location.href = './index.html';
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
            </ul>`;
        }



    let totalMovementRequests = document.getElementById('mTotalRequests');
    let pendingMovementRequests = document.getElementById('mPendingRequests');
    let approvedMovementRequests = document.getElementById('mApprovedRequests');
    let deniedMovementRequests = document.getElementById('mDeniedRequests');

    let totalAccessRequests = document.getElementById('aTotalRequests');
    let pendingAccessRequests = document.getElementById('aPendingRequests');
    let approvedAccessRequests = document.getElementById('aApprovedRequests');
    let deniedAccessRequests = document.getElementById('aDeniedRequests');

    let viewAllMovementRequests = document.getElementById('mTotal');
    let viewPendingMovementRequests = document.getElementById('mPending');
    let viewApprovedMovementRequests = document.getElementById('mApproved');
    let viewDeniedMovementRequests = document.getElementById('mDenied');

    let viewAllAccessRequests = document.getElementById('aTotal');
    let viewPendingAccessRequests = document.getElementById('aPending');
    let viewApprovedAccessRequests = document.getElementById('aApproved');
    let viewDeniedAccessRequests = document.getElementById('aDenied');

    let requestTiles = document.querySelectorAll('.subSec');

    let tableHolder = document.getElementById('tableHolder');

    let logout = document.getElementById('logoutBtn');

    let tableName = document.getElementById('tableName');
    tableName.innerText = 'All Movement Requests';

    let panelSelector = 1; 
    let tableSelector = 1;


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


    setCards(
        totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
        totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
    );

    $.post(
        'http://127.0.0.1:3000/totalMovementRequests',
        {
            userDept : sessionStorage.getItem('userDept')
        },
        function(result){
            panelSelector = 1;
            tableSelector = 1;
            renderTable(panelSelector, tableSelector, result);
        }
    )

    viewAllMovementRequests.addEventListener('click', ()=>{
        tileColor(this);
        tableName.innerText = 'All Movement Requests';
        $.post(
            'http://127.0.0.1:3000/totalMovementRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 1;
                tableSelector = 1;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    });
    viewPendingMovementRequests.addEventListener('click', ()=>{
        tileColor(this);
        tableName.innerText = 'Pending Movement Requests';
        $.post(
            'http://127.0.0.1:3000/pendingMovementRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 1;
                tableSelector = 2;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewApprovedMovementRequests.addEventListener('click',()=>{
        tileColor(this);
        tableName.innerText = 'Approved Movement Requests';
        $.post(
            'http://127.0.0.1:3000/approvedMovementRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 1;
                tableSelector = 3;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewDeniedMovementRequests.addEventListener('click', ()=>{
        tileColor(this);
        tableName.innerText = 'Denied Movement Requests';
        $.post(
            'http://127.0.0.1:3000/deniedMovementRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 1;
                tableSelector = 4;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewAllAccessRequests.addEventListener('click', ()=>{
        tileColor(this);
        tableName.innerText = 'All Access Requests';
        $.post(
            'http://127.0.0.1:3000/totalAccessRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 2;
                tableSelector = 1;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewPendingAccessRequests.addEventListener('click',()=>{
        tileColor(this);
        tableName.innerText = 'Pending Access Requests';
        $.post(
            'http://127.0.0.1:3000/pendingAccessRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                // console.log(result);
                panelSelector = 2;
                tableSelector = 2;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewApprovedAccessRequests.addEventListener('click',()=>{
        tileColor(this);
        tableName.innerText = 'Approved Access Requests';
        $.post(
            'http://127.0.0.1:3000/approvedAccessRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 2;
                tableSelector = 3;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })
    viewDeniedAccessRequests.addEventListener('click', ()=>{
        tileColor(this);
        tableName.innerText = 'Denied Access Requests';
        $.post(
            'http://127.0.0.1:3000/deniedAccessRequests',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                panelSelector = 2;
                tableSelector = 4;
                renderTable(panelSelector, tableSelector, result);
            }
        )
    })

    setInterval(function(){
        setCards(
            totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
            totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
        );
    }, 5000);

    function tileColor(element){
        for(let i = 0; i < requestTiles.length; i++){
            if(requestTiles[i].id == element.id){
                requestTiles[i].style.backgroundColor = 'purple';
            }
            else{
                requestTiles[i].style.backgroundColor = '#fff';
            }
        }
    }        
    function setCards(ele1, ele2, ele3, ele4, ele5, ele6, ele7, ele8){
        $.post(
            'http://127.0.0.1:3000/reqCards',
            {
                userDept : sessionStorage.getItem('userDept')
            },
            function(result){
                ele1.innerText = result[0];
                ele2.innerText = result[1];
                ele3.innerText = result[2];
                ele4.innerText = result[3];

                ele5.innerText = result[4];
                ele6.innerText = result[5];
                ele7.innerText = result[6];
                ele8.innerText = result[7];

            }
        )
    }

    function renderTable(panelSelector, tableSelector, result){

        let tableElement = document.querySelector('table');
        tableElement.remove();

        let arr1 = ['Serial no.', 'asset id', 'starting point', 'destination', 'date', 'time', 'custodian name', 'custodian id', 'requestor name', 'requestor id', 'request status', 'Actions'];
        let arr2 = ['Serial no.', 'asset id', 'starting point', 'destination', 'date', 'time', 'custodian name', 'custodian id', 'requestor name', 'requestor id', 'request status'];
        let arr3 = ['Serial no.','applicant name', 'applicant id', 'email', 'date', 'contact', 'request status', 'Actions'];
        let arr4 =  ['Serial no.','applicant name', 'applicant id', 'email', 'date', 'contact', 'request status'];

        let arr = [];

        if(panelSelector == 1 && tableSelector == 2){
            arr = arr1;
        }
        else if(panelSelector == 1 && tableSelector != 2){
            arr = arr2;
        }
        else if(panelSelector == 2 && tableSelector == 2){
            arr = arr3;
        }
        else if(panelSelector == 2 && tableSelector != 2){
            arr = arr4;
        }

        let table = document.createElement('table');
        table.className = 'dynamicTable';
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');

        for(let i = 0; i < arr.length; i++){
            let th = document.createElement('th');
            th.innerText = arr[i];
            tr.appendChild(th);
        }
        thead.append(tr);

        for(let x in result){
            let row = tbody.insertRow(x);
            let data = Object.values(result[x]);

            for(let i = 0; i < data.length; i++){
                row.insertCell(i).innerText = data[i];
            }
            if(tableSelector == 2){
                let btn1 = document.createElement('button');
                let btn2 = document.createElement('button');
                
                btn1.className = 'approve'
                btn1.innerText = 'Approve';

                btn2.className = 'deny';
                btn2.innerText = 'Deny';

                row.insertCell(data.length).append(btn1, btn2);
            }
        }
            table.append(thead);
            table.append(tbody);
            tableHolder.append(table);
            approveButton();
            denyButton();
    }

    function approveButton(){
        $('.approve').click(function(){
            this.nextElementSibling.style.display = 'none';

            if(panelSelector == 1){
                let serial = this.parentElement.parentElement.children[0].innerText;
                let id = this.parentElement.parentElement.children[1].innerText;
                let start = this.parentElement.parentElement.children[2].innerText;
                let destination = this.parentElement.parentElement.children[3].innerText;
                let empID = this.parentElement.parentElement.children[9].innerText;

                // console.log(serial);
                // console.log(id);
                // console.log(start);
                // console.log(destination);
                // console.log(empID);

                $.post(
                    'http://127.0.0.1:3000/mAppr',
                    {
                        reqID : id,
                        reqSerial : serial,
                        start : start,
                        dest : destination,
                        empID : empID
                    },
                    function(result){
                        setCards(
                            totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
                            totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
                        );
                    }
                )
            }
            else if(panelSelector == 2){
                let serial = this.parentElement.parentElement.children[0].innerText;
                let userName = this.parentElement.parentElement.children[1].innerText;
                let id = this.parentElement.parentElement.children[2].innerText;
                let email = this.parentElement.parentElement.children[3].innerText;

                $.post(
                    'http://127.0.0.1:3000/aAppr',
                    {
                        reqID : id,
                        reqSerial : serial,
                        userName : userName,
                        email : email
                    },
                    function(result){
                        setCards(
                            totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
                            totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
                        );
                    }
                )
            }
        })
    }

    function denyButton(){
        $('.deny').click(function(){
            this.previousElementSibling.style.display = 'none';
            if(panelSelector == 1){
                let serial = this.parentElement.parentElement.children[0].innerText;
                let id = this.parentElement.parentElement.children[1].innerText;
                // console.log(serial);
                // console.log(id);

                $.post(
                    'http://127.0.0.1:3000/mdeny',
                    {
                        reqID : id,
                        reqSerial : serial
                    },
                    function(result){
                        setCards(
                            totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
                            totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
                        );
                    }
                )
            }
            else if(panelSelector == 2){
                let serial = this.parentElement.parentElement.children[0].innerText;
                let id = this.parentElement.parentElement.children[2].innerText;

                $.post(
                    'http://127.0.0.1:3000/adeny',
                    {
                        reqID : id,
                        reqSerial : serial
                    },
                    function(result){
                        setCards(
                            totalMovementRequests, pendingMovementRequests, approvedMovementRequests, deniedMovementRequests,
                            totalAccessRequests, pendingAccessRequests, approvedAccessRequests, deniedAccessRequests
                        );
                    }
                )
            }
        })
    }
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