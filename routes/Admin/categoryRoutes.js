const router = require('express').Router()
const CategoryController = require('../../controllers/Admin/CategoryController')

/** @route GET api/v1/admin/categories */
router.get('/', CategoryController.index)

/** @route POST api/v1/admin/categories */
router.post('/', CategoryController.store)

/** @route GET api/v1/admin/categories/:categoryID */
router.get('/:categoryId', CategoryController.view)

/** @route PUT api/v1/admin/categories/:categoryID */
router.put('/:categoryId', CategoryController.updateCategory)

/** @route PUT api/v1/admin/categories/:categoryID/status */
router.put('/:categoryId/status', CategoryController.updateStatus)

/** @route DELETE api/v1/admin/categories/:categoryID */
router.delete('/:categoryId', CategoryController.deleteCategory)



module.exports = router