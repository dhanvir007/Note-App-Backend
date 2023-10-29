const express = require('express');
const router = express.Router();

const { getNotes,
         postNote,
          getNote,
           updateNote,
            deleteNote } = require('../controllers/noteController');
const authToken = require('../middleware/authTokenHandler');

            
router.use(authToken)          
            
router.get("/", getNotes)
router.post("/", postNote)
 

router.route("/:id").get( getNote).put( updateNote).delete( deleteNote)

 


module.exports = router;