var questionArray = [];
var currentQuestion = 0;
var timer;
var timerCount = 25;
var timerRunning = false;
var amountCorrect = 0;

function restart()
{
    currentQuestion = 0;
    amountCorrect = 0;
    newQuestion();
    $("#restart").hide()
    $("#gif").hide();
}
class Holder
{
    constructor(question, a0, a1, a2, a3, rA,imgSrc)
    {
        //string text for the question
        this.question = question;
        // array of possible answers
        this.answers=[a0,a1,a2,a3];
        // index of the right answer
        this.rightAns = rA;
        // image we show afterwords
        this.imgSrc = imgSrc;
        questionArray.push(this);
    }
    TestAnswer(i)
    {
        console.log("testing " +i)
        if(i === this.rightAns)
        {
            amountCorrect++;
            return true;
        }
        else
        {
            return false
        }
    }
}

$("#gif").hide();
// this is where we will create all our questions!
function begin()
{
    amountCorrect = 0;
    currentQuestion = 0;
    question1 = new Holder("What was the first video game","Computer Space", "Pong","Asteroids", "Spacewar!", 3, "Spacewar!");
    question2 = new Holder("What was the first game to include Mario?","Super Mario Bros.", "Donkey Kong", "Super Mario Oddesey", "Super Smash Bros.", 1,"DonkeyKong" )
    question3 = new Holder("What pokemon was planned on being the series mascot?", "Pikachu", "Jigglypuff", "Voltorb", "Clefairy", 3,"Clefairy")
    question4 = new Holder("What is the name of the final boss in Super Smash Bros.?", "Master Hand","Boss Hand", "Crazy Hand","Glove Hand", 0,"MasterHand")
    question5 = new Holder("What game was so bad it was buried in a dump in New Mexico?", "Street Fighter", "Duck Tales", "E.T.", "The Addams Family", 2,"ET")
    question6 = new Holder("What was the first consumer video game console?", "Atari 2600","Nintendo Entertainment System", "Magnavox Odyssey","Coleco Vision",2,"MagnavoxOdyssey")
    question7 = new Holder("What was Nintendo's first product?","Playing Cards","Cardboard models","Video Games","Consoles",0,"PlayingCards")
    question8 = new Holder("How much gameplay did the sound designer for Street Fighter 2 use to design the music?","200 hrs","100 hrs","1 week","none",3,"StreetFighter")
    question9 = new Holder("What was the first game to have save files?","Metroid","The Legend of Zelda","Super Mario Bros.","Sonic the Hedgehog",1,"Zelda")
    question10 = new Holder("What is the console with the most sales ever?","Wii","Playstation 2","Nintendo 64","Atari 2600", 1,"Playstation2")
    newQuestion();
}
begin();


// this is where we will check our answers.
function answered(int)
{
    
    if(timerRunning) 
    {  
        if(questionArray[currentQuestion].TestAnswer(int))
        {
            correct();

        }
        else
        {
            $("#answer"+int).css("color", "red");
            wrong();
        }
        stopTimer();
        currentQuestion++;
    }
    $("#correct-shower").text("You have " + amountCorrect+"/"+currentQuestion + " correct");

}

//this is called when we have the right answer
function correct()
{
    console.log("correct")
    $("#answer"+questionArray[currentQuestion].rightAns).css("color", "blue");
    $("#gif").attr("src","assets/images/"+ questionArray[currentQuestion].imgSrc +".gif")
    setTimeout(()=>
    {
        $("#gif").show()
    }, 10);
    setTimeout(() => {
        $("#gif").hide()
        newQuestion();
    }, 3000);

}

// this is called when we get it wrong or time out
function wrong()
{
    console.log("wrong")
    
    $("#answer"+questionArray[currentQuestion].rightAns).css("color", "blue");
    $("#gif").attr("src","assets/images/"+ questionArray[currentQuestion].imgSrc +".gif")
    $("#gif").show()
    setTimeout(() => {
        $("#gif").hide()
        newQuestion();
    }, 3000);

}

//this starts the timer
function startTimer()
{
    if(!timerRunning)
    {
        timerRunning = true;
        timerCount = 25;
        $("#timer").text("Time left: " + timerCount);
        timer = setInterval(() => {
            if(timerCount>0)
            {
                timerCount--;
                $("#timer").text("Time left: " + timerCount);
            }
            if(timerCount ==0)
            {
                $("#timer").text("Time is up");
                stopTimer;
                answered(4);
            }
        }, 1000);
    }
}

// this stops the timer;
function stopTimer()
{
    timerRunning=false;
    clearInterval(timer);
}

// this loads the next question;
function newQuestion()
{
    if(currentQuestion < questionArray.length)
    {
        $("#question").text(questionArray[currentQuestion].question)
        for(var i =0;i<4;i++)
        {
            $("#answer"+i).text(questionArray[currentQuestion].answers[i]);
        }
        startTimer();
        for(var i =0;i<4;i++)
        {
            console.log($("#answer"+i));
            $("#answer"+i).css("color", "black");
        }
    }
    else{
        finished();
    }
}

//this is called when the game is finished.
function finished()
{
    console.log("finished")
    $("#question").text("You got " + amountCorrect+" out of "+currentQuestion + " Congratulations");
    stopTimer();
    $("#timer").text("");
    for(var i = 0; i<4; i++)
    {
        $("#answer"+i).text("");
    }
    $("#correct-shower").text("");
    $("#gif").attr("src","assets/images/Applause.gif").show();
    $("#restart").show();
}

//this is for assigning buttons sorta, since I am not using classical buttons.
function assignButtons()
{
    for(var i =0;i<4;i++)
    {
        $("#answer"+i).attr("data",i)
        $("#answer"+i).on("click", function()
        {
            var int = parseInt( $(this).attr("data"));
            answered(int);
            console.log($(this).attr("data")+ " pressed")
        });
    }
    $("#restart").click(function()
    { 
        restart();
    });
    $("#restart").hide();
}
assignButtons()