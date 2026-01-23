<script>
	import Typewriter from "svelte-typewriter";
</script>

<svelte:head>
	<title>Sponsors</title>
</svelte:head>

<div class="@container mx-auto flex flex-col px-4 py-8 text-center">
	<Typewriter mode="cascade" interval="20">
		<h1 class="text-orange-500"><span class="text-bg">My Amazing Sponsors</span></h1>
		<h2 class="text-orange-500">
			<span class="text-bg"
				>First of all, I'd like to thank my first sponsors, my parents for everything they have ever done for me! ❤️
			</span>
		</h2>
	</Typewriter>
	<Typewriter delay="3000" mode="cascade" interval="10">
		<!-- <div class="text-orange-500 mb-5"><h1 class="mb-3"><span class="text-bg">Platinum (£500-*)</span></h1></div>
		<div class="text-orange-500 mb-5"><h1 class="mb-3"><span class="text-bg">Gold (£200-£500)</span></h1></div>
		<div class="text-orange-500 mb-5"><h1 class="mb-3"><span class="text-bg">Silver (£50-£200)</span>/h1></div> -->
		<div class="mb-5 flex-col text-orange-500">
			<h1 class="mb-3"><span class="text-bg">Bronze (£0-£50)</span></h1>
			<p class="text-bg mx-auto">Mr Walsh - £5</p>
		</div>
	</Typewriter>
</div>
