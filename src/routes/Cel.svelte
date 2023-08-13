<script lang="ts">
    let content = '';
  
    function handleInput(e: any) {

        alert (e.data + "|" )
        
        content = e.data.slice(-1); 
    }
  </script>
  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    contenteditable="true"
    bind:innerHTML={content}
    on:input={handleInput}
    style="border: 1px solid #ccc; padding: 4px; width: 100px; height: 14px;"
  />
  
  <p>You typed: {@html content}</p>
  