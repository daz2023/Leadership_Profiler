document.addEventListener('DOMContentLoaded', function() {
const questions = [
"I give priority to teamwork and collaboration in my leadership.",
"I tailor my communication to suit my audience.",
"I view conflicts as opportunities for growth and understanding.",
"I inspire my team with a shared vision and clear objectives.",
"I offer constructive feedback for personal development.",
"I readily adjust my leadership style to different situations.",
"I identify and nurture potential future leaders within my team.",
"I actively shape the organisational culture to align with values and mission.",
"I regularly seek feedback and self-assessment for self-improvement.",
"I base strategic decisions on a comprehensive analysis of information.",
"I give priority to establishing trust and credibility with teams and stakeholders.",
"I actively seek and implement innovative solutions and technologies.",
"I actively seek input from team members and stakeholders.",
"I actively listen and strive to understand others' viewpoints.",
"I mediate disputes effectively, seeking common ground.",
"I acknowledge and celebrate individual and team accomplishments.",
"I set ambitious yet attainable goals for my team.",
"I remain open to new ideas and embrace change.",
"I actively mentor and coach team members for leadership roles.",
"I promote a culture of teamwork, collaboration, and mutual support.",
"I am dedicated to continuous personal development and growth.",
"I consider both short-term and long-term implications in decision-making.",
"I maintain transparency and open communication to foster trust.",
"I am comfortable with calculated risk-taking in entrepreneurial ventures.",
"I align team objectives with the organisation's mission.",
"I convey intricate ideas with clarity and relatability.",
"I adapt my conflict resolution approach to suit the circumstances.",
"I motivate team members to surpass their own expectations.",
"I continually monitor and evaluate performance for enhancement.",
"I am comfortable with ambiguity and uncertainty.",
"I formulate clear succession plans for a seamless transition.",
"I uphold high standards of ethics and integrity within my team.",
"I proactively address my leadership weaknesses.",
"I adjust my strategy to changing market conditions and trends.",
"I consistently follow through on commitments and pledges.",
"I foster and reward creativity and innovation within my team.",
"I cultivate an inclusive and collaborative team culture.",
"I handle challenging conversations with empathy.",
"I remain composed under pressure during conflict resolution.",
"I lead by example, setting elevated standards.",
"I nurture the talents and abilities of my team.",
"I promote experimentation and innovation.",
"I create opportunities for team members to assume leadership roles.",
"I instil discipline and accountability in work processes.",
"I embrace challenges as prospects for self-improvement.",
"I weigh risks and rewards in strategic decisions.",
"I manage confidential information with the utmost integrity.",
"I view setbacks as learning opportunities and stay resilient in risk.",
  ];
const questionToCategoryMap = [
    0, 12, 24, 36,
    1, 13, 25, 37,
    2, 14, 26, 38,
    3, 15, 27, 39,
    4, 16, 28, 40,
    5, 17, 29, 41,
    6, 18, 30, 42,
    7, 19, 31, 43,
    8, 20, 32, 44,
    9, 21, 33, 45,
    10, 22, 34, 46,
    11, 23, 35, 47,
    ];
const categories = [
        "Collaborative Visionaries",
        "Empathetic Communicators",
        "Adaptive Conflict Resolvers",
        "Motivational Catalysts:",
        "Performance Mentors",
        "Flexible Leaders",
        "Succession Architects",
        "Cultural Influencers",
        "Self-Growth Navigators",
        "Strategic Decision Makers",
        "Trust Builders",
        "Innovative Risk Takers",
    ];
const categoryDescriptions = [ 
"Excel in cultivating collaboration and alignment within their teams and with stakeholders. They possess the skill to build strong, cohesive teams.",
"Give precedence to clear and adaptable communication, thereby enabling effective understanding and cooperation in various contexts.",
"Exhibit proficiency in conflict resolution and can adapt their approach to the specific situation, thus promoting constructive solutions.",
"Adept at inspiring and engaging team members, driving higher levels of productivity and commitment.",
"Establish expectations and offer tailored feedback consistent with their style, promoting growth and productivity among team members.",
"Adaptable and can adjust their leadership style to different situations and changing environments.",
"Experts in identifying and developing potential successors with similar or complementary styles, ensuring a smooth transition of leadership.",
"Shape the organisational culture based on their style, promoting values, teamwork, discipline, or other cultural elements.",
"Actively work on personal development by recognising and improving their leadership style strengths and weaknesses.",
"Make more balanced and well-informed strategic decisions, contributing to the organisation's long-term success.",
"Give priority to building trust with their teams and stakeholders, fostering an environment of respect and mutual confidence.",
"Make informed decisions related to innovation and risk management, which is crucial for entrepreneurial success.",
];
const responseLabels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Completely Agree"];
const categoryScores = new Array(12).fill(0);
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
    if (!selectedOption) return;
    
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
const maxCategoryScore = 4 * 5; 
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
 backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(201, 203, 207, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)',
 'rgb(153, 102, 255)',
 'rgb(153, 102, 255)',
 'rgb(153, 102, 255)',
 'rgb(153, 102, 255)',
 'rgb(153, 102, 255)'
    ],
borderWidth: 1,
data: dataPoints 
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
