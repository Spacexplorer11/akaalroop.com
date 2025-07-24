<script>
	import "../app.css";
	import {Navbar} from "$lib";
</script>

<div id="national-park">
	<Navbar/>
	<slot/>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=National+Park:wght@200..800&display=swap");

	#national-park {
		font-family: "National Park", sans-serif;
		font-optical-sizing: auto;
		font-weight: 600;
		font-style: normal;
	}
</style>
