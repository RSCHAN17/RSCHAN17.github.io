

let completeList = []
const start = fetchAllCliches()
let bingoBoard = []
const clicheList = document.querySelector('#allTropes')

const clicheForm = document.querySelector('#clicheForm')
clicheForm.addEventListener("submit",submitCliche)

function submitCliche(e) {
    e.preventDefault();
    postCliche(e.target.trope.value,e.target.origin.value,e.target.insta.value)
    alert("Thank you for your submission, keep an eye out to check if it gets added!");
    e.target.trope.value="";
    e.target.origin.value="";
    e.target.insta.value="";
}

async function postCliche(trope,origin,insta) {
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
    const boxes = {};
    for (let i = 1; i <= 24; i++) {
        boxes[`a${i}`] = document.getElementById(`a${i}`);
    }
    boxes['free'] = document.getElementById("free");
    const topline = [boxes['a1'],boxes['a2'],boxes['a3'],boxes['a4'],boxes['a5']]
    const secondline = [boxes['a6'],boxes['a7'],boxes['a8'],boxes['a9'],boxes['a10']]
    const thirdline = [boxes['a11'],boxes['a12'],boxes['free'],boxes['a13'],boxes['a14']]
    const fourthline = [boxes['a15'],boxes['a16'],boxes['a17'],boxes['a18'],boxes['a19']]
    const fifthline = [boxes['a20'],boxes['a21'],boxes['a22'],boxes['a23'],boxes['a24']]
    const line1 = [boxes['a1'],boxes['a6'],boxes['a11'],boxes['a15'],boxes['a20']]
    const line2 = [boxes['a2'],boxes['a7'],boxes['a12'],boxes['a16'],boxes['a21']]
    const line3 = [boxes['a3'],boxes['a8'],boxes['free'],boxes['a17'],boxes['a22']]
    const line4 = [boxes['a4'],boxes['a9'],boxes['a13'],boxes['a18'],boxes['a23']]
    const line5 = [boxes['a5'],boxes['a10'],boxes['a14'],boxes['a19'],boxes['a24']]
    const diagonal1 = [boxes['a1'],boxes['a7'],boxes['free'],boxes['a18'],boxes['a24']]
    const diagonal2 = [boxes['a20'],boxes['a16'],boxes['free'],boxes['a9'],boxes['a5']]
    let allLines = [topline,secondline,thirdline,fourthline,fifthline,line1,line2,line3,line4,line5,diagonal1,diagonal2]

    if(document.getElementById(id).style.backgroundColor == 'seagreen' || document.getElementById(id).style.backgroundColor == 'darkolivegreen'){
        document.getElementById(id).style.backgroundColor = 'darkslategray';
    } else if(document.getElementById(id).style.backgroundColor == 'teal') {
        for (let i = 1; i <= 24; i++) {
            boxes[`a${i}`].style.backgroundColor='darkolivegreen';
        }
        boxes[`free`].style.backgroundColor='darkolivegreen'
        document.getElementById(id).style.backgroundColor = 'darkslategray';
    } else {document.getElementById(id).style.backgroundColor = 'seagreen';}
//postcheck    
    allLines.forEach(l => {
        let counter = 0
        for (let i = 0; i <=4; i++) {
            if(l[i].style.backgroundColor=='seagreen' || l[i].style.backgroundColor=='darkolivegreen') {
                counter += 1
            }
        }
        if (counter == 4 && document.getElementById(id).style.backgroundColor == 'darkslategray') {
            l.forEach(e => {if(e.style.backgroundColor=='darkolivegreen') {
                e.style.backgroundColor = 'seagreen';
                document.getElementById(id).style.backgroundColor = 'darkslategray'
        }})} else if (counter == 5) {
            l.forEach(e => e.style.backgroundColor = 'darkolivegreen');
        } 
    })
    allLines.forEach(l => {
        let counter = 0
        for (let i = 0; i <=4; i++) {
            if(l[i].style.backgroundColor=='seagreen' || l[i].style.backgroundColor=='darkolivegreen') {
                counter += 1
            }
        }
        if (counter == 5) {
            l.forEach(e => e.style.backgroundColor = 'darkolivegreen');
        }
    })

    let totalCount = 0
    for (let i = 1; i <= 24; i++) {
        if(boxes[`a${i}`].style.backgroundColor == 'darkolivegreen') {
            totalCount += 1
        }
    }
    if(boxes['free'].style.backgroundColor == 'darkolivegreen') {
        totalCount+=1
    }
    if(totalCount==25) {
        for (let i = 1; i<=24; i++) {
            boxes[`a${i}`].style.backgroundColor = 'teal'
        }
        boxes['free'].style.backgroundColor = 'teal'
    }
}



