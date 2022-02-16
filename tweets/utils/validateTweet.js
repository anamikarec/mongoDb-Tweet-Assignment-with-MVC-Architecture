const {body} = require('express-validator');

const validateTweet = ()=>([
    body("title")
    .not()
    .isEmpty()
    .withMessage("title should not be empty!")
    .isLength({min: 3})
    .withMessage("title should at least have 3 characters!")
    .isString()
    .withMessage("title should be a string!")
    ,
 body("description")
   .not().isEmpty().withMessage("description should not be empty!")
   .isString().withMessage("description should be a string")
]
 )

module.exports = validateTweet;