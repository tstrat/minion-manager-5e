module.exports = {
    createEncounter : (req, res) => {
        // use req.session.user.id
    },
    createMonster : (req, res) => {
        // use req.body for encounter id
        const db = req.app.get('db');

        const { monsterName, name, health, url, encounterId } = req.body;
        const payload = {
            monsterName,
            name: name,
            health,
            url: url,
            encounterId: parseInt(encounterId)
        }
        console.log(payload);
        db.create_monster(payload)
        .then( createdMonsters => {
            console.log(createdMonsters[0]);
            res.status(200).json(createdMonsters[0]);
        })
        .catch( error => {
            console.error('Error creating monster for encounter\n Error Message:', error);
            res.status(500).json({ message: error });
        });
    },
    getMonstersByEncounterId: (req, res) => {
        const db = req.app.get('db');
        const encounterId = parseInt(req.params.id);

        db.get_monsters_from_encounter({encounterId}).then(monsters => {
            res.status(200).json(monsters);
        })
        .catch ( error => {
            console.error('Error getting monsters for encounter\n Error Message:', error);
            res.status(500).json({ message: error });
        });



    }
    
}