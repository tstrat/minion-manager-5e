const axios = require('axios');

module.exports = {
    login: (req, res) => {
        const payload = {
            client_id : process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret : process.env.AUTH0_CLIENT_SECRET,
            code : req.query.code,
            grant_type : 'authorization_code',
            redirect_uri : `http://${req.headers.host}/auth/callback`
        };
        // console.log('payload', payload);
        function tradeCodeForAccessToken() {
            // console.log('Trade code for Access Token');
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token` , payload);           
        }

        function tradeAccessTokenForUserInfo(response) {
            // console.log('Trade Access Token for User Info');
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`);  
        }

        function storeUserInfoInDataBase(response) {
            // console.log('user-info', response.data);
            const userData = response.data;
        
            return req.app.get('db').get_user({auth0_id: userData.sub})
            .then(users => {
            
            if (users.length) {
                const user = users[0];
                req.session.user = user;
                res.redirect('/');
            } else {
                
                return req.app.get('db').create_user({
                    auth0_id: userData.sub,
                    email: userData.email,
                    name: userData.name,
                    picture: userData.picture
                })
                .then(created_users => {
                    const user = created_users[0];
                    req.session.user = user;
                    res.redirect('/');
                }).catch (error => {
                    console.error('error in storeUserInfoInDataBase() / create_user(): ', error);
                    res.status(500).json({message: 'Error on server. Sorry Bro.'});
                })
        
            }
            }).catch (error => {
            console.error('error in storeUserInfoInDataBase() : ', error);
                res.status(500).json({message: 'Error on server. Sorry Bro.'});
            });
            
        }
                    
        tradeCodeForAccessToken()
        .then(accessToken => tradeAccessTokenForUserInfo(accessToken))
        .then(userInfo => storeUserInfoInDataBase(userInfo))
        .catch(error => {
            console.log('---------- error', error)
            res.status(500).json({ message: 'There was an unexpected error on the server.' })
        });
        
    }
}

