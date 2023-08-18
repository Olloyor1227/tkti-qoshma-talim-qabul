const Filter = require('../modules/filter')


exports.add = async (req, res, next) => {

    try {
        const filter = new Filter({
            ...req.body
        })
        filter.save()
        res.status(201).json(
            {
                message: "success created",
                data: filter
            }
        )
    } catch (err) {
        res.status(500).json(
            {
                message: "error"
            }
        )
    }
}

exports.one = async (req, res, next) => {
    try {
        const getId = await Filter.findById({ _id: req.params.id })
        res.status(200).json(
            {
                message: "success",
                data: getId
            }
        )
    } catch (err) {
        res.status(404).json(
            {
                message: "car not found"
            }
        )
    }
}


exports.getAllUser = async (req, res) => {
    try {
        const filter = await Filter.find({}).sort({ date: -1 })
        res.status(200).json({
            total: filter.length,
            data: filter
        })
    } catch (err) {
        res.status(500).json(
            {
                message: "car not found"
            }
        )
    }
}


exports.getQuery = async (req, res) => {
    try {
        let condition = {};
        const {
            talim_darajasi,
            talim_turi,
            talim_tili,
            davlat,
            universitet,
            yonalish
        } = req.query

        if (talim_darajasi) condition = { ...condition, talim_darajasi }
        if (talim_turi) condition = { ...condition, talim_turi }
        if (talim_tili) condition = { ...condition, talim_tili }
        if (davlat) condition = { ...condition, davlat }
        if (universitet) condition = { ...condition, universitet }
        if (yonalish) condition = { ...condition, yonalish }
        const data = await Filter.find(condition)
        return res.status(200).json({
            data
        })
    } catch (err) {
        return res.status(500).json({
            error: err.message
        })
    }
}


