const Cliche = require('../models/Cliche')

async function index(req, res) {
    try {
        console.log('test1');
        const cliches = await Cliche.getAll();
        res.status(200).json(cliches);
    } catch(err) {
        res.status(500).json({error: err.message})
    }
}

async function create (req, res) {
    try {
        const data = req.body;
        const newCliche = await Cliche.create(data);
        res.status(201).json(newCliche);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

module.exports = {index, create}