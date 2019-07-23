$(document).ready(function () {


    /**
     * BEGIN VARIABLES
     */

    // THE container
    var $container = $(".container");

    // Containers
    var $titleScreen = $("<div>").addClass("titleScreen");
    var $triviaBox = $("<div>").addClass("triviaBox");
    var $answerBox = $("<div>").addClass("answerBox");
    var $endScreen = $("<div>").addClass("titleScreen");        

    var game = {
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        timerID: null,
        timeLeft: 0,
        questionIndex: 1,
        question1: {
            question: "When was the first gaming console released?",
            answers: ["1972", "1980", "1976", "1969"],
            correctAnswer: "1972",
            answerScreenImage: "assets/images/question1.gif",
            answerScreenDescription: "When most people think about the first video game, they think of Pong, the ping-pong arcade game released by Atari in 1972. However, months earlier, Magnavox had released its Magnavox Odyssey, a home video game system based on the “Brown Box,” a prototype invented by Ralph Baer",
            timeLimit: 10,
        },
        question2: {
            question: "When was Pack-Man released?",
            answers: ["May 14, 1975", "May 26, 1978", "May 22, 1980", "May 18, 1982"],
            correctAnswer: "May 22, 1980",
            answerScreenImage: "assets/images/question2.gif",
            answerScreenDescription: "On May 22, 1980, the Pac-Man video game was released in Japan and by October of the same year, it was released in the United States. The yellow, pie-shaped Pac-Man character, who travels around a maze trying to eat dots and avoid four mean ghosts, quickly became an icon of the 1980s.",
            timeLimit: 10,
        },
        question3: {
            question: "Which game was the highest-grossing game from Nintendo?",
            answers: ["Donkey Kong", "Super Mario", "Mario Cart", "Wii Sports"],
            correctAnswer: "Super Mario",
            answerScreenImage: "assets/images/question3.gif",
            answerScreenDescription: "Super Mario is a series of platform games created by Nintendo, and featuring their mascot, Mario, earning over $15 billion in revenue!",
            timeLimit: 10,
        },
        question4: {
            question: "Which call of Duty game was the highest-grossing?",
            answers: ["COD Black Ops II", "COD Black Ops", "COD Modern Warfare 3", "COD Modern Warfare 2"],
            correctAnswer: "COD Modern Warfare 3",
            answerScreenImage: "assets/images/question4.gif",
            answerScreenDescription: "With the release of COD Modern Warfare 3 in 2011, the game made over $30 million in revenue!",
            timeLimit: 10,
        },
        question5: {
            question: "What is the best game ever created?",
            answers: ["Minecraft", "Minecraft", "Minecraft", "Minecraft"],
            correctAnswer: "Minecraft",
            answerScreenImage: "assets/images/question5.gif",
            answerScreenDescription: "Explore new gaming adventures, accessories, & merchandise on the Minecraft Official Site. Buy & download the game here, or check the site for the latest news. (minecraft.net)",
            timeLimit: 5,
        },
        question6: {
            question: "What was the highest-grossing RPG game?",
            answers: ["World of Warcraft", "The Elder Scrolls V", "Diablo III", "Pokémon Red/Green/Blue/Yellow"],
            correctAnswer: "Pokémon Red/Green/Blue/Yellow",
            answerScreenImage: "assets/images/question6.gif",
            answerScreenDescription: "The release of Pokémon Red/Green/Blue/Yellow in 1996 put Pokémon in the lead with a gross revenue of more than $59 million!",
            timeLimit: 10,
        },
        question7: {
            question: "You have more than likely played an Atari game. What does 'Atari' mean?",
            answers: ["Money", "Video Game", "Success", "Fun"],
            correctAnswer: "Success",
            answerScreenImage: "assets/images/question7.gif",
            answerScreenDescription: "It more so means 'going to succeed' because the defintions is: A move that threatens the immediate capture of one or more stones. In chess, the equivalent word would be check, before check-mate happens",
            timeLimit: 10,
        },
        question8: {
            question: "How many controllers are supported at once on the PS3?",
            answers: ["2", "7", "6", "4"],
            correctAnswer: "7",
            answerScreenImage: "assets/images/question8.gif",
            answerScreenDescription: "Could you even imagine having a screen split 7 times? Didn't think so.",
            timeLimit: 10,
        },
        question9: {
            question: "Which item made Mario invincible in Super Mario Bros.?",
            answers: ["Starman", "Feather", "Red Mushroom", "Green Mushroom"],
            correctAnswer: "Starman",
            answerScreenImage: "assets/images/question9.gif",
            answerScreenDescription: "Starman not only makes Mario invincible but also his touch lethal to enemies.",
            timeLimit: 25,
        },
        question10: {
            question: "When did the first Call of Duty: Zombies come out?",
            answers: ["2009", "2006", "2011", "2008"],
            correctAnswer: "2009",
            answerScreenImage: "assets/images/question10.gif",
            answerScreenDescription: "Call of Duty: Zombies is a first-person shooter video game developed by Ideaworks Game Studio, and published by Activision for iOS. It is a spin-off of the Call of Duty series, and based on the Zombie mode of Call of Duty: World at War. The game was released worldwide on November 16, 2009",
            timeLimit: 10,
        },
        /**
         * @param {Number} number - returns question object of index 
         */
        getQuestionObject: function (number) {
            switch (number) {
                case 1: return this.question1; break;
                case 2: return this.question2; break;
                case 3: return this.question3; break;
                case 4: return this.question4; break;
                case 5: return this.question5; break;
                case 6: return this.question6; break;
                case 7: return this.question7; break;
                case 8: return this.question8; break;
                case 9: return this.question9; break;
                case 10: return this.question10; break;
                default: return false;
            }
        },
        /**
         * @param {Number} number - returns question from object of index 
         */
        getQuestion: function (number) {
            return this.getQuestionObject(number).question;
        },
        /**
         * @param {Number} number - returns answer from object of question 
         */
        getAnswer: function (number) {
            return this.getQuestionObject(number).correctAnswer;
        }
    }

    /**
     * END VARIABLES
     * 
     * BEGIN EVENTS
     */

    generateStartScreen();

    $(document).on("click", ".startButton", function() {
        generateTriviaBox(game.getQuestionObject(game.questionIndex), true);
    });

    $(document).on("click", ".nextQuestion", function() {
        goToNextQuestion();
    });

    $(document).on("click", ".answerButton", function() {
        var clickedAnswer = $(this).text();
        if (game.getAnswer(game.questionIndex) === clickedAnswer) {
            generateAnswerBox(game.getQuestionObject(game.questionIndex), true);
            game.correct++;
        } else {
            generateAnswerBox(game.getQuestionObject(game.questionIndex), false);
            game.incorrect++;
        }
    });

    /**
     * END EVENTS
     * 
     * BEGIN FUNCTIONS
     */

    function goToNextQuestion() {
        game.questionIndex++;
        if (game.getQuestionObject(game.questionIndex) == false) {
            generateEndScreen();
        } else {
            generateTriviaBox(game.getQuestionObject(game.questionIndex), true);
        }
    }

    // Generate first loading page with Start button
    function generateStartScreen() {

        var $title = $("<img>");
        $title.addClass("titleImage");
        $title.attr("src", "assets/images/title.png");

        var $startButton = $("<button>").addClass("btn btn-dark startButton");
        $startButton.attr("type", "button");
        $startButton.text("Start asking me questions!");

        var $description = $("<div>");
        $description.attr("id", "description");
        $description.text("You will be asked random questions about the history of video games! Are you ready?");

        moveElement($title, $titleScreen);
        moveElement($description, $titleScreen)
        moveElement($startButton, $titleScreen);
        moveElement($titleScreen, $container);
    }

    /**
     * @param {*} question - Question object
     * @param {Boolean} startTimer - Automatically start timer
     */
    function generateTriviaBox(question, startTimer) {
        $titleScreen.detach();
        $answerBox.detach();
        $triviaBox.empty();

        var $questionRow = $("<div>").addClass("row");
        var $question = $("<div>").text(question.question).addClass("question");
        question.answers.forEach(answer => {
            var $buttonRow = $("<div>").addClass("row");
            var $relativeButton = $("<button>").addClass("btn btn-dark answerButton");
            $relativeButton.text(answer);
            moveElement($relativeButton, $buttonRow);
            moveElement($buttonRow, $triviaBox);
        });

        moveElement($question, $questionRow);
        $triviaBox.prepend($questionRow);
        moveElement($triviaBox, $container);

        if (startTimer) {
            clearInterval(game.timerID);
            game.timeLeft = question.timeLimit;
            var $timer = $("<div>").addClass("timer").text("Time Left: " + game.timeLeft);
            $triviaBox.prepend($timer);
            console.log("STARTED A NEW");
            game.timerID = setInterval(function() {
                if (game.timeLeft <= 0) {
                    game.unanswered++;
                    clearInterval(game.timerID);
                    goToNextQuestion();
                } else {
                    $timer.text("Time Left: " + game.timeLeft);
                    game.timeLeft--;
                }
                console.log("STARTED A NEW");
            }, 1000);
        }
    }

    /**
     * @param {*} question - Question object
     */
    function generateAnswerBox(question, correct) {
        $titleScreen.detach();
        $triviaBox.detach();
        $answerBox.empty();

        var $nextQuestionButton = $("<button>").addClass("btn btn-dark nextQuestion").text("Go to the next question >>");
        var $title = $("<div>").addClass("answerTitle");
        var $description = $("<div>").addClass("answerDescription").text(question.answerScreenDescription);
        var $image = $("<img>").addClass("answerImage").attr("src", question.answerScreenImage);

        if (correct) {
            $title.text("Your answer was correct!");
        } else {
            $title.text("Your answer was wrong!");
        }

        moveElement($title, $answerBox);
        moveElement($image, $answerBox);
        moveElement($description, $answerBox);
        moveElement($nextQuestionButton, $answerBox);

        moveElement($answerBox, $container);
    }

    /**
     * Generate the final screen displaying stats.
     */
    function generateEndScreen() {
        $titleScreen.detach();
        $triviaBox.detach();
        $answerBox.detach();
        $endScreen.empty();

        var $title = $("<img>");
        $title.addClass("titleImage");
        $title.attr("src", "assets/images/title.png");
        var $correct = $("<div>");
        $correct.attr("id", "description");
        $correct.text("Correct: " + game.correct);
        var $incorrect = $("<div>");
        $incorrect.attr("id", "description");
        $incorrect.text("Incorrect: " + game.incorrect);
        var $unanswered = $("<div>");
        $unanswered.attr("id", "description");
        $unanswered.text("Un-answered: " + game.unanswered);
    
        moveElement($title, $endScreen);
        moveElement($correct, $endScreen);
        moveElement($incorrect, $endScreen);
        moveElement($unanswered, $endScreen);
        moveElement($endScreen, $container);

    }

    /**
     * @param {*} element Element to be moved
     * @param {*} to Where element will be moved
     */
    function moveElement(element, to) {
        var $element = $(element);
        var $to = $(to);
        $element.detach();
        $to.append($element);
    }


});