const express = require('express');
const pool = require('../database');
const router = express.Router();

router.get('/', async(req, res) => {
    let listmarcas = await pool.query('SELECT * FROM marca');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listmarcas: listmarcas
    });

});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let marca = await pool.query('Select * from marca where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        marca: marca
    });
});


router.post('/delete/:id', async(req, res) => {
    const { id } = req.params;

    await pool.query('delete from marca where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });

});

router.post('/create', async(req, res) => {
    const { nombre } = req.body;

    const marca = {
        nombre
    };

    await pool.query('INSERT INTO marca set ?', [marca]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        marca: marca
    });
});


router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    const marca = { nombre };

    await pool.query('UPDATE marca set ? where id = ?', [marca, id]);

    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        marca: marca
    });
});
module.exports = router;