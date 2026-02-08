import { GITHUB_PAT } from "$env/static/private";
export async function load() {
	try {
		const repos =
			"akaalroop.com,boombox,cloudcat,justcount,lets-do-it,mcrecipes,meow_meals,rust-is-the-best,shy-bridge,space_dodge,supercalculator,trafalgar-to-trenches,totp-generator,winter-of-making-minecraft-mod,word_ban,wwf-support";

		const requestedRepos = repos.split(",").map((name) => `spacexplorer11/${name}`);

		const fetched = await Promise.all(
			requestedRepos.map(async (fullName) => {
				try {
					const res = await fetch(`https://api.github.com/repos/${fullName}`, {
						headers: {
							Accept: "application/vnd.github+json",
							Authorization: `token ${GITHUB_PAT}`,
							"User-Agent": "akaalroop-website-server"
						}
					});
					if (!res.ok) {
						console.warn(`Failed to fetch ${fullName}: ${res.status} ${res.statusText}`);
						return [];
					}
					const data = await res.json();
					return {
						name: data.name,
						full_name: data.full_name,
						description: data.description,
						html_url: data.html_url,
						stars: data.stargazers_count,
						homepage: data.homepage
					};
				} catch {
					return [];
				}
			})
		);

		const filteredRepos = fetched.filter(Boolean);
		return { projects: filteredRepos };
	} catch (error) {
		console.error("Failed to load projects in layout:", error);
	}
	return {
		projects: []
	};
}
