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
    const lines = document.querySelectorAll(".lines div");
    const lineColors = [
        "#ffffff",
        "#6d6f70",
        "#000000"
    ];
    const pHolders = document.querySelectorAll(".placeHolders div");

    var bpm = 120;
    var lineBeat = 1;

    console.log(sounds);


    pads.forEach((pad, index) =>{
        pad.addEventListener('click', function(){
            sounds[index].currentTime = 0;
            sounds[index].play();

            createBubbles(index);
        })
    })

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

    setInterval(beat, 60000 / bpm);

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

    function beatStarted() {
        for(i = 1; i < 8; i += 2) {
            if (lines[i].style.backgroundColor == lineColors[1]) {
                return false;
            }
        }
        return true;
    }


    pHolders.forEach((ph, index) => {
        ph.addEventListener('click', function(){
            const marked = document.createElement("div");
            ph.appendChild(marked);
            marked.style.backgroundColor = padColors[index];
        })
    })
})