require('dotenv').config({path: '../.env'});
const Joi = require('joi');
const zodiac = require('zodiac-signs')();
const axios = require("axios");

class Horoscope {
    // static createObject(birthday){
    //   let userInput = birthday;
    //   userInput = userInput.split('/');
    //   return {day: userInput[1], month: userInput[0]};
    // }

    static validateInput(birthday){
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
        
      try {
      return schema.validate({ day: birthday.day, month: birthday.month });
      } catch (error) {
        console.log(error);
      }
    }

    static getSign(birthday) {
      try {
        const validatedInput = this.validateInput(birthday);
        const zodiacSign = (zodiac.getSignByDate({ day: validatedInput.value.day, month: validatedInput.value.month }));
        //console.log(`your zodiac sign is ${zodiacSign.name}`);
        return zodiacSign.name;
      } catch (error) {
        console.log(error);
      }
      }

    static getPromiseHoroscope(birthday) {
      const sign = this.getSign(birthday);
      const options = {
        method: 'POST',
        url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
        params: {sign , day: 'today'},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
      };
      
      return new Promise(function(resolve,reject){
        return axios.request(options).then(function (response) {
          resolve(response.data);
        }).catch(function (error) {
          reject(error.message);
        });
      })
    }

    static async getAsyncHoroscope(birthday) {
      try {
        const sign = this.getSign(birthday);
        const options = {
        method: 'POST',
        url: 'https://sameer-kumar-aztro-v1.p.rapidapi.com/',
        params: {sign , day: 'today'},
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'sameer-kumar-aztro-v1.p.rapidapi.com'
        }
      };

      const response = await axios.request(options);
      return response.data;
      } catch (error) {
        return error.message;
      }
    }

    
}

module.exports = Horoscope;