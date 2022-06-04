import Message from '../models/message.js'

export const createMessage = (req, res) => {
    Message.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}

export const getMessages = (req, res) => {
    Message.find({ conversationId: req.params.conversationId })
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
}