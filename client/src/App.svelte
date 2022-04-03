<script>
  import Welcome from "./pages/Welcome.svelte";
  import About from "./pages/About.svelte";
  import Chat from "./pages/Chat.svelte";


  let page = document.location.hash;

  window.onpopstate = function (event) { 
      page = document.location.hash
  }

</script>

<main>
  <div class="menu">
    <a href="#welcome">Welcome</a>
    <a href="#about">About</a>
    <a href="#chat">Chat</a>
  </div>


  {  #if page ==="#welcome" }
    <Welcome />
  { :else if page === "#about" }
    <About />
  { :else if page === "#chat" }
    <Chat />
  { /if }
  
</main>


<style>
	main {
    margin: 0;
    padding: 0;
	}


  .menu { 
    position: absolute;
    flex-direction: row;
    top:0;
    z-index: 100;
  }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

</style>
