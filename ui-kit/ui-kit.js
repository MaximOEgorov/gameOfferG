export function Image(src, listeners = {
    click: () => {
    }
}) {
    const image = document.createElement('img');
    image.src = src;
    image.classList.add(_getClassName(src));

    Object.keys(listeners).forEach(key => {
        image.addEventListener(key, listeners[key]);
    });

    return image;
}

function _getClassName(src) {
    let path = src.split('/')
    return(path[path.length - 1].split('.')[0])
}
