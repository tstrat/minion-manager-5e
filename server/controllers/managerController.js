module.exports = {
    createEncounter : (req, res) => {
        // use req.session.user.id
        const db = req.app.get('db');
        const { name } = req.body

        db.create_encounter({ name, userId: req.session.user.id })
        .then( createdEncounters => {
            res.status(200).json(createdEncounters[0]);
        })
        .catch ( error => {
            console.error('Error creating encounter for user\n Error Message:', error);
            res.status(500).json({ message: error });
        })

    },
    getEncounterList : (req, res) => {
        const db = req.app.get('db');

        db.get_all_encounters({ userId: parseInt(req.session.user.id) })
        .then(encounterList => {
            res.status(200).json(encounterList);
        }).catch( error => {
            console.error('Error getting all encounters for user\n Error Message:', error);
            res.status(500).json({ message: error });
        })
    },
    deleteEncounter: (req, res) => {
        const db = req.app.get('db');

        db.remove_encounter({ id: req.params.id })
        .then( removed => {
            res.status(200).json(removed[0]);
        })
        .catch( error => {
            console.error('Error removing encounters\n Error Message:', error);
            res.status(500).json({ message: error });
        });
    },
    createMonster : (req, res) => {
        const db = req.app.get('db');
        db.create_monster({...req.body})
        .then( createdMonsters => {
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