<script>
import Typewriter from 'svelte-typewriter'
</script>
<div id="content">
	<Typewriter mode="cascade" interval="30">
	<h1><span class="text">Hi! Welcome to Akaalroop.com</span></h1>
<p><span class="text">This is Akaalroop Singh's website!</span></p>
	</Typewriter>

</div>
<style>
	#content {
		display: flex;
		flex-direction: column;
		padding: 20px;
		color: rgb(223, 99, 0);
		min-height: 100vh;
		text-align: center;
		font-size: larger;
	}

	.text {
		background-color: rgba(0, 0, 0, 0.7); /* black w/ 70% opacity */
		display: inline-block; /* shrink to fit text width */
		padding: 0.5em 0.5em;
		border-radius: 0.5em; /* optional: rounded corners */
	}

</style>