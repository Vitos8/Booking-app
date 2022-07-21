import createElement from "./createElement.js";

const createFormPerson = (value) => {
    let form = createElement('form', {
        className: 'person',
    });

    let title = createElement('h2', {
        className: 'preson__title',
        textContent: `Пассажир #${value + 1}`,
    })

    let FieldName = createElement('div', {
        className: 'field',
    })

    let labelName = createElement('label', {
        className: 'field__label' ,
        for: ` name${value}`,
        textContent:'ФИО',
    })

    let buttonName = createElement('button', {
        className: 'btn-confirm',
        type: 'submit',
        textContent: 'Подтвердить',
    })

    let inputName = createElement('input', {
        className: 'field__input' ,
        id: 'name0',
        name: 'name',
        type: 'text',
        placeholder:'Введите ваше ФИО',
        required: 'true',
    })

    let FieldTicket = createElement('div', {
        className:'field',
    })

    let labelTicket = createElement('label', {
        className: 'field__label',
        for: `ticket ${value}`,
        textContent: 'Номер билета (10 цифр)',
    })

    let inputTicket = createElement('input', {
        className: 'field__input' ,
        id: `ticket${value}`,
        name: 'ticket',
        type: 'text',
        placeholder:'Номер билета',
        minLength:"10", 
        maxLength:"10",
        required: 'true',
    })

    FieldName.append(labelName, inputName);
    FieldTicket.append(labelTicket, inputTicket);
    form.append(title, FieldName, FieldTicket, buttonName);
    
    return form;
};

const getFormPerson = (value) => {

    let forms = [];

    if ( count > 6 ) count = 6 ;

    for (let i = 0; i < value;  i++) {
        forms.push(createFormPerson(i));
    };
    
    return forms;
};


export default getFormPerson;