const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Route = /type").status(200)
})

// GET ALL type
router.get('/all', (req, res)=> {
    connection.query('SELECT * FROM type', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des types !!`)
        } else {
            res.status(200).send(results)
        }
    })
})

// GET ONE type BY ID
router.get('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('SELECT * FROM type WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la récupération du type !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// POST / CREATE type - (Objet/Body)
router.post('/', (req, res)=> {
    const type = req.body
    connection.query('INSERT INTO type SET ? ', type, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la création du type !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// UPTATE type
router.put('/:id', (req, res)=> {
    const id = req.params.id
    const type = req.body
    connection.query('UPDATE type SET ? WHERE id = ?', [type, id], (err, results) => {
        if (err) {
            res.send(`Erreur lors de la modification du type !!`).status(500)
        } else {
            res.send(results).status(200)
        }
    })
})

// DELETE type BY ID
router.delete('/:id', (req, res)=> {
    const id = req.params.id
    connection.query('DELETE FROM type WHERE id = ?', id, (err, results) => {
        if (err) {
            res.send(`Erreur lors de la suppression du type !!`).status(500)
        } else {
            res.send('Le type a bien été supprimé de la base de donnée').status(200)
        }
    })
})

module.exports = router