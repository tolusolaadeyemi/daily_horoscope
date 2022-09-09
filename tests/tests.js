
const Horoscope = require('../lib/Horoscope');
// const result = Horoscope.getAsyncHoroscope({ day: 25, month: 6 }).then(function(result){
//     console.log('here',result);
// });
console.log('promise',Horoscope.getAsyncHoroscope({ day: 25, month: 6 })); 


