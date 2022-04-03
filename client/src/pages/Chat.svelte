<script>
  import {afterUpdate, onMount, tick} from "svelte";
  import api from '../api.js';
  import Message from "../message.svelte";
  import { messages, count } from "../store.js";

  let messageContainer;
  let hasScrolled = false;

  onMount(() => { 
      messageContainer = document.getElementById("msg-container")
      scroll();
  });

  afterUpdate( ()=> scroll());


  function incrementCount() { 
      count.update(n => n+1);
  }

  function scroll() { 
      tick();
      if (messageContainer) { 
        messageContainer.scrollTop = messageContainer.scrollHeight;
        }
  }

  async function addMessage() { 
      incrementCount()
      let msg = { 
        body: "This is message number " + $count,
        sender: "Jeremy",
      }
      api.sendMessage(msg.body);
  }
</script>

<div id="msg-container" class="message-container">
  {#if $messages }
  {#each $messages as message}
    <Message {message}/>
  {/each}
  {/if}
</div>
<div class="chatbar">
<input class="message-box" />
<button class="send-button"on:click={addMessage}>chat</button>
</div>

<style>

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
