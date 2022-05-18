import User from '../models/user.js'

export const getAllUsers = (req, res) => {
    User.find({})
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const createUser = (req, res) => {
    User.create({ ...req.body })
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const getUserById = (req, res) => {
    User.findById(req.params.id)
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const getUserByUsername = (req, res) => {
    User.findOne({ username: req.params.username })
        .then(response => res.send(response))
        .catch(err => res.send(err))
}

export const deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: "User was deleted successfully" }))
        .catch(err => res.send(err))
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({ username: req.params.username }, req.body)
        .then(() => res.send("user updated successfully"))
        .catch(err => res.send(err))
}

export const followUser = async (req, res) => {

    const user = await User.findOne({ username: req.params.username })

    if (user.followings.length == 0) {
        user.followings.push(req.body.following)
    }
    else {
        for (let i = 0; i < user.followings.length; i++) {
            if (user.followings[i] === req.body.following) {
                user.followings = user.followings.filter((item) => item !== req.body.following)
                break
            }
            else if (i == (user.followings.length - 1)) {
                user.followings.push(req.body.following)
                break;
            }
        }
    }

    User.findByIdAndUpdate(user._id, { followings: user.followings })
        .then((async () => {

            const followedUser = await User.findOne({ _id: req.body.following })

            if (followedUser.followers.length == 0) {
                followedUser.followers.push(user._id.toString())
            }
            else {
                for (let i = 0; i < followedUser.followers.length; i++) {
                    if (followedUser.followers[i].toString() == user._id.toString()) {
                        followedUser.followers = followedUser.followers.filter((item) => item.toString() !== user._id.toString())
                        break;
                    }
                    else if (i == (followedUser.followers.length - 1)) {
                        followedUser.followers.push(user._id.toString())
                        break;
                    }
                }
            }

            User.findByIdAndUpdate(followedUser._id, { followers: followedUser.followers })
                .then(() => {
                    res.send(user.followings)
                })

        }))

}