import Elios from '../index';

test('My Greeter', () => {
  const elios = new Elios();

  const widget = elios.createWidget();
  widget.html('hello');
  setTimeout(() => {
    widget.html('hello2');
    setTimeout(() => {
      elios.close();
    }, 1000);
  }, 1000);
});
