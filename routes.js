const routes = {
	//Global
	home: "/",
	join: "/join",
	login: "/login",
	logout: "/logout",
	search: "/search",

	//Users
	users: "/users",
	userDetail: (id) => (id ? "/users/" + id : "/:id"),
	editProfile: "/edit-profile",
	changePassword: "/change-password",
	github: "/auth/github",
	githubCallback: "/auth/github/callback",
	me: "/me",

	//Videos
	videos: "/videos",
	upload: "/upload",
	videoDetail: (id) => (id ? "/videos/" + id : "/:id"),
	editVideo: (id) => (id ? `/videos/${id}/edit` : "/:id/edit"),
	deleteVideo: (id) => (id ? `/videos/${id}/delete` : "/:id/delete"),
};

export default routes;
