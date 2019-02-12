import Elios from '../index';

test('My Greeter', () => {
  const elios = new Elios();

  elios.testFoo().then(data => {
    expect(data).toBe('__boopbar');
  });
});
