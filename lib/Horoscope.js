
class Horoscope {
    constructor (_birthday){
        this.birthday = _birthday;
    }


    static validateInput(birthday){
      const Joi = require('joi');
      const schema = Joi.object({
        day: Joi.number()
            .integer()
            .min(1)
            .max(31)
            .required(),

        month: Joi.number()
            .integer()
            .min(1)
            .max(12)
            .required(),
    })
    .with('day', 'month')
        
      try {
      return schema.validate({ day: birthday.day, month: birthday.month });
      } catch (error) {
        console.log(error);
      }
    }

    static getSign(birthday) {
      try {
        const validatedInput = this.validateInput(birthday);
        const zodiac = require('zodiac-signs')();
        const zodiacSign = (zodiac.getSignByDate({ day: validatedInput.value.day, month: validatedInput.value.month }));
        console.log(`your zodiac sign is ${zodiacSign.name}`);
        return zodiacSign.name;
      } catch (error) {
        console.log(error);
      }
      }

    static getHoroscope(birthday) {
      const sign = this.getSign(birthday)
      const axios = require("axios");
      const options = {
        method: 'POST',
        url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
        params: {sign , day: 'today'},
        headers: {
          'X-RapidAPI-Key': 'd2bdebae5fmshd22a7a3668c765dp15255cjsnf79c783ab914',
          'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }

    
}

module.exports = Horoscope;