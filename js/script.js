// alert("hello world"); CHECKING IF JS LINKED PROPERLY

//DOM ELEMENTS REFERENCES
var windowElement = document.querySelector(".windowRight");
var lamp = document.querySelector(".lampShade");
var camera = document.querySelector(".cameraSetup");
var flash = document.querySelector(".flash");
var room = document.querySelector(".room");
var scene = document.querySelector(".scene");

var welcomeMsg1 = document.querySelector("#welcomeMsg1");
var welcomeMsg2 = document.querySelector("#welcomeMsg2");
var snapshotMessage = document.querySelector("#snapshotMessage");
var resetButton = document.querySelector("#resetButton");
var raceMessage = document.querySelector("#raceMessage");
var raceWinMessage = document.querySelector("#raceWinMessage");

var catSound = document.querySelector("#catSound");
var cameraSound = document.querySelector("#cameraSound");

var cat1 = document.querySelector(".catRunning");
var cat2 = document.querySelector(".catRunJump");
var cat3 = document.querySelector(".cat");
//CREATING AN ARRAY TO STORE ALL THREE CATS
var cats = [cat1, cat2, cat3];

var book1 = document.querySelector("#bookFall1");
var book2 = document.querySelector("#bookFall2");

//Holds Timeout for race winner determination
var raceInterval;

//Cat sound on click
cats.forEach(cat => {
    cat.addEventListener("click", () => {
        catSound.currentTime = 0;
        catSound.play();
    });
})


//Night mode toggle for window
windowElement.addEventListener("click", () => {
    document.body.classList.toggle("night");
})

//Lamp toggle
lamp.addEventListener("click", () => {
    lamp.classList.toggle("lampOn");
});

//Books Fall / Stand interaction
book1.addEventListener("click", () => {
    if (book1.classList.contains("fall")) {
        book1.classList.remove("fall");
        book1.classList.add("standup");
    } else {
        book1.classList.remove("standup");
        book1.classList.add("fall");
    }
});

book2.addEventListener("click", () => {
    if (book2.classList.contains("fall2")) {
        book2.classList.remove("fall2");
        book2.classList.add("standup2");
    } else {
        book2.classList.remove("standup2");
        book2.classList.add("fall2");
    }
});

//Camera Snapshot 
camera.addEventListener("click", () => {
    flash.style.opacity = 1; //Show Flash

    cameraSound.currentTime = 0;
    cameraSound.play();

    setTimeout(() => {
        flash.style.opacity = 0; //Hide flash

        room.classList.add("paused"); //Pause animations in the room

        welcomeMsg1.classList.add("hidden"); //Hide welcome message
        welcomeMsg2.classList.add("hidden");
        snapshotMessage.classList.remove("hidden"); //Show snapshot message
        raceMessage.classList.add("hidden"); //Hide race message

        cat1.style.animationPlayState = 'paused'; //Pause cat animations
        cat2.style.animationPlayState = 'paused';

        cat1.classList.remove("runningCat1"); //Remove cat animation class
        cat2.classList.remove("jumpingCat2");

        clearTimeout(raceInterval); //Stop any pending race winner timeout

        camera.classList.add("cameraHidden"); //Hide camera after snapshot
    }, 120);

});

resetButton.addEventListener("click", () => {
    snapshotMessage.classList.add("hidden"); //Hide snapshot message
    welcomeMsg1.classList.remove("hidden"); //Show welcome messages again
    welcomeMsg2.classList.remove("hidden");
    raceMessage.classList.add("hidden"); //Hiding race message
    raceWinMessage.classList.add("hidden");

    camera.classList.remove("cameraHidden"); //Show camera again

    room.classList.remove("paused"); //Resume animations
});

// ------------------------RACE CAT ---------------------------

var startBtn = document.getElementById("startRace"); //Start race button
var resetBtn = document.getElementById("resetRace"); //Reset race button

//Pause cats before race
cat1.style.animationPlayState = 'paused';
cat2.style.animationPlayState = 'paused';

//Start the race
startBtn.addEventListener("click", () => {
    cat1.style.animationPlayState = 'running'; //Start running cat animation
    cat2.style.animationPlayState = 'running'; //Start jumping cat animation

    camera.classList.remove("cameraHidden"); //Camera is visible

    //Cat animations that were set up but never used in css cuz wanted to add them on click
    cat1.classList.add("runningCat1");
    cat2.classList.add("jumpingCat2");

    raceMessage.classList.remove("hidden"); //Show race message
    snapshotMessage.classList.add("hidden"); //Hide snapshot message
    welcomeMsg1.classList.add("hidden");
    welcomeMsg2.classList.add("hidden");

    //Function to determine winner after 4 seconds
    raceInterval = setTimeout(() => {
        var winner = Math.random() > 0.5 ? 'Running Cat' : 'Jumping Cat';

        //Pause cat animations
        cat1.style.animationPlayState = 'paused';
        cat2.style.animationPlayState = 'paused';

        raceWinMessage.textContent = winner + " Wins the Race!!!"; //Display winner
        raceWinMessage.classList.remove("hidden"); //Show winner message
        raceMessage.classList.add("hidden"); //Hide race message
    }, 4000);
});

//Reset Race
resetBtn.addEventListener("click", () => {
    cat1.style.animationPlayState = 'paused'; //Stop cats
    cat2.style.animationPlayState = 'paused';

    cat1.classList.remove("runningCat1"); //Reset animations
    cat2.classList.remove("jumpingCat2");

    cat1.style.right = '5%'; //Reset starting point
    cat2.style.right = '5%';

    camera.classList.remove("cameraHidden"); //Show camera

    snapshotMessage.classList.add("hidden"); //Hide snapshot and race messages
    raceWinMessage.classList.add("hidden");
    raceMessage.classList.add("hidden");
    welcomeMsg1.classList.remove("hidden"); //Show welcome message
    welcomeMsg2.classList.remove("hidden");

    clearTimeout(raceInterval); //Clear race winner timeout
});

//KEYBOARD ACCESSIBILITY FOR CLICKABLE THINGS
//Creating an array to store all interactive elements
var interactiveElements = [cat3, cat1, cat2, lamp, camera, book1, book2, windowElement];

//Looping through each element and attaching a keydown event listener
for (var i = 0; i < interactiveElements.length; i++) {
    var element = interactiveElements[i];

    //Listen for key press
    element.addEventListener("keydown", function (event) {
        //Check if enter or space is pressed
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault(); //Prevent default which was scrolling when i checked mine
            this.click(); //Triggers the same action for mouse click
        }
    });
}