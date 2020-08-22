import routes from "../routes";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = (req, res) => {
	console.log(req.body);
	const { name, email, password, password2 } = req.body;

	if (password !== password2) {
		res.status(400);
		res.render("join", { pageTitle: "Join" });
	} else {
		// To Do: Register User
		// To Do: Log user in
		res.redirect(routes.home);
	}
};

export const getLogin = (req, res) =>
	res.render("login", { pageTitle: "Login" });
export const postLogin = (req, res) => {
	// res.render("login", { pageTitle: "Login" });

	res.redirect(routes.home);
};

export const logout = (req, res) => {
	// To Do: Process Log Out
	// res.render("logout", { pageTitle: "Logout" }
	res.redirect(routes.home);
};

export const userDetail = (req, res) =>
	res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) =>
	res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) =>
	res.render("changePassword", { pageTitle: "Change Password" });
