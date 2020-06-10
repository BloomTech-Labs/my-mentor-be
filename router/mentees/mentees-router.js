const router = require('express').Router();
const Mentees = require('./mentees-model');

router.get('/', (req, res) => {
    Mentees.getMentees()
        .then(mentees => {
            res.json(mentees);
        })
        .catch(err => res.send(err));
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    Mentees.getMentee(id)
        .then(mentee => {
            if(!mentee){
                res.status(404).json({message: "Sorry no Mentee with the given ID"});
            } else {
                res.status(200).json(mentee)
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
router.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    Mentees.getMentee(id)
        .then(mentee => {
            if (mentee) {
                Mentees.updateMentee(id, changes)
                .then(updatedMentee => {
                    res.status(200).json(updatedMentee);
                });
            } else {
                res.status(404).json({message: "Sorry no Mentee with the given id"});
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to update Mentee information"})
        })
})

router.post('/', (req, res) => {
    const menteeData = req.body;
    
    Mentees.addMentee(menteeData)
    .then(mentee => {
      res.status(201).json(mentee);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to create new mentee' });
    });
});
  
router.delete('/:id', (req,res) => {
    const id = req.params.id;
    Mentees.deleteMentee(id)
        .then(mentee => {
            if (!mentee) {
                res.status(404).json({message: "Mentee id not valid"})
            } else {
                res.status(200).json(mentee)
            }
        })
        .catch(err => {
            res.status(500).json({message: "Not able to delete mentee"})
        })
})

// Mentee Posts Routes
// /api/mentee/posts (Gets all posts)
router.get('/posts/all', (req, res) => {
    Mentees.getMenteesPost()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.status(500).json({message: 'Can not get mentee posts'}))
})

// /api/mentee/:id/posts (Gets mentee's post)
router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    Mentees.getMenteePost(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.send(err))
})

// /api/mentee/:menteeId/posts (Mentee Adds posts)
router.post('/:menteeId/posts', (req, res) => {
    const {menteeId} = req.params;
    const post = req.body;
    mentee_id = menteeId;
    post.mentee_id = mentee_id
    Mentees.getMentee(menteeId)
    .then(mentee => {
        if (mentee) {
            Mentees.addMenteePost(post)
            .then(addPost => {
                res.status(200).json(addPost);
            })
            .catch(err => res.send(err))
        } else {
            res.status(404).json({message: "Sorry no Mentee with the given id"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to add the mentees' post."})
    })
})

// /api/mentee/:menteeId/posts/:pid (Updates Mentees' post)
router.put('/:menteeId/posts/:pid', (req, res) => {
    const {menteeId} = req.params;
    let post = req.body;
    mentee_id = menteeId;
    post.mentee_id = mentee_id;
    const {pid} = req.params;
    Mentees.getMenteePost(pid)
    .then(posts => {
        if(posts) {
            Mentees.updateMenteePost(pid, post)
            .then(update => {
                res.status(200).json(update);
            })
        } else {
            res.status(400).json({error: "Could not find post with given id"})
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to update post"})
    })
})

// /api/mentee/:menteeId/posts/:pid (Deletes Mentees' post)
router.delete('/:menteeId/posts/:pid', (req, res) => {
    const {id} = req.params;
    const {pid} = req.params;

    let deleted = req.body;
    mentee_id = id;
    deleted.mentee_id = mentee_id;

    Mentees.deleteMenteePost(pid)
    .then(deleted => {
        if(deleted) {
            res.status(200).json({removed: deleted});
        } else {
            res.status(404).json({error: "Could not find post with that id."})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})
module.exports = router;