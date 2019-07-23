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

    var game = {
        correct: 0,
        wrong: 0,
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
            answered: false
        },
        question2: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question3: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question4: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question5: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question6: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question7: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question8: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
        },
        question9: {
            question: "",
            answers: ["", "", "", ""],
            correctAnswer: "",
            answerScreenImage: "",
            answerScreenDescription: "",
            timeLimit: 25,
            answered: false
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
                default: return false;
            }
        },
        /**
         * @param {Number} number - returns question from object of index 
         */
        getQuestion: function (number) {
            switch (number) {
                case 1: return this.question1.question; break;
                case 2: return this.question2.question; break;
                case 3: return this.question3.question; break;
                case 4: return this.question4.question; break;
                case 5: return this.question5.question; break;
                case 6: return this.question6.question; break;
                case 7: return this.question7.question; break;
                case 8: return this.question8.question; break;
                case 9: return this.question9.question; break;
                default: return false;
            }
        },
        /**
         * @param {Number} number - returns answer from object of question 
         */
        getAnswer: function (number) {
            switch (number) {
                case 1: return this.question1.correctAnswer; break;
                case 2: return this.question2.correctAnswer; break;
                case 3: return this.question3.correctAnswer; break;
                case 4: return this.question4.correctAnswer; break;
                case 5: return this.question5.correctAnswer; break;
                case 6: return this.question6.correctAnswer; break;
                case 7: return this.question7.correctAnswer; break;
                case 8: return this.question8.correctAnswer; break;
                case 9: return this.question9.correctAnswer; break;
                default: return false;
            }
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
        clearInterval(game.timerID);
        var clickedAnswer = $(this).text();
        if (game.getAnswer(game.questionIndex) === clickedAnswer) {
            generateAnswerBox(game.getQuestionObject(game.questionIndex), true);
        } else {
            generateAnswerBox(game.getQuestionObject(game.questionIndex), false);
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
        var buttonIndex = 1;
        question.answers.forEach(answer => {
            var $buttonRow = $("<div>").addClass("row");
            var $relativeButton = $("<button>").addClass("btn btn-dark answerButton");
            $relativeButton.text(answer);
            moveElement($relativeButton, $buttonRow);
            moveElement($buttonRow, $triviaBox);
            buttonIndex++;
        });

        moveElement($question, $questionRow);
        $triviaBox.prepend($questionRow);
        moveElement($triviaBox, $container);

        if (startTimer) {
            game.timeLeft = question.timeLimit;
            var $timer = $("<div>").addClass("timer").text("Timer Left: " + game.timeLeft);
            $triviaBox.prepend($timer);
            game.timerID = setInterval(() => {
                if (game.timeLeft <= 0) {
                    game.unanswered++;
                    goToNextQuestion();
                    clearInterval(game.timerID);
                    return;
                }
                $timer.text("Timer Left: " + game.timeLeft);
                game.timeLeft--;
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