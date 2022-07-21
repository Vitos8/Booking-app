
export const getStorage =  (id) => {
    if ( localStorage.getItem(`tour - ${id}`) ) {
        return JSON.parse(localStorage.getItem(`tour - ${id}`));
    } else {
        return [];
    }
};



export const setStorage = (id, data) => {
    
    let storage = getStorage(id);

    let filterBooking = storage.filter( item => {
        for (let i = 0; i < data.length;  i++) {
            if (data[i].ticket === item) {
                return false;
            }
        }
        return item;
    })

    let newBooking = [...filterBooking, ...data];

    localStorage.setItem(`tour - ${id}`, JSON.stringify(newBooking));
}; 