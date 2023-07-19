export const alertFunc = (code) => {
    switch (code) {
        case 400:
            return "Oka yaxshi ish qilmadiz"
        case 401:
            return "Oka yaxshi ish qilmadiz"
        default:
            return "Nimadir xato ketti"
    }

}

export const booked = {
    code: 201,
    msg: "Muvaffaqqiyatli band qilindi!",
    className: "text-green-700"
}

export const unBooked = {
    code: 410,
    msg: "Siz belgilagan vaqtda bu xona band",
    className: "text-red-700"
}

export const pastTime = {
    code: 400,
    msg: "O'tmishdagi vaqtni band qila olmaysiz",
    className: "text-red-700"
}

export const notFound = {
    code: 404,
    msg: "Topilmadi"
}