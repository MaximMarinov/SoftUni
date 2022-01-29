function solve() {
    //Initialising all the sections-----------------------------------------
    let sections = Array.from(document.querySelectorAll('section'));

    //Finding the OPEN section---------------------------------------------
    let openSectionWrapper = Array.from(sections[1].querySelectorAll('div'));
    let openSection = openSectionWrapper[1];

    //Finding the IN PROGRESS section--------------------------------------
    let inProgressSection = document.getElementById('in-progress');

    //Finding the COMPLETE section-------------------------------------------
    let completeSectionWrapper = Array.from(sections[3].querySelectorAll('div'));
    let completeSection = completeSectionWrapper[1];

    //Init the ADD BUTTON---------------------------------------------------
    let addButton = document.getElementById('add');

    addButton.addEventListener('click', (e) => {
        e.preventDefault();

        //GETTING INPUT--------------------------------------------------
        let taskName = document.getElementById('task');
        let taskDescription = document.getElementById('description');
        let taskDate = document.getElementById('date');

        //CHECKING INPUT--------------------------------------------------
        if (!taskName.value || !taskDescription.value || !taskDate.value) {
            return;
        }

        //Creating ARTICLE ELEMENT----------------------------
        let article = document.createElement('article');

        //Creating article tittle-------------------------------------
        let articleTittle = document.createElement('h3');
        articleTittle.textContent = taskName.value;

        //Creating descrpition---------------------------------------
        let articleDescr = document.createElement('p');
        articleDescr.textContent = `Description: ${taskDescription.value}`;
        
        //Creating due date-------------------------------------
        let articleDate = document.createElement('p');
        articleDate.textContent = `Due Date: ${taskDate.value}`;

        //Creating button container-----------------------------
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('flex');

        //Creating start button-----------------------------
        let startBtn = document.createElement('button');
        startBtn.classList.add('green');
        startBtn.textContent = 'Start';

        //Creating delete button-----------------------------
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('red');
        deleteBtn.textContent = 'Delete';

        //Adding everything----------------
        buttonContainer.appendChild(startBtn);
        buttonContainer.appendChild(deleteBtn);

        article.appendChild(articleTittle);
        article.appendChild(articleDescr);
        article.appendChild(articleDate);
        article.appendChild(buttonContainer);

        //Appending to the section----------------------
        openSection.appendChild(article);

        //Adding functionality to delete button-------------------
        deleteBtn.addEventListener('click', (e) => {
            article.remove();
        });

        //Adding functionality to startBtn----------------------
        let finishBtn = document.createElement('button');
            finishBtn.classList.add('orange');
            finishBtn.textContent = 'Finish';

        startBtn.addEventListener('click', (e) => {
            openSection.removeChild(article);
            buttonContainer.removeChild(startBtn);
            buttonContainer.appendChild(finishBtn);
            inProgressSection.appendChild(article);
        });

        finishBtn.addEventListener('click', (e) => {
            inProgressSection.removeChild(article);
            article.removeChild(buttonContainer);
            completeSection.appendChild(article);
        });
    });
}