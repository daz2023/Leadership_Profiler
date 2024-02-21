document.addEventListener('DOMContentLoaded', function() {
const questions = [
"I know myself well and make decisions confidently.",
"I have a clear vision for my ideal life.",
"I maintain an open and growth-oriented mindset.",
"I maintain high energy levels throughout the day.",
"I often experience calmness and contentment.",
"I establish and maintain positive habits.",
"I use goal-setting tools to prioritize tasks.",
"I feel deeply connected to the world.",
"I'm comfortable sharing my thoughts and feelings.",
"I set and achieve clear goals at work and in life.",
"I trust in my ability to learn and grow.",
"I feel at peace with and take care of my body.",
"I can identify and express my emotions.",
"I use cues to stay on track with my routines.",
"I minimize interruptions when focused.",
"I have a meaningful spiritual practice.",
"I feel grounded and self-assured.",
"I consistently follow through on my goals.",
"Mistakes are valuable learning opportunities.",
"My physical fitness is a priority.",
"I'm comfortable with occasional sadness or anger.",
"I reward myself to reinforce positive habits.",
"I tackle the most important tasks first.",
"I engage comfortably with strangers.",
"I stick to my decisions without wavering.",
"I plan and organize my time effectively.",
"I believe effort leads to mastery.",
"I usually feel calm and relaxed.",
"Mental fitness and happiness are both important to me.",
"My environment supports my routines.",
"I allocate time for effective planning.",
"I appreciate solitude without feeling lonely.",
"I prioritize my needs, even if it means not everyone agrees.",
"I willingly embrace challenging goals.",
"I embrace challenges and view fear as part of progress.",
"I prioritize mental and physical well-being.",
"I practice mindfulness and self-reflection.",
"I show self-compassion when routines lapse.",
"I work calmly while adhering to deadlines.",
"I actively participate in multiple communities.",
"I honor my boundaries and say 'no' when necessary.",
"I set daily intentions for a purposeful day.",
"I approach new experiences with curiosity.",
"I don’t particularly suffer from a physical or mental ailment.",
"I express appreciation to others.",
"Returning to positive habits is easier for me.",
"I schedule time for relaxation and enjoyment.",
"I engage in deep conversations regularly.",
  ];
  
     const questionToCategoryMap = { 
    0: 0, 8: 0, 16: 0, 24: 0, 32: 0, 40: 0,   
    1: 1, 9: 1, 17: 1, 25: 1, 33: 1, 41: 1,  
    2: 2, 10: 2, 18: 2, 26: 2, 34: 2, 42: 2, 
    3: 3, 11: 3, 19: 3, 27: 3, 35: 3, 43: 3,
    4: 4, 12: 4, 20: 4, 28: 4, 36: 4, 44: 4,
    5: 5, 13: 5, 21: 5, 29: 5, 37: 5, 45: 5,
    6: 6, 14: 6, 22: 6, 30: 6, 38: 6, 46: 6,
    7: 7, 15: 7, 23: 7, 31: 7, 39: 7, 47: 7,  
};

    const categories = [
        "Self-Awareness & Strengths",
        "Vision & Goal Alignment",
        "Empowering Mindset",
        "Vital Health & Self-Care",
        "Emotional Mastery",
        "Positive Daily Habits",
        "Efficient Time Mastery",
        "Connecting for Success",
    ];

    const categoryDescriptions = [
        "Know yourself before setting your course. Self-awareness leads to better decision-making, improved self-control, and lasting happiness. Understanding your worth is essential for achieving success and well-being.",
        "A clear vision and well-defined goals provide direction, motivation, and commitment. They empower you to overcome obstacles, stay accountable, and make purposeful decisions.",
        "Your mindset shapes your reality. A growth mindset, rooted in belief and effort, drives you to embrace challenges, learn from mistakes, and stay motivated even in adversity. With effort, you can reach your goals and become your best self.",
        "Your body is the vehicle for sustained performance. Health and self-care are essential for physical and mental well-being. They fuel your energy, positivity, focus, and resilience, helping you seize life's opportunities.",
        "Uncover the hidden influencers behind your actions and emotions. Understanding your emotional patterns empowers you to control your responses and adopt more constructive behaviors and habits. Achieving emotional balance starts with mindfulness.",
        "Small actions lead to success and happiness. Building positive habits, driven by intrinsic motivation and accountability, paves the way for efficient, consistent progress. A strong routine frees up time for creativity and innovation.",
        "Mastering time management is the key to prioritization, efficiency, and stress reduction. Effective time management ensures you meet deadlines and maintain peak performance. Poor time management can lead to missed opportunities and increased stress.",
        "Recognize the impact of your actions on others and embrace interconnectedness. Feeling connected enhances your performance and well-being, nurturing empathy, meaningful relationships, and community. Disconnection leads to disengagement and reduced productivity.",
    ];

    const responseLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Completely Agree"];
    
   const categoryScores = new Array(8).fill(0);
    let currentQuestionIndex = 0;

    const questionnaireDiv = document.getElementById('questionnaire');
    const nextBtn = document.getElementById('next-btn'); // Ensure you have this button in your HTML
    const resultContainer = document.getElementById('result-container');
    const resultText = document.getElementById('result-text');
nextBtn.style.display = 'none';
  function displayQuestion(index) {
    const question = questions[index];
    questionnaireDiv.innerHTML = `<div class="question"><p>${question}</p></div>` + 
  createResponseOptions(index);
    updateProgressBar();
    updateQuestionNumber();
    
    // Attach event listeners to each radio button
    document.querySelectorAll('.response-option').forEach(option => {
        option.addEventListener('change', handleNextQuestionAutomatically);
    });
}

function handleNextQuestionAutomatically() {
    const selectedOption = document.querySelector(`input[name="question${currentQuestionIndex}"]:checked`);
    if (!selectedOption) return; // Safety check

    // Ensure this part runs before inputs are disabled
    // Find the category this question belongs to and update the score
    const categoryIndex = questionToCategoryMap[currentQuestionIndex];
    categoryScores[categoryIndex] += parseInt(selectedOption.value);

    // Disable further input and show loading indicator
    document.querySelectorAll(`input[name="question${currentQuestionIndex}"]`).forEach(radio => {
        radio.disabled = true;
    });
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';

    setTimeout(() => {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
        
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            displayQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    }, 500); // Delay for showing the next question or results
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
        const maxCategoryScore = 6 * 5; // Corrected: Each category can score a max of 20 points (5 points per question for 4 questions)
        const scorePercentage = (categoryScore / maxCategoryScore) * 100;
        resultHTML += `<h3>${category}: ${scorePercentage.toFixed(2)}%</h3><p>${categoryDescriptions[index]}</p>`;
        labels.push(category);
        dataPoints.push(scorePercentage);
    });
    resultText.innerHTML = resultHTML;
    const data = {
        labels: labels,
        datasets: [{
            label: 'Score Percentage',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            pointBackgroundColor: 'rgba(0, 123, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(0, 123, 255, 1)',
            data: dataPoints
        }]
    };
    const ctx = document.getElementById('resultsChart').getContext('2d');
    if (window.myResultsChart) {
        window.myResultsChart.destroy();
    }
   window.myResultsChart = new Chart(ctx, {
    type: 'bar', // This remains the same as you're still creating a bar chart
    data: data,
    options: {
        indexAxis: 'y', // Correct property to make the bars horizontal
        scales: {
            x: { // Changed from 'y' to 'x' because we're now dealing with a horizontal chart
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
