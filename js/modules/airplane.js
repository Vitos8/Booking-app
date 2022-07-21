import { setStorage, getStorage } from '../service/storage.js';
import createElement from './createElement.js';

let c = 1;

let createCockpit = ( title ) => {
    let cockpit = createElement('div', {
        className: 'cockpit',
    });

    let titles = createElement('h1', {
        className: 'cockpit-title',
        textContent: title,
    })

    let button = createElement('button', {
        className: "cockpit-confirm",
        textContent: "Потведрить",
        type: 'submit',
    })

    cockpit.append(titles, button);

    return cockpit;
};

const createExit = () => {
    let fuselage = createElement('div', {
        className: 'fuselage exit',
    })

    return fuselage;
};

let createBlockSeat = (n, count, booking) => {
    let letters = ['A', 'B','C', 'D','E', 'F'];

    let fuselage = createElement('ol', {
        className: 'fuselage',
    })

    for (let i = n; i < count + n;  i++) {
        let wrapperRow = createElement('li')
        let seat = createElement('ol', {
            className: 'seats',
        })

        let seatsRow = letters.map( letter => {
            let seat = createElement('li', {
                className: 'seat',
            });

            let wrapperCheck = createElement('label');
            let seatValue = `${i}${letter}`;
            let check= createElement('input', {
                name: 'seat',
                type: 'checkbox',
                value: seatValue,
                disabled: booking.includes(seatValue), 
            })

            wrapperCheck.append(check);
            seat.append(wrapperCheck);

            return seat ;
        })

        seat.append(...seatsRow);
        wrapperRow.append(seat);
        fuselage.append(wrapperRow);
    };

    return fuselage;
};

const createAirplane = (title, tourData) => {

    let scheme = tourData.scheme;
    let bookingSeat = getStorage(tourData.id).map(item => item.seat);
    console.log(bookingSeat);

    let choisesSeat = createElement('form', {
        className: 'choises-seat',
    });

    let plane = createElement('fieldset', {
        className: 'plane' ,
        name: 'plane',
    });

    let cockpit = createCockpit(title);

    let n = 1;

    let elements = scheme.map((type) => {
        if ( type === 'exit') {
            return createExit();
        }

        if (typeof type === 'number'  ) {
            const BlockSeat = createBlockSeat(n, type, bookingSeat);
            n = n + type;

            return BlockSeat;
        }
    })

    plane.append(cockpit, ...elements);
    choisesSeat.append(plane);
    
    return choisesSeat;
};

let checkSeat = ( form, data, id ) => {
    let bookingSeat = getStorage(id).map(item => item.seat);
    form.addEventListener('change', () => {
        let formData = new FormData(form);
        let checked = [...formData].map(([,value])  => value)

        if ( checked.length === data.length ) {
            [...form].forEach(item => {
                if ( item.checked === false && item.name === 'seat') {
                    item.disabled = true;
                }
            })
        } else {
            [...form].forEach(item => {
                if (!bookingSeat.includes(item.value)){
                    item.disabled = false;
                }
            })
        } 
});

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let formData = new FormData(form);
        let booking = [...formData].map(([,value])  => value);
        let seats = [];
        let names = [];

        for (let i = 0; i < data.length;  i++) {
            data[i].seat = booking[i];
            seats.push(data[i].seat);
            names.push(data[i].name);
        };

        setStorage(id, data);

        form.remove();
        document.body.innerHTML  = `
        <h1 class="title">${names},  хорошего полёта </h1>
        <h2 class="title">${seats.length === 1 ? `ваше место - ${seats}` :  `ваши места ${seats}`} </h2>
        `;
    })
};

const airplane = (main, data, tourData) => {

    const title = data.length >= 5 ? `Виберіть ${data.length} місць` : data.length == 1? `Виберіть ${data.length} місце` : `Виберіть ${data.length} місця` ;

    let choiseForm = createAirplane(title, tourData);

    checkSeat(choiseForm, data, tourData.id);

    main.append(choiseForm);
};

export default airplane;