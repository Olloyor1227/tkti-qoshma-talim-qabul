const joi = require('joi');

class Validate{
    postNews = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        body_uz: joi.string().min(5).required(),
        body_ru: joi.string().min(5).required(),
        body_en: joi.string().min(5).required(),
        category: joi.string().valid("a","b", "c", "d"),
        date: joi.string().required()
    })
    putNews = joi.object().keys({
        title_uz: joi.string().min(3),
        title_ru: joi.string().min(3),
        title_en: joi.string().min(3),
        body_uz: joi.string().min(5),
        body_ru: joi.string().min(5),
        body_en: joi.string().min(5),
        category: joi.string().valid("a","b", "c", "d"),
        date: joi.string().required()
    })
    postPhoto = joi.object().keys({
        title_uz: joi.string().min(3).required(),
        title_ru: joi.string().min(3).required(),
        title_en: joi.string().min(3).required(),
        width: joi.string().min(3).required(),
        height: joi.string().min(3).required(),
        date: joi.string().required()
    })
    postMediaValidation = joi.object().keys({
        name: joi.string().min(2).required()
    })
    putPhoto = joi.object().keys({
        title_uz: joi.string().min(3),
        title_ru: joi.string().min(3),
        title_en: joi.string().min(3),
    })
    register = joi.object().keys({
        phone: joi.string().min(3).required(),
        password: joi.string().min(3).required(),
        name: joi.string().min(3).required(),     
    })

    editAdmin = joi.object().keys({
        phone: joi.string().min(3),
        password: joi.string().min(3),
        name: joi.string().min(3),     
    })

    login = joi.object().keys({
        phone: joi.string().length(13).required(),
        passport_number: joi.string().length(9).required(),
    })

    postApplicaton = joi.object().keys({
        // Personal validations
        name: joi.string().min(3).required(),
        surname: joi.string().min(5).required(),
        fathername: joi.string().min(5).required(),
        dob: joi.string().min(5).required(),
        gender: joi.string().min(5).required(),
        passport_number: joi.string().length(9).required(),
        passport_dob: joi.string().min(5).required(),
        jshshr: joi.string().length(14).required(),
        address: joi.string().min(30).required(),
        tel: joi.string().length(13).required(),
        // Educational validations
        complated_edu: joi.string().min(10).required(),
        state: joi.string().min(3).required(),
        edu_type: joi.string().min(3),
        edu_lang: joi.string().min(3),
        edu_degree: joi.string().min(3),
        faculty: joi.string().min(3)
    })
}

module.exports = new Validate;