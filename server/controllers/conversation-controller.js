import Conservation from '../models/conversation.js'

export const createConversation = async (req, res) => {

    const conv = await Conservation.findOne({ members: { $all: [req.body.senderId, req.body.receiverId] } })

    if (!conv?._id) {
        Conservation.create({ members: [req.body.senderId, req.body.receiverId] })
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    }
    else {
        res.status(200).json({ message: "There is already a chat between these two users." })
        console.log("There is already a chat between these two users.");
    }
}

export const getConversation = (req, res) => {
    Conservation.find({ members: { $in: [req.params.userId] } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}