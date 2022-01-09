// 音声認識APIの用意 ================================
const recognition = new webkitSpeechRecognition();
const startBtn = document.getElementById('voice-start');
const content = document.getElementById('subtitle');

// 停止ボタンで音声認識の停止 ================================
// stopBtn.onclick = () => {
//     recognition.stop();
// }

// 言語選択のボタンが押されたら実行 ================================
function getIndexNo() {

  // 翻訳先の取得
  const theirLangobj = document.getElementById('theirLang');
  const theirLangIdx = theirLangobj.selectedIndex;
  const theirLangtxt = theirLangobj.options[theirLangIdx].text;
  document.getElementById('their-selectedText').textContent = theirLangtxt + "が選択されてます";

  // 翻訳元の取得
  const obj = document.getElementById('myLang');
  const idx = obj.selectedIndex;
  const txt = obj.options[idx].text;
  document.getElementById('your-selectedText').textContent = txt + "が選択されてます";

  console.log(theirLangIdx);

  // 言語の選択
  const langObj = ["zh", "en", "ja"];
  recognition.lang = langObj[idx];
  const targetLang = langObj[theirLangIdx];

  console.log(targetLang);

  // 文章読み上げAPIの用意 ================================
  const speech = new SpeechSynthesisUtterance();
  speech.rate = .9; // 読み上げ速度 0.1-10 初期値:1 (倍速なら2, 半分の倍速なら0.5, )
  speech.pitch = 0; // 声の高さ 0-2 初期値:1(0で女性の声)
  speech.lang = targetLang;

  // 開始ボタンで音声認識の開始 ================================
  // startBtn.onclick = () => {
  //     recognition.start();
  // }

  recognition.start();

  // 文章の区切りを理解し、字幕表示 → 翻訳 ================================
  recognition.onresult = function (e) {
    recognition.stop();
    if (e.results[0].isFinal) {
      async function translationApi() {
        const url = 'https://script.google.com/macros/s/AKfycbw9knzbG43MsrSGYXCt1sNoal_YRJ5FXYg08FoYseekR2ZmFX5FMYaoyEdwfh7PKVZQ2w/exec?';

        const autotext = e.results[0][0].transcript

        const res = await fetch(url + "text=" + autotext + "&source" + recognition.lang + "&target=" + targetLang);
        const translateObj = await res.json();
        const translation = translateObj.text;

        content.innerHTML += '<div id="autotext" class="autotext">' + autotext + '</div>';
        content.innerHTML += '<div id="translation" class="translation">' + translation + '</div>';

        const msg = {
          autotext: autotext,
          translation: translation
        }
        ref.push(msg);

        const messagesArea = document.getElementById('text-area');
        messagesArea.scrollTop = messagesArea.scrollHeight;

        console.log(autotext);
        console.log(translation);
      }
      translationApi();
    }
    speech.text = document.getElementById('autotext');
  }

  // 音声入力再開
  recognition.onend = () => {
    recognition.start()
  };
}