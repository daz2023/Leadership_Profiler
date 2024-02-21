document.addEventListener('DOMContentLoaded', function() {
     const questions = ["I have high discomfort with conflict and avoid dealing with it","I can be too much of a stickler or perfectionist","I can’t rest and need to be constantly busy","I am usually more anxious and worried than others around me",
"I take particular pride in being rational and analytical", "I have a tendency towards being moody and melancholy","I measure my self worth mostly through my achievements", "I am a 'pleaser'","I procrastinate a lot", "I can’t help but be a perfectionist","I need to juggle a lot of balls all the time to prevent boredom", "I am hyper-vigilant and always on the lookout for danger",
"Others have described me as too controlling","I can come across as too analytical and intellectually arrogant","I am often annoyed by flaws and faults with others","Pleasing others and having them like me is very important to me","I avoid dealing with conflicts to a point where they fester and become real problems","Status and my public image are important to me","I am often anxious and highly vigilant","I am very critical of myself","I like things to be very orderly and organised",
"I can be confrontational and forceful when I need to get things done","When I am criticised or unfairly treated, I tend to withdraw, pout, or sulk","I tend to intimidate others with the intensity of my analytical mind","Compared to others, I do more pleasing, rescuing, or flattering people",
"Life is about achieving and producing results for me","Others tell me I am too much of a perfectionist","I procrastinate on dealing with important but unpleasant tasks","Others tell me I worry too much","I get impatient with others easily and step in to push things forward","I easily get impatient and bored and want something different",
"When I make a mistake, I beat myself up over it","I can be perceived as cold and too rational","Sometimes I feel like a victim or martyr","I am so into helping others that I sometimes lose sight of my own needs and feel resentful","The circumstances of work or life significantly affect how happy I feel",];
  
const questionToCategoryMap =  {
        0: 0, 8: 0, 16: 0, 27: 0, // Avoider
        12: 1, 14: 1, 20: 1, 29: 1, // Controler
        6: 2, 17: 2, 21: 2, 25: 2,
        4: 3, 13: 3, 23: 3, 32: 3,
        3: 4, 11: 4, 18: 4, 28: 4,
  7: 5, 15: 5, 24: 5, 34: 5,
  2: 6, 10: 6, 19: 6, 30: 6,
  1: 7, 9: 7, 26: 7, 31: 7,
  5: 8, 22: 8, 33: 8, 35: 8,
};

     
const categories = ["Avoider","Controler","Hyper Achiever","Hyper Rational","Hyper Vigilant","Pleaser","Restless","Stickler","Victim",];
const categoryDescriptions = ["The Avoider focuses on the positive and pleasant in an extreme way. It avoids difficult and unpleasant tasks and conflicts.","The Controller, anxiety-based, must take charge and control situations and people’s actions to one’s own will. It generates high anxiety and impatience when that is not possible.","The Hyper-Achiever is dependent on constant performance and achievement for self-respect and self-validation. Latest achievements are quickly discounted, needing more.",
"The Hyper-Rational focuses with intensity and exclusivity on the rational processing of everything, including relationships. It can be perceived as uncaring, unfeeling, or intellectually arrogant.","The Hyper-Vigilant generates continuous intense anxiety about all the dangers and what could go wrong. It creates a vigilance that can never rest.","The Pleaser indirectly tries to gain acceptance and affection by helping, pleasing, rescuing, or flattering others. It loses sight of its own needs and becomes resentful as a result.","The Restless is constantly searching for greater excitement in the next activity or constant busyness. It is rarely at peace or content with the current activity.","The Stickler seeks perfectionism and a need for order and organisation taken too far.  It lives in anxious trying to make too many things perfect.","The Victim is emotional and temperamental as a way to gain attention and affection. It overly focuses on internal feelings, particularly painful ones.",
];

const responseLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Completely Agree"];
    
const categoryScores = new Array(9).fill(0);
let currentQuestionIndex = 0;
const questionnaireDiv = document.getElementById('questionnaire');
const nextBtn = document.getElementById('next-btn'); 
const resultContainer = document.getElementById('result-container');
const resultText = document.getElementById('result-text');
nextBtn.style.display = 'none';
function displayQuestion(index) {
const question = questions[index];
questionnaireDiv.innerHTML = `<div class="question"><p>${question}</p></div>` + 
createResponseOptions(index);
updateProgressBar();
updateQuestionNumber();

document.querySelectorAll('.response-option').forEach(option => {
option.addEventListener('change', handleNextQuestionAutomatically);
    });
}

function handleNextQuestionAutomatically() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (!selectedOption) return; // Safety check
    const categoryIndex = questionToCategoryMap[currentQuestionIndex];
    categoryScores[categoryIndex] += parseInt(selectedOption.value);
    document.querySelectorAll(`input[name="question${currentQuestionIndex}"]`).forEach(radio => {
        radio.disabled = true;
    });
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    setTimeout(() => {
        loadingIndicator.style.display = 'none'; 
        
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    }, 500); 
}
function createResponseOptions(questionIndex) {
    const responseLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Completely Agree"];
    let optionsHTML = '<div class="f-steps-radio-btn-wrapper">';
    responseLabels.forEach((label, idx) => {
        const optionId = `question${questionIndex}_option${idx}`;
        optionsHTML += `
            <input type="radio" id="${optionId}" name="question${questionIndex}" value="${idx + 1}" class="response-option">
            <label for="${optionId}">${label}</label>
        `;
    });
    optionsHTML += '</div>';
    return optionsHTML;
}


  function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function updateQuestionNumber() {
    const questionNumberText = document.getElementById('question-number');
    questionNumberText.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

function displayQuestion(index) {
    const question = questions[index];
    questionnaireDiv.innerHTML = `<div class="question"><p>${question}</p></div>` + createResponseOptions(index);
    updateProgressBar();
    updateQuestionNumber();
}


function handleNextButton() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (!selectedOption) {
        alert("Please select an option.");
        return;
    }

    const categoryIndex = questionToCategoryMap[currentQuestionIndex];
    
    categoryScores[categoryIndex] += parseInt(selectedOption.value);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    } else {
        showResults();
    }
}

function showResults() {
    questionnaireDiv.style.display = 'none';
    nextBtn.style.display = 'none';
    resultContainer.style.display = 'block';
    let resultHTML = '';
    let labels = [];
    let dataPoints = [];
    categories.forEach((category, index) => {
        const categoryScore = categoryScores[index];
        const maxCategoryScore = 4 * 5; // Corrected: Each category can score a max of 20 points (5 points per question for 4 questions)
        const scorePercentage = (categoryScore / maxCategoryScore) * 100;
        resultHTML += `<h3>${category}: ${scorePercentage.toFixed(2)}%</h3><p>${categoryDescriptions[index]}</p>`;
        labels.push(category);
        dataPoints.push(scorePercentage);
    });

    // Update the text display
    resultText.innerHTML = resultHTML;

    const data = {
        labels: labels, // Category names
        datasets: [{
            label: 'Score Percentage',
   backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)',
    'rgba(251, 13, 149, 0.2)',
    'rgba(224, 0, 161, 0.2)',
    'rgba(74, 63, 42, 0.2)',
    'rgba(150, 161, 94, 0.2)',
    'rgba(128, 145, 214, 0.2)'
  ],
  borderColor: [
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)',
    'rgb(251, 13, 149)',
    'rgb(224, 0, 161)',
    'rgb(74, 63, 42)',
    'rgb(150, 161, 94)',
    'rgb(128, 145, 214)'
  ],
            borderWidth: 1,
            data: dataPoints // Score percentages
        }]
    };

  
    const ctx = document.getElementById('resultsChart').getContext('2d');
    if (window.myResultsChart) {
        window.myResultsChart.destroy(); 
    }
    window.myResultsChart = new Chart(ctx, {
        type: 'bar', 
        data: data, 
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value + "%"; 
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false 
                }
            }
        }
    });
}
questionnaireDiv.addEventListener('change', function(event) {
        if (event.target && event.target.matches('input[type="radio"].response-option')) {
            handleNextQuestionAutomatically();
        }
    });
    nextBtn.addEventListener('click', handleNextButton);
    displayQuestion(currentQuestionIndex);
});
