// script.js
const questions = document.querySelectorAll('.question');

questions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        questions.forEach(q => {
            if (q !== question) {
                q.nextElementSibling.classList.remove('active');
            }
        });
        answer.classList.toggle('active');
    });
});