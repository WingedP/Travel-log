


exports.deleteOne = Model => async (req, res) => {
    try {
        let id;
        switch (Model.modelName) {
            case "Tour":
                id = req.params.tId
                break;
            case "Review":
                id = req.params.rId
                break;
            default:
                id = req.params.id
        }
        await Model.findOneAndDelete({ _id: id })
        res.status(204).end()
    } catch (e) {
        res.status(400).json({ status: "fail", message: "error.message" })
    }
};


exports.updateOne = Model => async (req, res) => {
    try {
        let allows = []
        let id;
        switch (Model.modelName) {
            case "Tour":
                allows = ["title", "description", "guides", "category"]
                id = req.params.tId
                break;
            case "Review":
                allows = ["content", "rating"]
                id = req.params.rId
                break;
            case "User":
                allows = ["password" ]
                id = req.params.uId
                break;
            default:
                id = req.params.id
        }
        Object.keys(req.body).forEach(el => {
            if (!allows.includes(el))
                delete req.body[el]
        })
        const itemUpdated = await Model.findOneAndUpdate({ _id: id }, req.body, { new: true })
        
        res.status(200).json({status:"ok, updated",data:itemUpdated})
    }
    
    catch (e) { 
        console.log("Pass in factories.js:",req.body.password)
        res.status(400).json({ status: "Failed. Not Updated",  message: e.message }) }
}