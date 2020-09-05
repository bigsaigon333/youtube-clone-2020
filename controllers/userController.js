import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
	console.log(req.body);
	const { name, email, password, password2 } = req.body;

	if (password !== password2) {
		res.status(400);
		res.render("join", { pageTitle: "Join" });
	} else {
		try {
			// Register User
			const user = await User({ name, email });
			await User.register(user, password);

			// Log user in
			next();
		} catch (e) {
			console.error(e);
			res.redirect(routes.home);
		}
	}
};

export const getLogin = (req, res) =>
	res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
});

// export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (
	accessToken,
	refreshToken,
	profile,
	cb
) => {
	try {
		console.log("cb: ");
		console.log(cb);

		const {
			_json: { id, avatar_url, name },
		} = profile;

		const { value: email } = profile.emails.filter((item) => item.primary)[0];
		console.log(profile.emails.filter((item) => item.primary)[0]);

		console.log(profile);

		console.log(id, avatar_url, name, email);

		const user = await User.findOne({ email: email });
		if (user) {
			console.log("user is found");
			user.githubId = id;
			user.save();
			return cb(null, user);
		} else {
			const newUser = await User.create({
				email: email,
				name,
				githubId: id,
				avatarUrl: avatar_url,
			});
			return cb(null, newUser);
		}
		// console.log("accessToken: " + accessToken);
		// console.log("refreshToken: " + refreshToken);
		// console.log("profile: " + profile);
		// console.log("cb: " + cb);
		// console.log(user);
	} catch (e) {
		console.error(e);
		return cb(e);
		// res.redirect(routes.login);
	}
};

export const postGithubLogin = (req, res) => {
	res.redirect(routes.home);
};

export const logout = (req, res) => {
	// Process Log Out
	req.logout();
	res.redirect(routes.home);
};

export const getEditProfile = (req, res) =>
	res.render("editProfile", { pageTitle: "Edit Profile" });

export const getMe = (req, res) => {
	// console.log("getMe");
	// console.log(res.locals.loggedUser);
	res.render("userDetail", {
		pageTitle: "User Detail",
		user: res.locals.loggedUser,
	});
};

export const changePassword = (req, res) =>
	res.render("changePassword", { pageTitle: "Change Password" });

export const userDetail = async (req, res) => {
	const {
		params: { id },
	} = req;
	try {
		const user = await User.findById(id);
		res.render("userDetail", { pageTitle: "User Detail", user });
	} catch (e) {
		console.error(e);
		res.redirect(routes.home);
	}
};
