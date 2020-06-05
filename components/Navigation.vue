<template>
	<div class="header">
      <div class="header-title">
        <router-link to="/">
            <h1>TMDB</h1>
        </router-link>
				</div>
            <div class="menu">
               <ul>
                  <li>
                     <router-link to="/"><h2>Home</h2></router-link>
                  </li>
                  <li>
                     <router-link :to="`/movies/${playing}`">
                        <h2>Now Playing</h2>
                     </router-link>
                  </li>
                  <li>
                     <router-link :to="`/movies/${upcoming}`">
                        <h2>Upcoming</h2>
                     </router-link>
                  </li>
                  <li>
                     <router-link :to="`/movies/${populars}`">
                        <h2>Populars</h2>
                     </router-link>
                  </li>
               </ul>
            </div>
            <div class="contanier-search-input" v-show="page">
               <ul>
                  <li>
                     <button :disabled="isDisabled" @click="searchMovie">Search</button>
                  </li>
                  <li>
                      <input type="text" placeholder="Search Movie" v-model="search">
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   </div>
</template>

<script>

	export default {
		name: 'Navigation',	

		data () {
			return {
				search: '',
            playing: 'now_playing',
            upcoming: 'upcoming', 
            populars: 'popular',
			}
		},

      computed: {
         isDisabled () {
            return this.search.length == 0
         },  

         page () {
            return this.$route.fullPath !== '/'
         }
      },

      methods: {

         searchMovie () {
            this.$router.push(`/search/${this.search}`)
            this.search = ''
        },
      },
}

</script>

<style>
   .header {
      position: fixed;
      width: 100%;
      height: 56px;
      margin: auto;
      right: 2px;
      background-color: #212529bf;
      z-index: 2;
   }

   .header-title {
      position: relative;
      display: inline-block;
      top: 5px;
      left: 20px;
      width: 200px;
      font-size: 20px;
   }

   .header-title h1 {
      color: #fff;
   }

   .menu {
      margin-left: 150px;
   }

   .menu li{
      display: block;
      float: left;
      padding: 0px 15px;
      position: relative;
      bottom: 34px;
   }

   .menu h2 {
      color: #fff;
      font-size: 20px;
      transition: 300ms;
   }

    .menu h2:hover {
      color: #999;
   }

   .contanier-search-input li{
      float: right;
      height: 56px;
      display: block;
   }

   .contanier-search-input ul {
      position: relative;
      margin-right: 20px;
      bottom: 36px;
   }

   .contanier-search-input button {
      height: 34px;
      width: 70px;
      border: none;
      font-weight: bold;
      background: #01B4E4;
      color: #fff;
      cursor: pointer;
      transition: 300ms;
      border-bottom-right-radius: .30rem;
      border-top-right-radius: .30rem;
   }

   .contanier-search-input input {
      height: 30px;
      width: 200px;
      font-weight: bold;
      border-bottom-left-radius: .30rem;
      border-top-left-radius: .30rem;
      text-indent: 2px;
   }

   .contanier-search-input button:hover {
      color: #ffffff8c;
   }

   .router-link-exact-active li {
      border-bottom: 1px solid  inherit;   
   }




</style>