const monsters = require('./monsters.json')

module.exports = {
    getMonster: (req, res) => {
        const { id } = req.params;
        let index = monsters.findIndex(monster => monster.index === +id)
        if (index != -1)
            res.status(200).json(monsters[index])
        else {
            res.status(404).send("Not found")
        }
    },
    getAllMonsters: (req, res) => {
        res.status(200).send(monsters);
    }

}
