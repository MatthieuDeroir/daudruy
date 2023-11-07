const Settings = require('../Models/SettingsSchema');

exports.getSettings = async (req, res) => {
    try {
        const settings = await Settings.find();
        res.status(200).send(settings);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateSettings = async (req, res) => {
    try {
        await Settings.deleteMany({});
        const settings = await Settings.insertMany(req.body);
        res.status(201).send(settings);
    } catch (error) {
        res.status(400).send(error.message);
    }
}