window.addEventListener('load', () => {
    const sounds = document.querySelectorAll(".sound");
    const pads = document.querySelectorAll(".pads div");
    const visual = document.querySelector(".visual");
    const padColors = [
        "#60d981",
        "#d918f2",
        "#0c92e0",
        "#890abe",
        "#f0ec00",
        "#ff5e00"
    ];
    //metronome lines
    const lines = document.querySelectorAll(".lines div");
    const lineColors = [
        "#ffffff",      //black
        "#6d6f70",      //gray
        "#000000"       //white
    ];

    const placeHolders = document.querySelector(".placeHolders");
    const sBubbles = document.querySelector(".static_bubbles");
    const phColors = [
        "#ff0004",
        "#0004ff"
    ]
    createPlaceHolders();
    const pHolders = document.querySelectorAll(".placeHolders div");
    //this array will keep track of where the bubble of each placeholder is in the sBubble array
    var phFilled = [];
    //initalize the phFilled array
    for (let index = 0; index < 20; index++) {
        phFilled.push(0);
    }

    var bpm = 120;          //how fast the lines change in beats per minute
    var lineBeat = 1;       //line metronome starts here

    console.log(sounds);

    //creates bubble animation and plays drum sound
    pads.forEach((pad, index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime = 0;
            sounds[index].play();

            createBubbles(index);
        })
    })

    //Bubble animation
    const createBubbles = (index) =>{
        const bubble = document.createElement("div");
        visual.appendChild(bubble);
        bubble.style.backgroundColor = padColors[index];
        switch (index){
            case 0:
                bubble.style.animation = 'jump0 1s ease';
                break;
            case 1:
                bubble.style.animation = 'jump1 1s ease';
                break;
            case 2:
                bubble.style.animation = 'jump2 1s ease';
                break;
            case 3:
                bubble.style.animation = 'jump3 1s ease';
                break;
            case 4:
                bubble.style.animation = 'jump4 1s ease';
                break;
            case 5:
                bubble.style.animation = 'jump5 1s ease';
                break;
        }
        bubble.addEventListener('animationend', function () {
            visual.removeChild(this);
          })
    };

    //timing function used for the metronome line animation
    setInterval(beat, 60000 / bpm);

    //Changes the color of the current line back to gray and the next line to black
    function beat() {
        if (beatStarted()) {
            if(lineBeat == 1) {
                lines[7].style.backgroundColor = lineColors[1];
            }
            else {
                lines[lineBeat - 2].style.backgroundColor = lineColors[1];
            }
        }

        lines[lineBeat].style.backgroundColor = lineColors[2];

        lineBeat += 2;
        if (lineBeat > 7) {
            lineBeat = 1;
        }
    }

    //checks if the metronome is already going or in the middle
    function beatStarted() {
        for(i = 1; i < 8; i += 2) {
            if (lines[i].style.backgroundColor == lineColors[1]) {
                return false;
            }
        }
        return true;
    }

    //creates a placeholder use to hold the location of where they need to click to select a drum note location
    function createPlaceHolders(){
        var offset = 0;
        for(i = 0; i < 20; i++) {
            var ph = document.createElement("div");
            placeHolders.appendChild(ph);
            
            //used to make the colors alternate
            if(i % 4 == 0 && i != 0) {
                offset = offset + 1 % 2;
            }

            // if((i - offset) % 2) {
            //     ph.style.backgroundColor = phColors[0];
            // }
            // else {
            //     ph.style.backgroundColor = phColors[1];
            // }

            // ph.appendChild(createLine1());
            // ph.appendChild(createLine2());
            // ph.appendChild(createLine1());
            // createLine1(ph);
            // createLine2(ph);
            // createLine1(ph);
            const line = document.createElement("div");
            ph.appendChild(line);
            line.style.position = "relative";
            line.style.left = "45%";
            line.style.width = "10%";
            line.style.height = "100%";
            line.style.backgroundColor = "#000000";

            // ph = null;
        }
    }

    //places bubble on a metronome line
    pHolders.forEach((ph, index) => {
        ph.addEventListener('click', function(){
            var i = index;
            // if(index != 0) {
            //     i = index - 1;
            // }
            // else {
            //     i = index;
            // }
            console.log(i);
            //if the placeholder doesn't have a bubble add one
            if (phFilled[i] == 0) {
                const marked = document.createElement("div");
                sBubbles.appendChild(marked);
                //determines which pad the placeholder corresponds to
                var padI = (i - (i % 4)) / 4;
                //sets the color to the color of the corresponding pad
                marked.style.backgroundColor = padColors[padI];
                //calculates the top location of the bubble and turns it into a string with a % at the end
                var topLoc = 7.5 + (padI * 20);
                var topLocS = topLoc.toString().concat("%");
                //same thing but with the left location
                var leftLoc = 10 + ((i % 4) * 25);
                var leftLocS = leftLoc.toString().concat("%");
                marked.style.top = topLocS;
                marked.style.left = leftLocS;
                phFilled[i] = sBubbles.childElementCount ;
                // console.log(sBubbles.childElementCount);
            }

            //if it does have a bubble remove it
            else {
                sBubbles.removeChild(sBubbles.childNodes[phFilled[i] - 1]);
                // console.log(phFilled[index]);
                adjustFilledArray(phFilled[i]);
                phFilled[i] = 0;
            }
        })
    })

    //When a child of sBubbles is deleted the index of all of the children after that will decrease by one, this adjust phFilled accordingly
    function adjustFilledArray(start) {
        for (let index = 0; index < phFilled.length; index++) {
            if (phFilled[index] >= start) {
                phFilled[index] = phFilled[index] - 1;                
            }
        }        
    }

    function createLine1(ph) {
        const line = document.createElement("div");
        ph.appendChild(line);
        line.style.width = "90%";
        line.style.height = "100%";
        line.style.backgroundColor = "#ffffff";
        // return line;
    }

    function createLine2(ph) {
        const line = document.createElement("div");
        ph.appendChild(line);
        line.style.width = "10%";
        line.style.height = "100%";
        line.style.backgroundColor = "#000000";
        // return line;
    }
})