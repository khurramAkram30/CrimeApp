
var cat = document.getElementById('category');
var force = document.getElementById('ddlforces');
var body = document.getElementById('tbl_body');
var table= document.getElementById('tbldata');
var bodyError = document.getElementById('divError');


// crime category:

fetch('https://data.police.uk/api/crime-categories')
    .then(response => response.json())
    .then(JsonData => Categories(JsonData)).catch(err => console.log(err))

function Categories(JsonData) {
    for (var i = 0; i < JsonData.length; i++) {
        cat.innerHTML += `<option value="${JsonData[i].url}">${JsonData[i].name}</option>`;
    }
}

fetch('https://data.police.uk/api/forces')
    .then(response => response.json())
    .then(JsonData => forces(JsonData)).catch(err => console.log(err));

function forces(JsonData) {
    for (var i = 0; i < JsonData.length; i++) {
        force.innerHTML += `<option value="${JsonData[i].id}">${JsonData[i].name}</option>`;
    }
}



function FetchCrime() {

    var forceEl=document.getElementById('ddlforces');
    // var strCrime = cat.options[cat.selectedIndex].value;
    // var strforce = force.options[force.selectedIndex].value;
    var crimeCat = cat.value;
    var forceSel = forceEl.value;


    fetch(`https://data.police.uk/api/crimes-no-location?category=${crimeCat}&force=${forceSel}`)
        .then(response => response.json())
        .then(myjson => crime(myjson))
}




function crime(myJson) {
    bodyError.innerHTML = '';

    if (myJson.length !== 0) {
        for (var i = 0; i < myJson.length; i++) {
            table.style.visibility = 'visible';
            body.innerHTML += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myJson[i].id}</td>
                    <td>${myJson[i].category}</td>
                    <td>${myJson[i].month}</td>
                </tr>`;                             

        }
    }
    else {
        table.style.visibility = 'hidden';
        body.innerHTML = " ";
        bodyError.innerHTML = "Cirminal Record Not Found";

    }
}