const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentication');
let checkRole = require('../services/checkRole')

// Admin can get all published articles with the user's email
router.get('/admin/publishedArticles', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const query = `
        SELECT a.id, a.title, a.content, a.status, a.publication_date, c.name AS categoryName, u.email AS userEmail
        FROM article AS a
        INNER JOIN category AS c ON a.categoryId = c.id
        INNER JOIN appuser AS u ON a.user_id = u.id
        WHERE a.status = 'published'
    `;

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Admin can delete any article
router.delete('/admin/deleteArticle/:id', auth.authenticateToken, checkRole.checkRole, (req, res) => {
    const id = req.params.id;
    const query = "DELETE FROM article WHERE id = ?";

    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Article ID not found" });
            }
            return res.status(200).json({ message: "Article deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});




// Authenticated users can get their articles
router.get('/myArticles', auth.authenticateToken, (req, res) => {
    const userId = res.locals.id;

    const query = `
        SELECT a.id, a.title, a.content, a.status, a.publication_date, c.name AS categoryName
        FROM article AS a
        INNER JOIN category AS c ON a.categoryId = c.id
        WHERE a.user_id = ?
    `;

    connection.query(query, [userId], (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// Authenticated users can add new articles
router.post('/addNewArticle', auth.authenticateToken, (req, res) => {
    const article = req.body;
    const userId = res.locals.id; // Extract user ID from res.locals

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: User ID is required" });
    }

    const query = `
        INSERT INTO article (title, content, publication_date, categoryId, status, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        query,
        [article.title, article.content, new Date(), article.categoryId, article.status, userId],
        (err, results) => {
            if (!err) {
                return res.status(200).json({ message: "Article added successfully" });
            } else {
                return res.status(500).json(err);
            }
        }
    );
});


// Authenticated users can update their articles
router.post('/updateArticle', auth.authenticateToken, (req, res) => {
    const article = req.body;
    const userId = res.locals.id;

    const query = `
        UPDATE article
        SET title = ?, content = ?, categoryId = ?, publication_date = ?, status = ?
        WHERE id = ? AND user_id = ?
    `;

    connection.query(
        query,
        [article.title, article.content, article.categoryId, new Date(), article.status, article.id, userId],
        (err, results) => {
            if (!err) {
                if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "Article ID not found or you don't have permission" });
                }
                return res.status(200).json({ message: "Article updated successfully" });
            } else {
                return res.status(500).json(err);
            }
        }
    );
});

// Authenticated users can delete their articles
router.delete('/deleteArticle/:id', auth.authenticateToken, (req, res) => {
    const id = req.params.id;
    const userId = res.locals.id;

    const query = "DELETE FROM article WHERE id = ? AND user_id = ?";

    connection.query(query, [id, userId], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: "Article ID not found or you don't have permission" });
            }
            return res.status(200).json({ message: "Article deleted successfully" });
        } else {
            return res.status(500).json(err);
        }
    });
});


// Anyone can get all published articles with the user's email
router.get('/publicPublishedArticles', (req, res) => {
    const query = `
        SELECT a.id, a.title, a.content, a.status, a.publication_date,c.id AS categoryId, c.name AS categoryName, u.email AS userEmail
        FROM article AS a
        INNER JOIN category AS c ON a.categoryId = c.id
        INNER JOIN appuser AS u ON a.user_id = u.id
        WHERE a.status = 'published'
    `;

    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    });
});

// router.get('/getArticlesByCategory/:categoryId', (req, res) => {
//     const categoryId = req.params.categoryId;
//     const query = `
//         SELECT 
//             a.id as articleId,
//             a.title,
//             a.content,
//             a.publication_date
//         FROM 
//             article AS a
//         WHERE 
//             a.categoryId = ?
//             AND a.status = 'published'
//         ORDER BY 
//             a.publication_date DESC;
//     `;

//     connection.query(query, [categoryId], (err, results) => {
//         if (!err) {
//             return res.status(200).json(results);
//         } else {
//             return res.status(500).json(err);
//         }
//     });
// });
module.exports = router;