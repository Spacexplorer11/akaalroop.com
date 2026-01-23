export let projectsClicked = $state(new Set());

export async function loadProjectsClicked(localStorage) {
	if (typeof localStorage === "undefined") return;
	if (typeof window === undefined) return;
	const savedStr = localStorage.getItem("projectsClicked");
	if (!savedStr) return;

	try {
		const savedObj = JSON.parse(savedStr);
		const now = Date.now();
		if (savedObj.expiry && now < savedObj.expiry) {
			savedObj.value.forEach((item) => projectsClicked.add(item));
		} else {
			localStorage.removeItem("projectsClicked");
		}
	} catch {
		localStorage.removeItem("projectsClicked");
	}
}

export async function saveProjectsClicked(localStorage) {
	if (typeof localStorage === "undefined") return;
	if (typeof window === undefined) return;
	const expiry = Date.now() + 300_000;
	const obj = {
		value: Array.from(projectsClicked),
		expiry
	};
	localStorage.setItem("projectsClicked", JSON.stringify(obj));
}
