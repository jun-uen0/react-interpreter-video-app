function speak() {
    let speak = new SpeechSynthesisUtterance();
    speak.text = document.querySelector('.text').value;
    speak.rate = .9;
    speak.pitch = 0;
    speak.lang = 'ja-JP';

    sleep(0500);
    speechSynthesis.speak(speak);

}

function sleep(time) {
    var date_1 = new Date().getTime();
    var date_2 = new Date().getTime();
    while (date_2 < date_1 + time) {
        date_2 = new Date().getTime();
    }
    return;
};