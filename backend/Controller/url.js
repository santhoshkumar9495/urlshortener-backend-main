const shortid = require('shortid');
const URL = require('../models/url');

/**
 * THE FUNCTION FOR POST THE URL TO  THE MONGODB
 */
async function handleGenerateShortURL(req,res) {
    const {shortURL} = req.body;
    if(!shortURL) {
        return res.status(404).json({ 
            error: "url is required", 
        });
    }
    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: shortURL,
        visitHistry: [],
    });

    return res.json({ id: shortID });
}

/**
 * THE FUNCTION FOR COUNT THE USER HOE MANY TIMES CLICKS ON LINK
 */
async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistry.length,
        analytics: result.visitHistry,
    });
}

// async function handleGetUrl(req, res)  {
//     URL.find()
//       .then((response) => {
//         if (response.length > 0) {
//           return res.status(200).json({
//             message: "Teams fetched successfully!!",
//             response,
//           });
//         } else {
//           return res.status(200).json({
//             message: "Alas!! No Teams found",
//             response,
//           });
//         }
//       })
//       .catch((error) => {
//         return res.status(400).json({
//           error: error,
//         });
//       });
//     }


module.exports = {
    handleGenerateShortURL,
    handleGetAnalytics
}