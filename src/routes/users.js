const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');

/**
 * @swagger
 * /user/login:
 *   get:
 *     summary: Login user
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/login', usersControllers.login);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', usersControllers.getUser);

module.exports = router;