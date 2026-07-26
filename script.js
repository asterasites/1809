// Padajuća srca ❤️

function createHeart(){

    const heart = document.createElement("div");

    heart.innerHTML = "❤️";

    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.top = "-20px";

    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    heart.style.opacity = Math.random();

    heart.style.animation = "fall 8s linear";

    heart.style.zIndex = "5";

    document.body.appendChild(heart);


    setTimeout(()=>{

        heart.remove();

    },8000);

}


setInterval(createHeart,500);




// Animacija kada se skroluje

const sections = document.querySelectorAll("section");


window.addEventListener("scroll",()=>{

    sections.forEach(section=>{

        let position = section.getBoundingClientRect().top;

        let screen = window.innerHeight;


        if(position < screen - 100){

            section.style.opacity="1";
            section.style.transform="translateY(0)";

        }

    });

});



// Dodavanje animacije za srca

const style = document.createElement("style");

style.innerHTML = `

@keyframes fall {

from {

transform:translateY(0) rotate(0deg);

}

to {

transform:translateY(110vh) rotate(360deg);

}

}

`;

document.head.appendChild(style);
// Brojač veze ❤️

const startDate = new Date("2023-09-18T00:00:00");


function updateTimer(){

const now = new Date();


const difference = now - startDate;


const days = Math.floor(difference / (1000 * 60 * 60 * 24));

const hours = Math.floor(
(difference / (1000 * 60 * 60)) % 24
);


const minutes = Math.floor(
(difference / (1000 * 60)) % 60
);


const seconds = Math.floor(
(difference / 1000) % 60
);



document.getElementById("days").innerHTML = days;

document.getElementById("hours").innerHTML = hours;

document.getElementById("minutes").innerHTML = minutes;

document.getElementById("seconds").innerHTML = seconds;


}


setInterval(updateTimer,1000);

updateTimer();
// Poruka kada je teško ❤️

function showMessage(){

const message = document.getElementById("hiddenMessage");


if(message.style.display === "block"){

message.style.display="none";

}

else{

message.style.display="block";

}

}
// Otvaranje koverte 💌

function openLetter(){

const envelope = document.querySelector(".envelope");

envelope.classList.toggle("open");

}
// Muzika sa efektima ❤️🎵


let playing = false;


function playSong(){


let song = document.getElementById("song");

let button = document.getElementById("musicButton");



if(!playing){


song.play();

button.innerHTML="⏸ Pauziraj pesmu";

playing=true;


startParticles();


}

else{


song.pause();

button.innerHTML="🎵 Pusti našu pesmu";

playing=false;


}



}




function startParticles(){


setInterval(()=>{


let item=document.createElement("div");



let symbols=[

"🎵",
"🎶",
"♪",
"♫",
"18",
"09"

];



item.innerHTML=symbols[Math.floor(Math.random()*symbols.length)];



if(item.innerHTML=="18" || item.innerHTML=="09"){

item.className="date";

}

else{

item.className="note";

}



item.style.left=Math.random()*90+"%";

item.style.bottom="20px";



document.getElementById("particles").appendChild(item);



setTimeout(()=>{

item.remove();

},5000);



},500);


}
function openAlbum(){


let password =
document.getElementById("albumPassword").value;


let gallery =
document.getElementById("gallery");


let message =
document.getElementById("wrongPassword");



if(password === "1809mojesve"){


gallery.classList.remove("locked");

gallery.classList.add("unlocked");


message.innerHTML="❤️ Album otključan ❤️";


}

else{


message.innerHTML="❌ Pogrešna lozinka";


}


}
function openAlbum(){

let password = document.getElementById("albumPassword").value;

let gallery = document.getElementById("gallery");

let message = document.getElementById("wrongPassword");


if(password === "1809mojesve"){

    gallery.classList.remove("locked");
    gallery.classList.add("unlocked");

    message.innerHTML="❤️ Album otključan ❤️";

}
else{

    message.innerHTML="❌ Pogrešna lozinka";

}

}
// Povratak na početak ❤️

function goTop(){

window.scrollTo({

top:0,

behavior:"smooth"

});

}
