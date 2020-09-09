import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
	console.log(req.body);
	const { name, email, password, password2 } = req.body;

	if (password !== password2) {
		res.status(400);
		req.flash("error", "Passwords don't match");
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
	successFlash: "Welcome",
	failureFlash: "Can't log in. Check your email and/or password",
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
	req.flash("info", "See you soon!");
	req.logout();
	res.redirect(routes.home);
};

export const getEditProfile = (req, res) =>
	res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
	const {
		body: { name, email },
		file,
	} = req;

	console.log(file);
	try {
		await User.findByIdAndUpdate(req.user.id, {
			name,
			email,
			avatarUrl: file ? file.location : req.user.avatarUrl,
		});
		req.flash("success", "Profile updated");
		res.redirect(routes.me);
	} catch (e) {
		req.flash("error", "Profile has not been updated");
		console.error(e);
		// res.render("editProfile", { pageTitle: "Edit Profile" });
		res.redirect(routes.editProfile);
	}
};

export const getMe = async (req, res) => {
	// console.log("getMe");
	// console.log(res.locals.loggedUser);
	try {
		const user = await User.findById(res.locals.loggedUser.id).populate(
			"videos"
		);

		res.render("userDetail", {
			pageTitle: "User Detail",
			user: user,
		});
	} catch (e) {
		console.error(e);
		res.redirect(routes.home);
	}
};

export const getChangePassword = (req, res) =>
	res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
	// res.render("changePassword", { pageTitle: "Change Password" });

	const {
		body: { oldPassword, newPassword, newPassword1 },
	} = req;

	console.log("postChangePassword", oldPassword, newPassword, newPassword1);

	try {
		if (newPassword !== newPassword1) {
			req.flash("error", "Both passwords don't match");
			throw new Error("New Password and New Password 1 must be the same");
		}

		await req.user.changePassword(oldPassword, newPassword);

		res.redirect(routes.me);
	} catch (e) {
		console.error(e);
		res.status(400);
		res.redirect(`/users${routes.changePassword}`);
	}
};

export const userDetail = async (req, res) => {
	const {
		params: { id },
	} = req;
	try {
		const user = await User.findById(id).populate("videos");
		console.log(user.videos);
		res.render("userDetail", {
			pageTitle: "User Detail",
			user,
		});
	} catch (e) {
		console.error(e);
		res.redirect(routes.home);
	}
};

export const githubLogin = (req, res) => {
	passport.authenticate("github", {
		successFlash: "Welcome!",
		failureFlash: "Check your email and/or password",
	});
};
