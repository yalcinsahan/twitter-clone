import Conservation from '../models/conversation.js'

export const createConversation = (req, res) => {
    Conservation.create({ members: [req.body.senderId, req.body.receiverId] })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}

export const getConversation = (req, res) => {
    Conservation.find({ members: { $in: [req.params.userId] } })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}