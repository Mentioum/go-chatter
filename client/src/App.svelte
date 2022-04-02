<script>

  import Message from "./message.svelte";
  import {onMount, tick} from "svelte";
  import api from './data.js';

	export let count;
  export let messages = [];
  export let messageContainer;

  onMount(() => { 
      messageContainer = document.getElementById("msg-container")
      api.subscribe(currentMessage => { 
          messages = [...messages, currentMessage];
        })
  });



  function incrementCount() { 
    count +=1;
  }

  function scroll() { 
        messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  async function addMessage() { 
      incrementCount()
      let msg = { 
        body: "This is message number " + count,
        sender: "Jeremy",
      }
      api.sendMessage(msg.body);
      await tick();
      scroll();
  }

</script>

<main>
  <div id="msg-container" class="message-container">
      
  {#each messages as message}
    <Message {message}/>
  {/each}

  </div>
  <div class="chatbar">
  <input class="message-box" />
  <button class="send-button"on:click={addMessage}>chat</button>
  </div>
  
</main>


<style>
	main {
    margin: 0;
    padding: 0;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

  .message-container { 
    display: flex;
    overflow: scroll;

    position: absolute;
    top: 0px;
    bottom:0px;
    left:0px;
    right:0px;
    padding-bottom: 10px;
    margin-bottom: 90px;
    flex-direction: column;
  }

  .chatbar { 
    position: absolute;
    bottom: 0px;
    left:0px;
    right:0px;

    height: 80px;
    background-color: #898989;

    display: flex;
    flex-direction: row;
    align-items: stretch;

    vertical-align: center;
  }

  .message-box { 
    flex-grow: 1;
    margin: 0;
  }

  .send-button { 
    margin: 0;
    width: 100px;
  }


</style>
