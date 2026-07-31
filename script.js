let answers = {
    format: "Не выбрано",
    food: "Не выбрано",
    time: "Не выбрано",
    style: "Не выбрано"
};

// Автоматическая подстановка сегодняшней даты
window.addEventListener('DOMContentLoaded', () => {
    let dateInput = document.getElementById("date");
    if (dateInput) {
        let today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
    }
});

// Переходы между экранами
function nextScreen(number){
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById("screen" + number).classList.add("active");
}

function prevScreen(number){
    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById("screen" + number).classList.add("active");
}

// Выбор опций (Формат, Еда)
function chooseOption(button, type){
    let buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    answers[type] = button.innerText.trim();
}

// Выбор времени
function chooseTime(button){
    document.querySelectorAll(".times button").forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
    answers.time = button.innerText.trim();
}

// Выбор одежды
function chooseStyle(button){
    let buttons = button.parentElement.querySelectorAll("button");
    buttons.forEach(btn => btn.classList.remove("selected"));

    button.classList.add("selected");
    answers.style = button.innerText.trim();
}

// Итоговый экран и отправка в Telegram
function showResult(){
    let date = document.getElementById("date").value;

    if(!date || answers.time === "Не выбрано"){
        alert("Выбери дату и время ❤️");
        return;
    }

    let dateParts = date.split('-');
    let niceDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    // ТВОИ ДАННЫЕ TELEGRAM
    let BOT_TOKEN = "8814193874:AAEaOgUEiNzXqQINzUBrZdlAZ_oc56vuWbQ";
    let CHAT_ID = "660153132";

    let message = `❤️ Новое приглашение на свидание!

📅 Дата: ${niceDate}
🕒 Время: ${answers.time}
✨ Формат: ${answers.format}
🍕 Еда: ${answers.food}
👔 Одежда: ${answers.style}`;

    // Отправка в Telegram
    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message })
    })
    .then(() => console.log("Сообщение отправлено ❤️"))
    .catch(error => console.log(error));

    // Вывод результатов на карточку
    document.getElementById("result").innerHTML = `
📅 Дата: <br><b>${niceDate}</b><br><br>
🕒 Время: <br><b>${answers.time}</b><br><br>
✨ Свидание: <br><b>${answers.format}</b><br><br>
🍕 Еда: <br><b>${answers.food}</b><br><br>
👔 Одежда: <br><b>${answers.style}</b>
`;

    nextScreen(6);
}