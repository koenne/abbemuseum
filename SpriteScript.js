//Any questions about this script? Contact me on Discord: koenne

//Add all variables
let imageheight = null;
let imagewidth = null;
let charactersArray = ['alice', 'aya', 'benben', 'chen', 'chirno', 'daiyousei', 'eirin', 'hatate', 'hijiri', 'hina', 'huto', 'ichirin', 'kagerou', 'kaguya', 'kanako', 'keine', 'keinekimo', 'kisume', 'koa', 'kogasa', 'koishi', 'komachi', 'kyoko', 'lily_black', 'lily_white', 'mamizo', 'marisa', 'meirin', 'melran', 'merancory', 'miko', 'minoriko', 'mistia', 'moko', 'momiji', 'murasa', 'nazu', 'nitori', 'nue', 'orin', 'pal', 'patyuri', 'raiko', 'ran', 'reimu', 'rety', 'riguru', 'rinnosuke', 'ririka', 'rumia', 'runasa', 'sakuya', 'sanae', 'seiga', 'seija', 'sekibanki', 'shannhai', 'shinmyoumaru', 'shizuha', 'sikieiki', 'suika', 'suwako', 'tei', 'tenshi', 'tojiko', 'tojiko2', 'toramaru', 'udonge', 'utsuho', 'wakasagi', 'yakumoyukari', 'yamame', 'yatsuhashi', 'yoshika', 'yoshika2', 'youmu', 'yuugi', 'yuuka', 'yuyuko'];
const characters = "tenshi";
let tID;
let checkingsss = 0;
let height = null;
let frames = 32;
let whichWay = "up";
let speedLeft = 0.3;
let speedUp = 0.5;
let elementExists = document.getElementById("sprite-information");
let size = 2;
let customSize = 2;
let audio = document.getElementById("audio");

let speedLeftSpeedup = 0.3;
let speedUpSpeedup = 0.5;

//Checks if the div exists where the image will be
if (document.getElementById("image") == null) {
    //If it doesn't exist, it'll create one.
    const creatediv = document.createElement("DIV");
    creatediv.setAttribute("id", "image");
    document.body.appendChild(creatediv);
}

//Here it loads the image info
const imageinfo = (url) => {
    let img = new Image();
    img.src = url + '.png';
    img.onload = function () {
        //The height and width gets saved
        //The height gets used to set the sprite animation right
        imageheight = this.height;
        imagewidth = this.width;
        switch (whichWay) {
            case "up":
                height = imageheight / 4 * 1;
                break;
            case "down":
                height = imageheight / 4 * 4;
                break;
            case "right":
                height = imageheight / 4 * 2;
                break;
            case "left":
                height = imageheight / 4 * 3;
                break;
            default:
                break;
        }
        // 1 = to up
        // 2 = to the right
        // 3 = to the left
        // 4 = to down
        frames = imagewidth / 3;
    };

}
let elementImgExists = document.getElementById("sprite-information");

/**
 * Get a random image from the array "characters"
 * This array was inserted through 'dir.php' because php can easily read files in a folder. Javascript doesn't like that much
 * @param {Array[String]} imgAr 
 * @param {String} path example: sprites/alice.png
 */
const getRandomImage = (imgAr, path) => {
    imgAr = imgAr || characters;
    path = path || 'sprites/';
    let img = characters + '.png';
    //Set the random image as the image in the <div> tag
    if (elementExists != null) { // Debug stuff, shouldn't be in the official release
        document.getElementById("imageChar").src = path + img;
    }
    document.getElementById("image").style.background = `url(${path + img})`;
    imageinfo(`sprites/${characters}`);
    document.getElementById("image").style.backgroundPosition =
        `32px ${height}px`;
}

//Animates the script
const animateScript = () => {
    imageinfo(`sprites/${characters}`);
    let position = 0; //With how much pixels the pictures moves
    let interval = 100; //In how many ms the image moves
    let diff = frames; //The difference in pixels each frame
    tID = setInterval(() => { //This activates everytime the interval amount reaches (aka 100ms)
        document.getElementById("image").style.backgroundPosition =
            `-${position}px ${height}px`;
        position = position + diff;
        //if (position < (frames * 2)) //If the end of the image is not reached it adds 90px further
        //    { position = position + diff;}
        //    else //If the end of the image is reached, it resets the image position
        //    { position = 0; }
    }, interval);

}

const start = () => {
    let start = Date.now(); //Sets the startime for when the script runs
    let start2 = Date.now(); //Sets the startime for sprites
    speedLeft = 0.5;
    speedUp = 0.75;
    timer = setInterval(function () {
        let timePassed = Date.now() - start; //Checks how much time has been passed in total
        let timePassed2 = Date.now() - start2; //Checks how much time has been passed in total for a sprite
        let amount = timePassed2 / 550 + -10;
        draw(); // For the timer so the sprite moves across the screen.
    }, 20);
}

//Animates the script over the screen
const draw = () => {
    //A formula that slides the image across the screen.
    
    let amount = 0;
    imageLeft = image.style.left;
    imageTop = image.style.top;
    imageLeft = imageLeft.substring(0, imageLeft.length - 1);
    imageTop = imageTop.substring(0, imageTop.length - 1);
    switch (whichWay) {
        case "right":
            if (imageLeft >= 105) //Checks if the sprite is offscreen. If it is, it'll teleport to the otherside for a flawless transition
            {
                imageLeft = -10;
            }
            amount = +imageLeft + +speedLeft; // Calculates how much it has to move
            image.style.left = amount + "%"; // Adds it to the style so it happens. The % is there so it works on all resolutions.
            break;
        case "left":
            if (imageLeft <= -10) {
                imageLeft = 105;
            }
            amount = +imageLeft - +speedLeft;
            image.style.left = amount + "%";
            break;
        case "up":
            if (imageTop <= -10) {
                imageTop = 105;
            }
            amount = +imageTop - +speedUp;
            image.style.top = amount + "%";
            break;
        case "down":
            if (imageTop >= 105) {
                imageTop = -10;
            }
            amount = +imageTop + +speedUp;
            image.style.top = amount + "%";
            break;
        case "none":
                break;
    }

}

const stopAnimate = () => {
    clearInterval(tID); // Unused but if called, it'll stop the animation. Only used for debugging.
}
// height = imageheight / 4 * ?;
// 1 = to up
// 2 = to the right
// 3 = to the left
// 4 = to down

const GoRight = () => {
    height = imageheight / 4 * 2;
    whichWay = "right";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoLeft = () => {
    height = imageheight / 4 * 3;
    whichWay = "left";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoDown = () => {
    height = imageheight / 4 * 4;
    whichWay = "down";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

const GoUp = () => {
    height = imageheight / 4 * 1;
    whichWay = "up";
    position = 0;
    document.getElementById("image").style.backgroundPosition =
        `-${position}px ${height}px`;
}

// Run these in order to start the script completely. If you want it to start with a click, build a function around it
imageinfo(`sprites/${characters}`); // Get info of the images so it can calculate everything
let amount = 10 //The place where it starts horizontally (-10 if offscreen, 110 for the opposite side)
image.style.left = amount + "%";
amount = -10; // The place where it starts vertically (-10 if offscreen, 110 for the opposite side)
image.style.top = amount + "%";
//animateScript(); // Animates the sprite and calls out the draw so it walks over the screen
//start(); // Sets down a lot of variables so everything works
const ResetAllTimers = () => {
    // Set a fake timeout to get the highest timeout id
    let highestTimeoutId = setTimeout(";");
    for (let i = 0; i < highestTimeoutId; i++) { // Since it is the highest, all other timers will clear too
        clearTimeout(i);
    }
}

let isItAnimated = 0;
let otherPress =  0;
let keypressed = [];
document.addEventListener("keydown", (e) => { //Checks if a key is pressed down
    if (!e.repeat) { // The !e makes it not repeatable if they key is held down
        switch (e.key.toLowerCase()) {
            case "w": //If key is W
                GoUp(); //Go upwards
                keypressed.push("w"); //Add this to the array to remember what key is pressed down
                otherPress = 0; //Know that the correct key is pressed
                audio.play(); //Play the quality walking sound
                break;
            case "d":
                GoRight();
                keypressed.push("d");
                otherPress = 0;
                audio.play();
                break;
            case "a":
                GoLeft();
                keypressed.push("a");
                otherPress = 0;
                audio.play();
                break;
            case "s":
                GoDown();
                keypressed.push("s");
                otherPress = 0;
                audio.play();
                break;
        
            default:
                otherPress = 1; // Make it 1 so it knows it isn't a correct keypress
                break;

    }

    if (otherPress == 0) { //If the correct key is pressed
        if (isItAnimated == 0){ //If it is being animated already
            animateScript(); // Animates the sprite and calls out the draw so it walks over the screen
            start(); // Sets down a lot of variables so everything works 
            console.log("Hello!");
        }
    }
    isItAnimated = 1;

    //console.log(`Key "${e.key}" pressed [event: keydown]`); //Log down for debugging
    //console.log(keypressed);
      } else { //Check if it is pressed down and not released
        isItAnimated = 1; 
        keypressed.push(e.key);
        //console.log(keypressed);
    //console.log(`Key "${e.key}" repeating [event: keydown]`);
    }
  });

  document.addEventListener("keyup", (e) => {
    //console.log(`Key "${e.key}" released [event: keyup]`);
    keypressed = keypressed.filter(function (letter) {
        return letter !== e.key;
    });
    isItAnimated = 1;
    //console.log(keypressed);
    if (keypressed.length === 0) {
        whichWay = "none";
        audio.pause();
        ResetAllTimers();
        isItAnimated = 0;
        document.getElementById("image").style.backgroundPosition =
        `-${32}px ${height}px`;
    }
    else{ //Makes sure that if another button is still pressed it continues
        let lastElement = keypressed[keypressed.length - 1]; //Check the latest key press in the array
        switch (lastElement.toLowerCase()) { //If a key is let go and if it still pressed down do this for the keys
            case "w": 
                GoUp();
                keypressed.push("w");
                otherPress = 0;
                break;
            case "d":
                GoRight();
                keypressed.push("d");
                otherPress = 0;
                break;
            case "a":
                GoLeft();
                keypressed.push("a");
                otherPress = 0;
                break;
            case "s":
                GoDown();
                keypressed.push("s");
                otherPress = 0;
                break;
        
            default:
                otherPress = 1;
                break;

    }
    if (otherPress == 0) {
        if (isItAnimated == 0){
            animateScript(); // Animates the sprite and calls out the draw so it walks over the screen
            start(); // Sets down a lot of variables so everything works 
            console.log("Hello!");
        }
    }
    }

  });  
 let random = Math.floor(Math.random()*charactersArray.length);
  const randomcharactermoment = () => {
    randomcharacter = charactersArray[random];
    document.getElementById("image").style.background = `url(${"sprites/" + randomcharacter + ".png"})`;
  }
randomcharactermoment();