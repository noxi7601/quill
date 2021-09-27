import Parchment from 'parchment';

let SizeClass = new Parchment.Attributor.Class('size', 'ql-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['small', 'large1', 'large2', 'large3', 'huge']
});
let SizeStyle = new Parchment.Attributor.Style('size', 'font-size', {
  scope: Parchment.Scope.INLINE,
  whitelist: ['.75rem', '1.5rem', '2rem', '2.5rem', '3rem']
});

export { SizeClass, SizeStyle };
