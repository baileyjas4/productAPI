const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// POST /api/products - Create Product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products/:id - Read Single Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/products/:id - Update Product
router.put('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/products/:id - Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/products - Advanced Querying
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sortBy, page = 1, limit = 10 } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (minPrice) filter.price = { ...filter.price, $gte: Number(minPrice) };
        if (maxPrice) filter.price = { ...filter.price, $lte: Number(maxPrice) };

        let sort = {};
        if (sortBy) {
            const [field, order] = sortBy.split('_');
            sort[field] = order === 'asc' ? 1 : -1;
        }

        const products = await Product.find(filter)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json(products);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
