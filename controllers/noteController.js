const Note = require('../models/noteModel')
//@desc Get all contacts
//@route api/notes
//@access public

const getNotes = async (req, res) => {
   try {
       const notes = await Note.find({user_id : req.id})
       res.status(200).json(notes)
    
   } catch (error) {
          res.json({message:error.message})
   }
}

//@desc create notes
//@route api/notes
//@access public

const postNote = async (req, res) => {
    try {
        const { title, note } = req.body
        if (!title || !note) {
            return res.status(400).json({ message: "All feilds are required" })
        }
        const notes = await Note.create({
            title,
            note,
            user_id : req.id
        })
    
        console.log(notes)
        res.status(200).json(notes)
        
    } catch (error) {
        console.log(error)
    }
}
//@desc Get a specific notes 
//@routes api/notes/:id
//@access public

const getNote = async (req, res) => {
    try {
        const notes = await Note.findById(req.params._id)
        if (!notes) {
            return res.status(404).json({ message: "No notes found...!" })
        }
        res.status(200).json(notes)
        
    } catch (error) {
        res.json({message:error.message})
    }

}

//@desc Upadate or edit note
//@routes api/notes/:id
//@access public

const updateNote = async (req, res) => {
    try {
        const notes = await Note.findById(req.params.id)
        if (!notes) {
            return res.status(404).json({ message: "No Notes is found...." })
        }
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )  
    
        res.status(200).json(updatedNote)
        
    } catch (error) {
        res.json({message:error.message})
    }
}

//@desc Delete notes
//@routes api/notes/:id
//@access public

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote){
        return res.status(404).json({message : "No note is available"})
        }
        res.status(200).json({message : "Notes is deleted successfully"})
        
    } catch (error) {
        res.json({message:error.message})
    }
}


module.exports = { getNotes, postNote, getNote, updateNote, deleteNote }