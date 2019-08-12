const GoogleStrategy = require('passport-google-oauth20');

const UserCollection = require('../schemas/user');

module.exports = passport => {
    passport.use(new GoogleStrategy({
        callbackURL: '/users/google/redirect',
        clientID: process.env.MY_CLIENT_ID,
        clientSecret: process.env.MY_CLIENT_SECRET
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await UserCollection.findOne({ id: profile.id });
            if (exUser) {
                console.log('user is: ', exUser);
                done(null, exUser);
            } else {
                let newUser = new UserCollection({ id: profile.id, pwd: profile.displayName });
                newUser.save((err, account) => {
                    if (err) return console.error(err);
                })
                done(null, newUser)
            }
        } catch (err) {

        }
    }))
}
