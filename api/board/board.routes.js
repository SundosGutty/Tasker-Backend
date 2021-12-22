const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {addBoard, getBoards, updateBoard, removeBoard, getBoardById} = require('./board.controller')
const { update } = require('../user/user.service')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getBoards)
router.post('/',log, addBoard)
router.get('/:id', log, getBoardById)
router.put('/:id', log, updateBoard)
router.delete('/:id',  removeBoard)

module.exports = router
