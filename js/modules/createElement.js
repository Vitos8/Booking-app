const createElement = (tag, attribute) => {
    let element = document.createElement(tag);

    Object.assign(element, attribute);          
                                
    return  element;
};

export default createElement;