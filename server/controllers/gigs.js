const Gig = require('../models/Gig');
const Year =require('../models/Year');

async function index(req, res) {
    try {
        const gigs = await Gig.getAll();
        res.status(200).json(gigs);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}
async function festivals(req, res) {
    try {
        const gigs = await Gig.getAllFestivals();
        res.status(200).json(gigs);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}
async function years(req, res) {
    try {
        const gigs = await Year.getByYear();
        res.status(200).json(gigs);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}


module.exports = {index,festivals,years}