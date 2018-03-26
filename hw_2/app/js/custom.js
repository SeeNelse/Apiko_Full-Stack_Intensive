function ready() {

  const React = {
    createElement,
    render,
  }

  function createElement(tag, attr, child) {
    let elem = document.createElement(tag);
    if(attr) {
      for (let key in attr) {
        if (key !== 'textContent') {
          Object.assign(elem[key], attr[key]);
        } else {
          elem[key] = attr[key];
        }
      }
    }
    if (Array.isArray(child)) {
      child.forEach(function (item, i, arr) {
        if (typeof item === 'string') {
          elem.appendChild(document.createTextNode(item));
        } else {
          elem.appendChild(item);
        }
      });
    } else if (typeof child === 'string') {
      elem.appendChild(document.createTextNode(child));
    }
    return elem;
  }

  function render(blocks, main) {
    main.appendChild(blocks);
  }
  
  const app =  
    React.createElement('div', { style: { backgroundColor: 'red' } }, [
      React.createElement('span', undefined, 'Hello world'),
      React.createElement('br'),
      'This is just a text node',
      React.createElement('div', { textContent: 'Text content' }),
    ]);
  
  React.render(
    app,
    document.getElementById('root'),
  );

}
document.addEventListener("DOMContentLoaded", ready);