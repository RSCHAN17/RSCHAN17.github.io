let completeList = []
const start = fetchAllCliches()
const gigs = fetchGigs() 
const festivals = fetchFestivals()
const years = fetchYears()
let bingoBoard = []
const clicheList1 = document.querySelector('#allTropes1')
const clicheList2 = document.querySelector('#allTropes2')

const intro = document.querySelector('#intro')

const time1 = document.querySelector('#time1')
const time2 = document.querySelector('#time2')
const time3 = document.querySelector('#time3')
const festivals1 = document.querySelector('#festivals1')
const festivals2 = document.querySelector('#festivals2')
const festivals3 = document.querySelector('#festivals3')

const lastUpdated = document.querySelector('#lastUpdated')

async function fetchGigs() {
    try {
        const respAll = await fetch('/server/data/gigs.json')
        const dataAll = await respAll.json()
        gig_num=dataAll.length;
        intro.innerHTML= `My name is Raza, I've always had a love for live music, ${gig_num} gigs so far (30 last year).
                Gigs and concerts are a lot of fun, but the more you go to, the more you notice some clichés, why
                not turn those clichés into a game? Hence the birth of Gig Bingo!`
    } catch (error) {
        new Error("Failed to get gigs")
    }
}
async function fetchFestivals() {
    try {
        const respFestivals= await fetch('/server/data/festivals.json')
        const dataFestivals = await respFestivals.json()
        const li1 = festivals1.appendChild(document.createElement("li"))
        li1.innerHTML=dataFestivals[0].name
        const li2 = festivals1.appendChild(document.createElement("li"))
        li2.innerHTML=dataFestivals[1].name
        const li3 = festivals2.appendChild(document.createElement("li"))
        li3.innerHTML=dataFestivals[2].name
        const li4 = festivals3.appendChild(document.createElement("li"))
        li4.innerHTML=dataFestivals[3].name
        const li5 = festivals3.appendChild(document.createElement("li"))
        li5.innerHTML=dataFestivals[4].name
        const li6 = festivals3.appendChild(document.createElement("li"))
        li6.innerHTML=dataFestivals[5].name
        const li7 = festivals3.appendChild(document.createElement("li"))
        li7.innerHTML=dataFestivals[6].name
    } catch (error) {
        new Error("Failed to get festivals")
    }
}
async function fetchYears() {
    try {
        const respYears = await fetch('/server/data/years.json')
        const dataYears = await respYears.json()
        let group1 = []
        let group2 = []
        let group3 = []
        for(let i=0;i<3;i++) {
            group1.push(parseInt(dataYears[i].gigs_that_year))
            group2.push(parseInt(dataYears[i+3].gigs_that_year))
            group3.push(parseInt(dataYears[i+6].gigs_that_year))
        }
        time1.innerHTML = group1.reduce((partialSum, a) => partialSum + a, 0)
        time2.innerHTML = group2.reduce((partialSum, a) => partialSum + a, 0)
        time3.innerHTML = group3.reduce((partialSum, a) => partialSum + a, 0)
        
    } catch (error) {
        new Error("Failed to get years")
    }
}

const clicheForm = document.querySelector('#clicheForm')
clicheForm.addEventListener("submit",submitCliche)

function submitCliche(e) {
    e.preventDefault();
    postCliche(e.target.trope.value,e.target.origin.value,e.target.insta.value)
    appendAlert(`Nice, you've submitted your cliche, keep an eye out to see if it gets added!`, 'success')
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
        const response = await fetch(`/server/data/cliches.json`);
        const data = await response.json()
        const time = data.pop()
        console.log(data);
        lastUpdated.innerHTML = `last updated: ${time}`
        for (let i=1; i<data.length; i++) {
            if(i%2===0) {
                completeList.push(data[i]["cliche"])
                const li = clicheList1.appendChild(document.createElement("li"))
                li.className="list-group-item";
                li.innerHTML=data[i]["cliche"];
            } else {
                completeList.push(data[i]["cliche"])
                const li = clicheList2.appendChild(document.createElement("li"))
                li.className="list-group-item";
                li.innerHTML=data[i]["cliche"];            
            } 
        };
        if (data.length%2===1) {
            const li = clicheList2.appendChild(document.createElement("li"))
            li.className="list-group-item";
        }
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

    if(document.getElementById(id).style.backgroundColor == 'seagreen' || document.getElementById(id).style.backgroundColor == 'teal'){
        document.getElementById(id).style.backgroundColor = 'darkslategray';
    } else if(document.getElementById(id).style.backgroundColor == 'royalblue') {
        for (let i = 1; i <= 24; i++) {
            boxes[`a${i}`].style.backgroundColor='teal';
        }
        boxes[`free`].style.backgroundColor='teal'
        document.getElementById(id).style.backgroundColor = 'darkslategray';
    } else {document.getElementById(id).style.backgroundColor = 'seagreen';}
//postcheck    
    allLines.forEach(l => {
        let counter = 0
        for (let i = 0; i <=4; i++) {
            if(l[i].style.backgroundColor=='seagreen' || l[i].style.backgroundColor=='teal') {
                counter += 1
            }
        }
        if (counter == 4 && document.getElementById(id).style.backgroundColor == 'darkslategray') {
            l.forEach(e => {if(e.style.backgroundColor=='teal') {
                e.style.backgroundColor = 'seagreen';
                document.getElementById(id).style.backgroundColor = 'darkslategray'
        }})} else if (counter == 5) {
            l.forEach(e => e.style.backgroundColor = 'teal');
        } 
    })
    allLines.forEach(l => {
        let counter = 0
        for (let i = 0; i <=4; i++) {
            if(l[i].style.backgroundColor=='seagreen' || l[i].style.backgroundColor=='teal') {
                counter += 1
            }
        }
        if (counter == 5) {
            l.forEach(e => e.style.backgroundColor = 'teal');
        }
    })

    let totalCount = 0
    for (let i = 1; i <= 24; i++) {
        if(boxes[`a${i}`].style.backgroundColor == 'teal') {
            totalCount += 1
        }
    }
    if(boxes['free'].style.backgroundColor == 'teal') {
        totalCount+=1
    }
    if(totalCount==25) {
        for (let i = 1; i<=24; i++) {
            boxes[`a${i}`].style.backgroundColor = 'royalblue'
        }
        boxes['free'].style.backgroundColor = 'royalblue'
    }
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div style="font-family:Rubik, sans-serif;"><b>${message}</b></div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}
