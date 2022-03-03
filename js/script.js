const typingtext = document.querySelector(".typing-text p"),
    inpfield = document.querySelector(".wrapper .input-field"),
    mistaketag = document.querySelector(".mistake span"),
    timetag = document.querySelector(".time span b"),
    wpmtag = document.querySelector(".wpm span"),
    cpmtag = document.querySelector(".cpm span"),
    tryagainbtm = document.querySelector("button");

let timer,
    maxtime = 60,
    timeleft = maxtime,
    charindex = mistakes = istyping = 0;

function randomParagraph() {
    //getting random number and it'll always less than the paragraph length
    let randamindex = Math.floor(Math.random() * paragraph.length);
    typingtext.innerHTML = "";
    //getting random item from the paragraphs array ,splitting all characters of its
    //adding each character inside span and then adding this inside span and then adding this     span inside p tag
    paragraph[randamindex].split("").forEach(span => {
        let spantag = `<span>${span}</span>`;
        typingtext.innerHTML += spantag;
    });
    typingtext.querySelectorAll("span")[0].classList.add("active");
    //focusing input field on keydown or click event
    document.addEventListener("keydown", () => inpfield.focus());
    typingtext.addEventListener("click", () => inpfield.focus());
}
function inittyping() {
    const characters = typingtext.querySelectorAll("span")
    let typedchar = inpfield.value.split("")[charindex];
    if (charindex < characters.length - 1 && timeleft > 0) {
        if (!istyping) {//once timer is start ,it won,t restart again on every key clicked
            timer = setInterval(inittimer, 1000);
            istyping = true;
        }
        // if user typed character and shown character matched then add the
        // correct class else increment the mistakes and add the incorrect class
        if (typedchar == null) {
            charindex--;//decrement charindex
            if (characters[charindex].classList.contains("incorrect")) {
                mistakes--;
            }
            characters[charindex].classList.remove("correct", "incorrect");
        }
        else {
            if (characters[charindex].innerText === typedchar) {
                //console.log("correct");
                characters[charindex].classList.add("correct");
            }
            else {
                mistakes++;
                characters[charindex].classList.add("incorrect");
            }
            charindex++;//increment charindex either user typed correct or incorrect character

        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charindex].classList.add("active");

        let wpm = Math.round((((charindex - mistakes) / 5) / (maxtime - timeleft)) * 60);
        // if wpm value is 0, emptyor infinity then setting it's value to 0
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
        mistaketag.innerText = mistakes;
        wpmtag.innerText = wpm;
        cpmtag.innerText = charindex - mistakes;//cpm will not count mistakes
    }
    else {
        inpfield.value = "";
        clearInterval(timer);
    }
}

function inittimer() {
    // if timeleft is greater than 0 then decrement the timeleft else clear the timer
    if (timeleft > 0) {
        timeleft--;
        timetag.innerText = timeleft;
    }
    else {
        clearInterval(timer);
    }
}

function resetgame() 
{
    // calling load paragraph function and
    // reseting each variables and elements value to default
    randomParagraph();
    inpfield.value = "";
    clearInterval(timer);
    timeleft = maxtime;
    charindex = mistakes = istyping = 0;
    timetag.innerText = timeleft;
    mistaketag.innerText = mistakes;
    wpmtag.innerText = 0;
    cpmtag.innerText = 0;
}


randomParagraph();
inpfield.addEventListener("input", inittyping);
tryagainbtm.addEventListener("click", resetgame);