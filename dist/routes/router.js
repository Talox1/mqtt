"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
var bodyParser = require('body-parser');
const router = express_1.Router();
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mqtt_db',
    password: '1234',
    port: 5432,
});
router.get('/mensajes', (req, res) => {
    pool.query('SELECT * FROM persona', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json({
            ok: true,
            mensajes: 'GET ready',
            result: results.rows
        });
    });
});
router.get('/mensajes/:id', (req, res) => {
    const de = req.body.de;
    const cuerpo = req.body.cuerpo;
    const id = req.params.id;
    pool.query('SELECT * FROM public.persona WHERE id = $1', [id], (error, results) => {
        if (error) {
            console.log('Error en la consulta');
            throw error;
        }
        res.status(200).json({
            ok: true,
            mensaje: 'GET id ready',
            id,
            de,
            cuerpo,
            result: results.rows
        });
    });
});
router.get('/mensajes/nombre/:nombre', (req, res) => {
    const de = req.body.de;
    const cuerpo = req.body.cuerpo;
    const nombre = req.params.nombre;
    pool.query('SELECT * FROM public.persona WHERE nombre = $1', [nombre], (error, results) => {
        if (error) {
            console.log('Error en la consulta');
            throw error;
        }
        res.status(200).json({
            ok: true,
            mensaje: 'GET id ready',
            nombre,
            result: results.rows
        });
    });
});
router.get('/mensajes/ap_pat/:ap_pat', (req, res) => {
    const de = req.body.de;
    const cuerpo = req.body.cuerpo;
    const ap_pat = req.params.ap_pat;
    pool.query('SELECT * FROM public.persona WHERE ap_pat = $1', [ap_pat], (error, results) => {
        if (error) {
            console.log('Error en la consulta');
            throw error;
        }
        res.status(200).json({
            ok: true,
            mensaje: 'GET id ready',
            ap_pat,
            result: results.rows
        });
    });
});
router.get('/mensajes/ap_mat/:ap_mat', (req, res) => {
    const de = req.body.de;
    const cuerpo = req.body.cuerpo;
    const ap_mat = req.params.ap_mat;
    pool.query('SELECT * FROM public.persona WHERE ap_mat = $1', [ap_mat], (error, results) => {
        if (error) {
            console.log('Error en la consulta');
            throw error;
        }
        res.status(200).json({
            ok: true,
            mensaje: 'GET id ready',
            ap_mat,
            result: results.rows
        });
    });
});
router.post('/mensajes/', urlencodedParser, (req, res) => {
    const nombre = req.body.nombre;
    const ap_pat = req.body.ap_pat;
    const ap_mat = req.body.ap_mat;
    pool.query(`INSERT INTO persona (nombre, ap_pat, ap_mat) VALUES ('${nombre}', '${ap_pat}', '${ap_mat}')`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User added `);
    });
});
router.put('/mensajes/:id', urlencodedParser, (req, res) => {
    const nombre = req.body.nombre;
    const ap_pat = req.body.ap_pat;
    const ap_mat = req.body.ap_mat;
    const id = req.params.id;
    pool.query(`UPDATE persona SET nombre = '${nombre}', ap_pat = '${ap_pat}', ap_mat ='${ap_mat}'  WHERE id ='${id}'`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User update ${id}`);
    });
});
router.delete('/mensajes/:id', urlencodedParser, (req, res) => {
    const id = req.params.id;
    pool.query(`DELETE FROM persona WHERE id ='${id}'`, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`User deleted ${id}`);
    });
});
exports.default = router;
//cuerpo = cuerpo
//cuerpo
