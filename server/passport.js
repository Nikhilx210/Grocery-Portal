import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport  from "passport";
import userModel from "./models/userModel.js";
passport.use(
	new GoogleStrategy(
		{
			clientID: "103693188982-q9ae93cjj3nqp0eug8ms35v1vk8sr1nr.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/api/v1/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, cb) {
			// User.findOrCreate({ username:profile.username,email:profile.emails}, function (err, user) {
			// 	return cb(err, user);
			//   });
			userModel.findOrCreate({ name: profile.displayName, email: profile.emails[0].value }, function (err, user) {
				console.log(user)
				return cb(null, user);
			});
		}
	)
);


passport.serializeUser((user, done) => {
	console.log("hello12")
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
export default passport;