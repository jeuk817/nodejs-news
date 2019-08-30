const goodBtn = document.getElementById("goodBtn");
const sadBtn = document.getElementById("sadBtn");
const angryBtn = document.getElementById("angryBtn");
const wantBtn = document.getElementById("wantBtn");
const emotions = document.getElementsByClassName("emotion");

for (let i = 0; i < emotions.length; i++) {
    emotions[i].addEventListener('click', async (event) => {
        const emotion = event.target.parentNode.id;
        const _id = document.URL.split('/').pop();
        const response = await fetch('/article/emotion', {
            method: 'POST',
            body: JSON.stringify({ emotion, _id }),
            headers: { "Content-Type": "application/json" }
        })

        if (response.ok) {
            let num = Number(document.getElementById(`${emotion}Num`).textContent);
            num += 1;
            document.getElementById(`${emotion}Num`).textContent = num;
        }
    })
}