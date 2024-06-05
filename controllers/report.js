const reportsRouter = require('express').Router();
const Report = require('../models/report');
const { userExtractor } = require('../middleware/auth.js');

reportsRouter.post('/', userExtractor, async (request, response) => {
    const { date, type, victimCount, district, weaponUsed, motorcycleUsed } = request.body;

    if (!date || !type || !victimCount || !district || weaponUsed === undefined || motorcycleUsed === undefined) {
        return response.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const user = request.user;

        const newReport = new Report({
            date,
            type,
            victimCount,
            district,
            weaponUsed,
            motorcycleUsed,
            user: user._id,
        });

        const savedReport = await newReport.save();
        return response.status(201).json(savedReport);
    } catch (error) {
        console.error('Error al crear el informe:', error);
        return response.status(500).json({ error: 'Error al crear el informe' });
    }
});

module.exports = reportsRouter;