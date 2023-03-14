const asyncHandler = require('express-async-handler')
const Category = require('../../Models/Category')

/**
 * @desc get list of active categories
 * @route GET api/v1/admin/categories/
 * @access Admin/Auth
 */
const index = asyncHandler(async (req, res) => {
    const categories = await Category.find({})

    res.json({
        data: {
            count: categories.length,
            categories
        }
    })
})

/**
 * @desc view Category detail
 * @route GET api/v1/admin/categories/:categoryId
 * @access Admin/Auth
 */
const view = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.categoryId)
    if(!category){
        res.status(403)
        throw new Error('Catgory not found')
    }

    res.json({
        success: true,
        data: {
            category,
            products: 'List its products'
        }
    })
})

/**
 * @desc add new Category
 * @route POST api/v1/admin/categories/
 * @access Admin/Auth
 */
const store = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (!name) {
        res.status(422)
        throw new Error('category name field is required')
    }

    const isAlreadyFound = await Category.findOne({ name })

    if (isAlreadyFound) {
        res.status(422)
        throw new Error(`There is already a category named ${name}`)
    }

    const category = await Category.create({ name, description })

    res.status(201).json({
        success: true,
        message: 'Category created',
        data: {
            category
        }
    })
})

/**
 * @desc update Category
 * @route PUT api/v1/admin/categories/:categoryId
 * @param categoryId
 * @access Admin/Auth
 */
const updateCategory = asyncHandler(async (req, res) => {
    const { name, description } = req.body

    if (!name) {
        res.status(422)
        throw new Error('category name field is required')
    }

    const category = await Category.findById(req.params.categoryId)
    if (!category) {
        res.status(403)
        throw new Error('Category not found')
    }

    const isAlreadyFound = await Category.find({ name }).count()
    
    if (isAlreadyFound > 1) {
        res.status(422)
        throw new Error(`There is already a category named ${name}`)
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.categoryId, {name, description}, { new: true })
    res.json({
        success: true,
        message: 'Category Updated',
        data: {
            category: updatedCategory
        }
    })
})

/**
 * @desc update Category status
 * @route PUT api/v1/admin/categories/:categoryId/status
 * @param categoryId
 * @access Admin/Auth
 */
const updateStatus = asyncHandler(async (req, res)=>{
    const { status } = req.body

    if(typeof(status) != 'boolean'){
        res.status(422)
        throw new Error('status field required and it needs to be boolean')
    }

    const category = await Category.findById(req.params.categoryId)
    if (!category) {
        res.status(403)
        throw new Error('Category not found')
    }

    category.isActive = status
    category.save()

    res.json({
        success: true,
        message: 'Category status updated',
        status: category.isActive
    })
})

/**
 * @desc delete Category
 * @route DELETE api/v1/admin/categories/:categoryId
 * @param categoryId
 * @access Admin/Auth
 */

const deleteCategory = asyncHandler(async (req, res)=>{
    const category = await Category.findById(req.params.categoryId)
    console.log("CATEGORY", category)
    if (!category) {
        res.status(403)
        throw new Error('Category not found')
    }

    const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId)
    
    res.json({
        success: true,
        message: 'Category deleted',
        id: deletedCategory._id
    })
})


module.exports = {
    index,
    store,
    updateCategory,
    updateStatus,
    deleteCategory,
    view
}