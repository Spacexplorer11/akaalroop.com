export async function load() {
	try {
		const res = await fetch("https://api.akaalroop.com/projects");
		if (!res.ok) {
			console.error(`HTTP error! status: ${res.status}`);
			return {
				projects: []
			};
		}
		let projects = await res.json();

		console.log("Successfully fetched projects!");
		return { projects: projects };
	} catch (error) {
		console.error("Failed to load projects in layout:", error);
	}
	return {
		projects: []
	};
}
