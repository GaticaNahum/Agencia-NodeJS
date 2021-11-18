const express = require('express');
const pool = require('../database');
const router = express.Router();


router.get('/', async(req, res) => {
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos: listAutos
    });
});

router.get('/:id', async(req, res) => {
    const { id } = req.params;
    let autos = await pool.query('Select * from autos where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        autos: autos
    });
});


router.post('/delete/:id', async(req, res) => {
    const { id } = req.params;

    await pool.query('UPDATE autos set estado = 0 where id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha eliminado correctamente"
    });
});

router.post('/create', async(req, res) => {
    const { nombre, matricula, añoVerificacion, marca } = req.body;

    const today = new Date();

    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;

    const fechaRegistro = y + '-' + m + '-' + d;
    const fechaActualizacion = y + '-' + m + '-' + d;
    const estado = 1;

    const autos = {
        nombre,
        matricula,
        añoVerificacion,
        fechaRegistro,
        fechaActualizacion,
        estado,
        marca
    };

    await pool.query('INSERT INTO autos set ?', [autos]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        autos: autos
    });
});


router.post('/update/:id', async(req, res) => {
    const { id } = req.params;
    const { nombre, matricula, añoVerificacion, marca } = req.body;

    const today = new Date();

    const d = today.getDate();
    const m = today.getMonth() + 1;
    const y = today.getFullYear();

    if (d < 10) d = '0' + d;
    if (m < 10) m = '0' + m;

    const fechaActualizacion = y + '-' + m + '-' + d;
    const autos = { nombre, matricula, añoVerificacion, fechaActualizacion, marca };

    await pool.query('UPDATE autos set ? where id = ?', [autos, id]);

    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        autos: autos
    });
});

module.exports = router;