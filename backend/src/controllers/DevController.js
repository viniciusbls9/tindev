const axios = require('axios');

const Dev = require('../models/Dev');

module.exports = {
    // LISTAGEM DE DEVS PARA O DEV LOGADO
    // A LISTAGEM FILTRA USUÁRIOS QUE O DEV JÁ DEU LIKE OU DISLIKE
    async index(request, response) {
        const { user } = request.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: loggedDev.likes } },
                { _id: { $nin: loggedDev.dislikes } },
            ],
        })

        return response.json(users);
    },
    // CADASTRO DO USUÁRIO NA APLICAÇÃO COM A CONTA DO GITHUB
    async store(request, response) {
        const { username } = request.body;

        const userExist = await Dev.findOne({ user: username });

        if(userExist) {
            return response.json(userExist);
        }

        const res = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = res.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        })

        return response.json(dev);
    }
};