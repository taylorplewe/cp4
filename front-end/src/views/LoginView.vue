<template>
	<div id="login">
		<div id="loginGrid">
			<p>Username:</p>
			<input ref="username" type="text"/>
			<p>Password:</p>
			<input ref="password" type="password"/>
		</div>
		<div id="submit">
			<button @click="submit">Login</button>
			<button @click="register">Register new user</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "LoginView",
	methods: {
		submit: function() {
			console.log("ben");
		},
		register: function() {
			console.log("reg?");
		}
	}
}
</script>

<style>
#loginGrid {
	display: grid;
	grid-template-columns: 50% 50%;
	row-gap: 1rem;
	column-gap: 1rem;
	width: 50%;
	margin: 1rem auto;
}
#loginGrid > p {
	text-align: right;
	margin: 0;
}
#submit {
	margin: auto;
	width: max-content;
}
#submit > * {
	margin-bottom: 1rem;
}
@media (max-width: 980px) {
	#loginGrid {
		width: 70%;
	}
}
</style>
