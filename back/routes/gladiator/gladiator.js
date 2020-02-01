
const express = require("express")
const connection = require('../../config/config')
const router = express.Router()

router.get('/', (req, res) => {
    res.send("Route = /gladiator").status(200)
})

// GET ALL GLADIATOR
router.get('/all', (req, res)=> {
    connection.query('SELECT * FROM gladiator', (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des gladiateurs !`)
        } else {
            res.status(200).send(results)
        }
    })
})
// GET ALL GLADIATOR
router.get('/all/type', (req, res)=> {
    id = req.params
    connection.query('SELECT * FROM gladiator join gladiator_type on gladiator.id=gladiator_type.id where id_type = ?', id , (err, results) => {
        if (err) {
            res.status(500).send(`Erreur lors de la récupération de la liste des gladiateurs par leur type !`)
        } else {
            res.status(200).send(results)
        }
    })
})

module.exports = router