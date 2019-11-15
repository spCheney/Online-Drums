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

    //places bubble on a metronome line
    pHolders.forEach((ph, index) => {
        ph.addEventListener('click', function(){
            const marked = document.createElement("div");
            ph.appendChild(marked);
            marked.style.backgroundColor = padColors[index];
        })
    })
})