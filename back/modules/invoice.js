const mongoose = require("mongoose")

const InvoiceSchema = mongoose.Schema(
    {
        owner: String,
        owner_id: String,
        photo: String,
        date: {
            type: Date,
            default: Date.now()
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Invoice", InvoiceSchema)