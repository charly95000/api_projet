const express = require('express')
const multer = require('../multer-config')

const BreveCtrl = require('../controllers/breve-ctrl')

const router = express.Router()

router.post('/breve',multer, BreveCtrl.createBreve)
router.put('/breve/:id', BreveCtrl.updateBreve)
router.delete('/breve/:id', BreveCtrl.deleteBreve)
router.get('/breve/:id',BreveCtrl.getBreveById)
router.get('/breves', BreveCtrl.getBreves)

module.exports = router