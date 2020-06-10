const router = require('express').Router();
const db = require('./mentor-model');
middleware = require('./middleware');



router.get('/', (req, res) => {
    db.getMentors()
    .then(mentors => {
        res.status(200).json(mentors)
    })
    .catch(err => {
        res.status(500).json(err);
        console.log(err);
    })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
    const id = req.params.id;
    db.getMentor(id)
    .then(id => {
        res.status(200).json(id)
    })
    .catch(err => {
        res.status(500).json({errorMessage: 'Could not retrieve specified ID'})
    })
});

router.post('/', middleware.validateUser, (req, res) => {
    const body = req.body;
    db.addMentor(body)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.put('/:id',middleware.validateUser,middleware.validateUserId, (req,res) => {
    const id = req.params.id;
    const changes = req.body;
    db.updateMentor(id, changes)
    .then(update => {
        res.status(201).json(update)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.delete('/:id', middleware.validateUserId, (req, res) => {
    const id = req.params.id;
    db.deleteMentor(id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

// Mentor Posts Routes
// /api/mentor/posts (Gets all posts)
router.get('/posts/all', (req, res) => {
    db.getMentorsPost()
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.status(500).json({message: 'Can not get mentor posts'}))
})

// /api/mentor/:id/posts (Gets mentor's post)
router.get('/:id/posts', (req, res) => {
    const {id} = req.params;
    db.getMentorPost(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => res.send(err))
})

// /api/mentor/:mentorId/posts (Mentor Adds posts)
router.post('/:mentorId/posts', (req, res) => {
    const {mentorId} = req.params;
    const post = req.body;
    mentor_id = mentorId;
    post.mentor_id = mentor_id
    db.getMentor(mentorId)
    .then(mentor => {
        if (mentor) {
            db.addMentorPost(post)
            .then(addPost => {
                res.status(200).json(addPost);
            })
            .catch(err => res.send(err))
        } else {
            res.status(404).json({message: "Sorry no Mentor with the given id"});
        }
    })
    .catch(err => {
        res.status(500).json({message: "Failed to add the mentors' post."})
    })
})

// /api/mentor/:mentorId/posts/:pid (Updates Mentors' post)
router.put('/:mentorId/posts/:pid', (req, res) => {
    const {mentorId} = req.params;
    let post = req.body;
    mentor_id = mentorId;
    post.mentor_id = mentor_id;
    const {pid} = req.params;
    db.getMentorPost(pid)
    .then(posts => {
        if(posts) {
            db.updateMentorPost(pid, post)
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

// /api/mentor/:mentorId/posts/:pid (Deletes Mentors' post)
router.delete('/:mentorId/posts/:pid', (req, res) => {
    const {id} = req.params;
    const {pid} = req.params;

    let deleted = req.body;
    mentor_id = id;
    deleted.mentor_id = mentor_id;

    db.deleteMentorPost(pid)
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