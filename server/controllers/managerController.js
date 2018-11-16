module.exports = {
    createEncounter : (req, res) => {
        // use req.session.user.id
    },
    getEncounterList : (req, res) => {
        const db = req.app.get('db');

        db.get_all_encounters({userId: 1})
        .then(encounterList => {
            console.log(encounterList);
            res.status(200).json(encounterList);
        }).catch( err => {
            console.error('Error getting all encounters for user\n Error Message:', error);
            res.status(500).json({ message: error });
        })
    },
    createMonster : (req, res) => {
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

        db.get_monsters_from_encounter({ encounterId }).then(monsters => {
            res.status(200).json(monsters);
        })
        .catch ( error => {
            console.error('Error getting monsters for encounter\n Error Message:', error);
            res.status(500).json({ message: error });
        });
    },
    updateMonster: (req, res) => {
        const db = req.app.get('db');
        db.get_monster({ id:req.body.id }).then(monsters => {
            if (monsters.length) {
                return monsters[0];
            }
            else {
                res.status(404).json({ message: 'No monster found by that id' });
            }
        }).catch ( error => {
            console.error('Error getting monster by id\n Error Message:', error);
            res.status(500).json({ message: error });
        })
        .then(monster => {
            
            db.update_monster({ ...monster, ...req.body })
            .then( response => {
                // console.log('Successful update');
                res.status(200).json(response);
            }).catch( error => console.log('YOU DONE GOOFD', error));
        }).catch ( error => {
            console.error('Error updating monster\n Error Message:', error);
            res.status(500).json({ message: error });
        })
    },
    deleteMonster: (req, res) => {
        const db = req.app.get('db');
        const { id } =  req.params;
        
        db.remove_monster({ id })
        .then(removedMonsters => {
            // console.log("removed", removedMonsters);
            res.status(200).json(removedMonsters[0]);
        }) .catch ( error => {
            console.error('Error removing monster\n Error Message:', error);
            res.status(500).json({ message: error });
        })
    }
    
}