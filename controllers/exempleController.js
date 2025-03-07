import Exemple from '../models/exempleModel.js';
import { body, param, query, validationResult } from 'express-validator';

// Validation rules
export const validateCreateExemple = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').optional(),
    body('published').optional().isBoolean()
];

export const validateUpdateExemple = [
    param('id').isMongoId().withMessage('Invalid ID format'),
    body('title').optional(),
    body('description').optional(),
    body('published').optional().isBoolean()
];

async function createExemple(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors.array()
        });
    }

    const data = req.body;
    
    try {
        const exemple = new Exemple({
            title: data.title,
            description: data.description,
            published: data.published ? data.published : false,
            user: req.user.id  // Add the authenticated user's ID
        });
        
        await exemple.save();
        
        res.status(201).json({
            success: true,
            message: 'Example created successfully',
            data: exemple
        });
    } catch (error) {
        console.error('Error creating example:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message,
        });
    }
}

async function readExemples(req, res) {
    try {
        const title = req.query.title;
        const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
        
        const exemples = await Exemple.find(condition);
        return res.status(200).json({
            success: true,
            count: exemples.length,
            data: exemples
        });
    } catch (error) {
        console.error('Error fetching examples:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function readExempleById(req, res) {
    try {
        const exemple = await Exemple.findById(req.params.id).populate('user', 'email'); // Populate with just email field
        
        if (!exemple) {
            return res.status(404).json({
                success: false,
                message: 'Example not found',
                error: 'Example with this ID does not exist'
            });
        }
        
        return res.status(200).json({
            success: true,
            message: 'Example retrieved successfully',
            data: exemple
        });
    } catch (error) {
        console.error('Error retrieving example:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function readExemplesByTitle(req, res) {
    try {
        const exemple = await Exemple.findOne({
            title: req.params.title
        });
        
        if (!exemple) {
            return res.status(404).json({
                success: false,
                message: 'Example not found',
                error: 'Example with this title does not exist'
            });
        }
        
        return res.status(200).json({
            success: true,
            data: exemple
        });
    } catch (error) {
        console.error('Error searching example:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function readPublishedExemples(req, res) {
    try {
        const exemples = await Exemple.find({ published: true });
        
        return res.status(200).json({
            success: true,
            count: exemples.length,
            data: exemples
        });
    } catch (error) {
        console.error('Error fetching published examples:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function updateExempleById(req, res) {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: errors.array()
        });
    }

    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: 'Data to update cannot be empty!',
            error: 'Request body is required'
        });
    }

    try {
        // First check if the example exists and if the user has permission to update it
        const exemple = await Exemple.findById(req.params.id);
        
        if (!exemple) {
            return res.status(404).json({
                success: false,
                message: 'Example not found',
                error: 'Example with this ID does not exist'
            });
        }
        
        // Check if this user owns the example (or is an admin - if you have that functionality)
        if (exemple.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
                error: 'You do not have permission to update this example'
            });
        }

        const updatedExemple = await Exemple.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Example updated successfully',
            data: updatedExemple
        });
    } catch (error) {
        console.error('Error updating example:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function deleteExempleById(req, res) {
    try {
        // First check if the example exists and if the user has permission to delete it
        const exemple = await Exemple.findById(req.params.id);
        
        if (!exemple) {
            return res.status(404).json({
                success: false,
                message: 'Example not found',
                error: 'Example with this ID does not exist'
            });
        }
        
        // Check if this user owns the example (or is an admin - if you have that functionality)
        if (exemple.user.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: 'Forbidden',
                error: 'You do not have permission to delete this example'
            });
        }

        const deletedExemple = await Exemple.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: 'Example deleted successfully',
            data: deletedExemple
        });
    } catch (error) {
        console.error('Error deleting example:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function deleteAllExemples(req, res) {
    try {
        const result = await Exemple.deleteMany({});
        
        return res.status(200).json({
            success: true,
            message: `${result.deletedCount} examples were deleted successfully!`,
            data: { count: result.deletedCount }
        });
    } catch (error) {
        console.error('Error removing all examples:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

async function readUserExemples(req, res) {
    try {
        const userId = req.params.userId || req.user.id;
        
        const exemples = await Exemple.find({ user: userId });
        
        return res.status(200).json({
            success: true,
            message: 'Examples retrieved successfully',
            data: exemples
        });
    } catch (error) {
        console.error('Error retrieving user examples:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

export default {
    createExemple,
    readExemples,         
    readExempleById,
    readExemplesByTitle,
    readPublishedExemples,
    updateExempleById,
    deleteExempleById,
    deleteAllExemples,
    validateCreateExemple,
    validateUpdateExemple,
    readUserExemples
}
