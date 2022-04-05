<template>
	<div id="app">
		<h1 id="title">Diet Tracker</h1>
		<nav>
			<router-link to="/"><div>Today</div></router-link>
			<router-link to="/days"><div>Days</div></router-link>
			<router-link to="/items"><div>Food Items</div></router-link>
			<router-link to="/goals"><div>Goals</div></router-link>
		</nav>
		<main>
			<router-view/>
		</main>
		<footer>
			<p class="dim">Taylor Plewe | <a href="https://github.com/taylorplewe/cp4">https://github.com/taylorplewe/cp4</a></p>
		</footer>
	</div>
</template>

<style>
body {
	background: white;
	font-family: Helvetica, Arial, sans-serif;
}
h1 {
	text-align: center;
	color: #3d6c7f;
}
h2 {
	color: #3d6c7f;
}
a:hover {
	text-decoration: none;
}
a {
	text-decoration: none;
}
main {
	margin: 2rem auto;
	width: 60%;
}
p {
	font-family: Georgia, serif;
}

.itemGrid {
	display: grid;
	grid-template-columns: 100px 200px 100px 100px 100px 100px;
	column-gap: 2rem;
	padding: 1rem 0 1rem 1rem;
}
.itemGrid > p {
	margin: 0;
	font-size: 16pt;
}
.itemGrid:nth-child(odd), .total {
	background: #e6eef1;
}

#title {
	font-style: italic;
	font-size: 36pt;
}

nav {
	background: #3d6c7f;
	display: flex;
	width: 60%;
	margin: auto;
}
nav div {
	cursor: pointer;
	padding: 1.5rem;
	color: white;
	/* font-weight: bold; */
	font-size: 16pt;
}
nav div:hover {
	background: #365e6e;
}

.dim {
	opacity: 50%;
}

footer {
	text-align: center;
}

@media (max-width: 980px) {
	body {
		margin: 0;
	}
	nav {
		width: 100%;
		display: revert;
	}
	.itemGrid {
		grid-template-columns: 22% 26% 13% 13% 13% 13%;
		padding: 1rem 0;
		column-gap: 0;
	}
	.itemGrid > p {
		font-size: 12pt;
	}
	main {
		width: 100%;
	}
}

</style>