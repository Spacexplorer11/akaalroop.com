<script>
</script>

<div id="navbar">
	<nav id="items">
		<a href="/">Home</a>
		<!--    <a href="/projects">Projects</a> -->
		<!--	<a href="/about">About</a> -->
		<!--	<a href="/contact">Contact</a> -->
	</nav>
</div>
<style>
	#navbar {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		padding: 10px 20px;
		height: 5vmin;
		background-color: rgba(0, 0, 0, 0.7); /* black with 70% opacity */
		color: white;
		margin-left: 3vmin;
	}

	#items {
		display: flex;
		flex-direction: row;
		gap: 20rem;
	}

	#items a {
		color: orange;
		text-decoration: none;
		font-size: 1.5rem;
		font-weight: 600;
	}

	#items a:hover {
		text-decoration-line: overline;
		color: rgb(223, 99, 0);
	}
</style>