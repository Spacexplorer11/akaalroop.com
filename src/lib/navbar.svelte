<script>
  import { onMount } from "svelte";

  onMount(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js";
    script.type = "text/javascript";
    script.setAttribute("data-name", "bmc-button");
    script.setAttribute("data-slug", "spacexplorer11");
    script.setAttribute("data-color", "#FFDD00");
    script.setAttribute("data-emoji", "☕");
    script.setAttribute("data-font", "Cookie");
    script.setAttribute("data-text", "Buy me a coffee");
    script.setAttribute("data-outline-color", "#000000");
    script.setAttribute("data-font-color", "#000000");
    script.setAttribute("data-coffee-color", "#ffffff");
    document.getElementById("sponsor-buttons").appendChild(script);
  });
</script>

<div class="@container relative ml-0 flex w-full flex-row items-center justify-between bg-black/70 p-10 text-white">
	<nav class="flex w-full flex-row items-center space-x-8 md:space-x-16 lg:space-x-24">
		<a class="text-2xl font-medium text-orange-500 hover:text-orange-600 hover:overline" href="/">Home</a>
		<a class="text-2xl font-medium text-orange-500 hover:text-orange-600 hover:overline"
		   href="/projects">Projects</a>
		<a class="text-2xl font-medium text-orange-500 hover:text-orange-600 hover:overline" href="/gallery">Gallery</a>
		<!--	<a href="/about">About</a> -->
		<!--	<a href="/contact">Contact</a> -->
		<div id="sponsor-buttons" class="ml-auto flex flex-row items-center space-x-2">
			<iframe
					src="https://github.com/sponsors/Spacexplorer11/button"
					title="Sponsor Spacexplorer11"
					height="32"
					width="114"
					style="border: 0; border-radius: 6px;"
			></iframe>
		</div>
	</nav>
</div>
