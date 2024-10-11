let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;

// Початок гри після натискання будь-якої клавіші
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Рівень " + level);
        nextSequence();
        started = true;
    }
});

// Натискання на кольорові кнопки
$(".btn").click(function() {
    if (started) { // Додаємо перевірку, щоб кнопки працювали лише після початку гри
        let userChosenColor = $(this).attr("class").split(' ')[1];
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // Якщо користувач вибрав правильну послідовність
        if (userClickedPattern.length === gamePattern.length) {
            // Переходимо на новий рівень після завершення поточної послідовності
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // Гра завершується при неправильному виборі
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Гра закінчена, натисніть будь-яку клавішу для перезапуску");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Рівень " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Додаємо анімацію для нової послідовності
    $("." + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
