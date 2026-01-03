let completeList = []
const start = fetchAllCliches()
let bingoBoard = []
const clicheList = document.querySelector('#allTropes')

const clicheForm = document.querySelector('#clicheForm')
clicheForm.addEventListener("submit",submitCliche)

async function submitCliche(e) {
    e.preventDefault();
    let origin = document.querySelector("#origin").value;
    let insta = document.querySelector("#insta").value;
    let trope = document.querySelector("#trope").value;
    try {
        const response = await fetch('https://rschan17-github-io.onrender.com/cliches',
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    "cliche":trope,
                    "origin":origin,
                    "insta":insta
                })
            }
        )
    } catch (error) {
        new Error("Failed to post cliche")
    }
}


let idList = []
for (let i=1; i<25; i++) {
    idList.push('a'+i.toString())
}

async function fetchAllCliches() {
    try {
        const response = await fetch(`https://rschan17-github-io.onrender.com/cliches/all`);
        const data = await response.json()
        for (let i=1; i<data.length; i++) {
            completeList.push(data[i]["cliche"])
            const li = clicheList.appendChild(document.createElement("li"))
            li.innerHTML=data[i]["cliche"];
        };
        bingoBoard=shuffle(completeList).slice(0,24)
        idList.forEach(fillBoard)
    } catch (err) {
        return new Error("Failed to fetch cliches")
    }
}

const backup = tropes

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}





function fillBoard(id) {
    document.getElementById(id).innerHTML = bingoBoard[parseInt(id.slice(1))-1];
}



function pressed(id) {
    if(document.getElementById(id).style.backgroundColor == 'indigo'){
        document.getElementById(id).style.backgroundColor = 'black';
    } else {document.getElementById(id).style.backgroundColor = 'indigo';
    }
}

