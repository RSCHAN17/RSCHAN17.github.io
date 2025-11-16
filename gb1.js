let tropes = ['Someone turned around whole song','Facetime','Weird device','No clue what\'s going on','On shoulders','Crowd surfer','Lookalike','Weird interaction with stranger','Getting / Viewing beered','Clothing Chucked','Lighter','Someone you actually know','Premature moshing','Blinding Lights','Confetti','Cardboard sign','Screaming the whole time','Mismatched acts','Uncomfortably long encore wait','Random single living their best life','Music industry/ political/ religious speech','Football shirt','Movie/TV shirt','This is our "last song"','Artist "can\'t believe they\'re there"','Missing shoe in mosh','Phone torch looking for something','S/O dragged along but having an amazing time','Getting a ticket day of','Scary fan (way too invested)','Artist restarting the song','The artist\'s music being blasted on route back','Someone dressed like the artist','Fake merch','Queuing up for over 3 hrs outside','Setlist / drumstick being chucked into the crowd','Surprise guest','Snapchat','Getting Merch']
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

const bingoBoard = shuffle(tropes).slice(0,24)


let idList = []
for (let i=1; i<25; i++) {
    idList.push('a'+i.toString())
}

function fillBoard(id) {
    document.getElementById(id).innerHTML = bingoBoard[parseInt(id.slice(1))-1];
}

idList.forEach(fillBoard);

function pressed(id) {
    if(document.getElementById(id).style.backgroundColor == 'indigo'){
        document.getElementById(id).style.backgroundColor = 'black';
    } else {document.getElementById(id).style.backgroundColor = 'indigo';
    }
}

