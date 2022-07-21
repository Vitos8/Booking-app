import createElement from "./createElement.js";

const createTitle = (title) => {
    let h1 = createElement('h1', {
        className: 'title',
        textContent: title,
    });


    return h1;
}; 

const createMain = () => {
    let main = createElement('main', {
        className: 'person-data',
    });

    return main;
};

const createFirstForm = (data) => {
    let form = createElement('form', {
        className: 'field',
    });

    const labelTour = createElement('label', {
        className: 'field__label',
        for: 'tour',
        textContent: 'Вибрати тур' ,
    });

    const select = createElement('select', {
        className: 'field__select',
        id: 'tour',
        name: ' tour',
    })

    const options  = data.map( item => 
        createElement('option', {
            value: item.id,
            textContent: item.tour,
        })
    );

    select.append(...options);

    const label = createElement('label', {
        className: 'field__label',
        textContent: 'Укажите количество человек (max: 6)',
    })

    const input = createElement('input', {
        className: 'field__input',
        id: 'count'  ,
        name:  'count' ,
        type: 'number' ,
        placeholder: 'Type here' ,
        min: '1' ,
        max: '6',
        required: true ,
    })

    const button = createElement('button', {
        className: 'btn-confirm' ,
        textContent: 'Подтвердить',
        type: 'submit',
    })

    form.append(labelTour, select, label, input, button);

    return form;
};


//^Main function
const start = (app, title, data) => {
    let h1 = createTitle(title);
    let main = createMain();
    const firstForm = createFirstForm(data);

    app.append(h1, main);
    main.append(firstForm);

    return {
        main, firstForm, h1
    };
};

export default start;