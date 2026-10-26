const {nanoid} = require("nanoid")
const URL = require("../models/url.model.js")

async function handleGenerateNewShortID(req,res){
    const body = req.body;
    if(!body.redirect_url){
        return res.status(400).send("URL is compulsory")
    }
    const shortID = nanoid(8);

    await URL.create({
        shortID,
        redirect_url:body.redirect_url,
        visit_history:[]
    })

    return res.status(201).json({
        message: "User created successsfully",
        url: await URL.find({shortID})
    })

}

async function handleGetAllURL(req,res){
    const urls = await URL.find({})
    return res.status(200).json(urls);
}

async function handleRedirectURL(req,res){
    const shortid = req.params.id;
    const data = await URL.findOneAndUpdate({
        shortID:shortid
    }, {
        $push: {
            visit_history: {
                timestamp: Date.now()
            }
        }
    })
    if(!data){
        return res.status(404).json({
            error:"URL not found"
        })
    }
    return res.status(200).redirect(data.redirect_url);
    
}

async function handleAllURLsAnalytics(req,res){
    const data = await URL.find({})
    const analytics = data.map((url)=>{
        return {
            shortID:url.shortID,
            redirect_url:url.redirect_url,
            visit_count:url.visit_history.length
        }
    })
    return res.status(200).json(analytics);
}

async function handleURLAnalytics(req,res){
    const shortID = req.params.id;
    const data = await URL.findOne({shortID})
    if(!data){
        return res.status(404).json({
            error:"URL not found"
        })
    }
    return res.status(200).json({visit_count: data.visit_history.length})
}

module.exports = {
    handleGenerateNewShortID,
    handleGetAllURL,
    handleRedirectURL,
    handleURLAnalytics,
    handleAllURLsAnalytics
}