<template>
	<div id="app">
		<h1 id="title">Diet Tracker</h1>
		<nav v-if="render">
			<router-link :to="`/?uid=${uid}`"><div>Today</div></router-link>
			<router-link :to="`/days?uid=${uid}`"><div>Days</div></router-link>
			<router-link :to="`/items?uid=${uid}`"><div>Food Items</div></router-link>
			<router-link :to="`/goals?uid=${uid}`"><div>Goals</div></router-link>
			<span class="logininfo">
				<span class="dim" style="margin-right: 0;">{{username ? 'Logged in as: ' : '(Not logged in)'}}</span>{{username}}
			</span>
			<div v-if="username" @click="logout">Logout</div>
		</nav>
		<main>
			<router-view v-if="username"/>
			<div v-else id="login">
				<div id="loginGrid">
					<p>Username:</p>
					<input ref="username" type="text"/>
					<p>Password:</p>
					<input ref="password" type="password"/>
				</div>
				<div id="submit">
					<button @click="login">Login</button>
					<button @click="register">Register new user</button>
				</div>
				<p style="text-align: center;">{{loginStatus ? loginStatus : '\u00a0'}}</p>
			</div>
		</main>
		<footer>
			<p class="dim">Taylor Plewe | <a href="https://github.com/taylorplewe/cp4">https://github.com/taylorplewe/cp4</a></p>
		</footer>
	</div>
</template>

<script>
const LOGIN_STATUS_APPEAR_TIME = 4000; // in miliseconds

import axios from 'axios';
export default {
	data: function() {
		return {
			username: '',
			uid: '',
			loginStatus: "",
			render: true
		}
	},
	methods: {
		async login(){
			try {
				let user = await axios.get('/api/users/' + this.$refs.username.value);
				if (!user.data) {
					this.updateLoginStatus(`User '${this.$refs.username.value}' not found!`);
					return;
				} else {
					try {
						user = await axios.get('/api/users/' + this.$refs.username.value + '/' + this.$refs.password.value);
						if (!user.data) {
							this.updateLoginStatus(`Incorrect password!`);
							return;
						} else {
							this.uid = user.data._id;
							this.updateLoginStatus("Login successful!");
							this.delayLogin();
						}
					} catch (e) {
						console.error(e);
						this.updateLoginStatus("Error logging in user!");
					}
				}
			} catch(e) {
				console.error(e);
				this.updateLoginStatus("Error logging in user!");
			}
		},
		async register() {
			try {
				// first see if the user is already created
				let user = await axios.get('/api/users/' + this.$refs.username.value);
				if (user.data) {
					this.updateLoginStatus(`User with username '${this.$refs.username.value}' already exists!`);
				}
				else {
					// register new user
					try {
						let res = await axios.post('/api/users', {
							username: this.$refs.username.value,
							password: this.$refs.password.value
						});
						if (res.statusText == "OK") {
							this.uid = res.data._id;
							this.updateLoginStatus(`User '${this.$refs.username.value}' registered successfully and logged in!`);
							this.delayLogin();
						}
					} catch (e) {
						console.error(e);
						this.updateLoginStatus("Error registering user!");
					}
				}
				return true;
			} catch (e) {
				console.error(e);
				this.updateLoginStatus("Error registering user!");
			}
		},
		async getUsername() {
			try {
				let res = await axios.get('/api/userbyid/' + this.uid);
				if (!res.data) return;
				this.username = res.data.username;
			} catch(e) {
				console.error(e);
			}
		},
		updateLoginStatus(val) {
			this.loginStatus = val;
			setTimeout(() => {this.loginStatus = null}, LOGIN_STATUS_APPEAR_TIME);
		},
		delayLogin() {
			// update the URLs in the routers
			this.render = false;
			this.$nextTick(() => { this.render = true; });

			// update current URL
			let url = new URL(location);
			url.searchParams.delete('uid');
			url.searchParams.append('uid', this.uid);
			location = url;
		},
		logout() {
			let url = new URL(location);
			url.searchParams.delete('uid');
			location = url;
		}
	},
	created: function() {
		// first get user ID from URL
		const url = new URLSearchParams(location.search);
		this.uid = url.get("uid");
		if (!this.username && this.uid) this.getUsername();
	}
}
</script>

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
nav .logininfo {
	padding: 1.5rem;
	color: white;
	font-size: 16pt;
	margin-left: auto;
}
.router-link-active, nav div:hover {
	background: #365e6e;
}

.dim {
	opacity: 50%;
}

footer, .loading {
	text-align: center;
}


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
	margin: 0.5rem;
}
.loading {
	text-align: center;
	margin-top: 2rem;
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
	#loginGrid {
		width: 70%;
	}
}

</style>
