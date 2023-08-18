const mongoose = require('mongoose')

const FilterSchema = mongoose.Schema({
    talim_darajasi:{
         type:String,
        // enum:['Bakalavr','Magister'],
        // default:'Bakalavr'
        required: true
      },
    talim_turi:{
        type:String,
        // enum:['Sirtqi','kundizgi'],
        // default:'Sirtqi'
        required: true
    },
    talim_tili:{
        type:String,
        // enum:['UZB','RUS','ENG'],
        // default:'UZB'
        required: true
    },
    davlat:{
        type:String,
        // enum:['Turkiya','Latviya','Ozarbekjon','Belarus'],
        // default:'Turkiya'
        required: true
    },
    universitet:{
        type:String,
        // enum:['Latviya tabiy fanlar va texnologiya universiteti','Ostim texnika universiteti', 'Belarusiya davlat oziq-ovqat va kimyoviy tehnologiyar universiteti', 'Belarusiya davlat tehnologiyar universiteti','Yanki Kupala nomidagi grodno davlat universiteti','Ozarbayjon davlat neft va sayjfn universiteti', 'Belorusiya davlat universiteti A.D. Saxapov nomidagi davlat6 xalqarto ekologiya instituti'],
        // default:'Belorusiya davlat universiteti A.D. Saxapov nomidagi davlat6 xalqarto ekologiya instituti'
        required: true
    },
    yonalish:{
        type: String,
        // enum:['Biznesni Boshqarish', 'Oziq-ovqat maxsulotlari ishlab chiqarish va qayta ishlash texnologiyasi','Texnologik jarayonlar va ishlab chiqarish texnologiyasi','Kimyoviy va neft-gazkimyoviy tehnologiyalar','Menejment (tarmoq va sohalar)','Marketing (tarmoq va sohalar)','Kimyoviy texnologiya jarayonlari va apparatlari (ishlab chiqarish turi boyicha)','Yogochga ishlov berish texnologiyasi va yogochsozlik','Oziq-ovqat mahsulotlarini ishlab chiqarish va qayta ishlash texnologiyasi (maxsulot turlari boyicha)','Atrof muxit muxofazasi (tarmoqlar va soxalar boyicha)', 'Oziq-ovqat texnologiyasi (maxsulot turlari boyicha)','iqtisodiyot (tarmoqlar va soxalar boyicha)','Texnologik jarayonlarni boshqarishning axborot-komunikatsiya tizimlari','oziq-ovqat texnologiyasi (don maxsulotlari)','Kimyoviy texnologiya (ishlab chiqarish turlari boyicha)','Texnologik mashinalar va jihozlar (tarmoqlar boyicha)','Texnologik jarayonlar va ishlab chiqarish avtomatlashtirish va boshqarish (tarmoqlar boyicha)','Biotexnologiya (oziq-ovqat, ozuqa, kimyoviy maxsulotlar va qishloq xojaligi)','Menejment (kimyo va oziq-ovqat sanoati)'],
        // default:'Biznesni Boshqarish'
        required: true
    }
})


    module.exports = mongoose.model("Filter", FilterSchema)