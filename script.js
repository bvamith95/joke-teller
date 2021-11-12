const button = document.getElementById('button');
const audioElement= document.getElementById('audio');



//  Disable / Enable button 
function toggleButton(){
    button.disabled =!button.disabled;
}

// Passing Joke to Voice RSS API
function tellMe(joke){
    console.log('tell me:',joke);
    VoiceRSS.speech({
        key: 'cd983cd0195548749b08269775c447bc',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 2, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from JokeAPI

async function getJokes(){
    let joke ='';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Dark,Pun,Spooky';
    try {
        const response =await fetch(apiUrl);
        const data = await response.json();
        if (data.setup){
            joke = `${data.setup} .... ${data.delivery}`;
        } else{
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch(error){
        // Catch Error's Here
        console.log('whoops',error);
    }
}

// Event Listeners 

button.addEventListener('click',getJokes);
audioElement.addEventListener('ended',toggleButton);
