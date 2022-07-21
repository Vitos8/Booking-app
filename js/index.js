import start from "./modules/start.js";
import getFormPerson from "./modules/getFormPerson.js";
import readyPlane from "./modules/readyPlane.js";
import getData from "./service/getTour.js";


const init = async (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const data = await getData();

    const {main, firstForm, h1} = start(app, title, data);

    firstForm.addEventListener('submit', (event)=> {
        event.preventDefault();

        let tourData = data.find( item => item.id === firstForm.tour.value);
        
        h1.textContent  = tourData.tour;

        const forms = getFormPerson(firstForm.count.value);
        firstForm.remove();

        main.append(...forms);

        readyPlane(forms, main, tourData);
    })
};

init('.app', 'Выберите тур');
