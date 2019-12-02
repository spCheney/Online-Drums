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

            if((i - offset) % 2) {
                ph.style.backgroundColor = phColors[0];
            }
            else {
                ph.style.backgroundColor = phColors[1];
            }

            ph = null;
        }
    }

    //places bubble on a metronome line
    pHolders.forEach((ph, index) => {
        ph.addEventListener('click', function(){
            //if the placeholder doesn't have a bubble add one
            if (sBubbles.children.length == 0) {
                const marked = document.createElement("div");
                sBubbles.appendChild(marked);
                //determines which pad the placeholder corresponds to
                var padI = (index - (index % 4)) / 4;
                //sets the color to the color of the corresponding pad
                marked.style.backgroundColor = padColors[padI];
                //calculates the top location of the bubble and turns it into a string with a % at the end
                var topLoc = 7.5 + (padI * 20);
                var topLocS = topLoc.toString().concat("%");
                //same thing but with the left location
                var leftLoc = 10 + ((index % 4) * 25);
                var leftLocS = leftLoc.toString().concat("%");
                marked.style.top = topLocS;
                marked.style.left = leftLocS;
            }

            //if it does have a bubble remove it
            else {
                sBubbles.removeChild(sBubbles.childNodes[0]);
            }
        })
    })
})