const InvoiceData = require("../modules/invoice")
const validate = require("../middleware/validate")

class InvoiceController {
    async Add (req, res) {
        try{
            const { error, value } = validate.postInvoice.validate({...req.body})
            if (error) {
                res
                  .status(403)
                  .json({ status: 403, message: String(error["details"][0].message) });
                return;
              }
        
        } catch (e) {

        }
    }
}