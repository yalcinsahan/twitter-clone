import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {

    //verilen email'deki user aranıyor.
    const user = await User.findOne({ username: req.body.username });
    if (user === null) return res.send({ message: "bu username ile kayıtlı bir kullanıcı bulunamadı." })

    //user bulunduysa password kontrolü yapılacak.
    // let passwordIsValid = await bcrypt.compare(req.body.password, user.password);
    if (req.body.password !== user.password) return res.status(401).send({ message: "şifre hatalı." })

    //password doğruysa bir token oluşturulacak.
    //token'in geçerliliği 86400 ms olarak ayarlandı.
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 86400 })

    //giriş işlemi başarılı olduğu için name, email ve token; client'a gönderilecek.
    user.accessToken = token;
    return res.status(200).send({
        username: user.username,
        name: user.name,
        accessToken: user.accessToken,
        followings: user.followings,
        followers: user.followers,
        likes: user.likes,
        profilePicture: user.profilePicture,
        headerPicture: user.headerPicture,
        likes: user.likes,
        createdAt: user.createdAt
    });

}

export const signup = (req, res) => {

    //create metodu ile user oluşturuluyor.
    User.create({ ...req.body })
        .then(result => res.status(201).send(result))
        .catch(err => res.status(400).send(err))
}
