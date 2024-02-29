
<script lang="ts">
	import { Dir, Occupier} from "$lib/modelClasses";

  export let used: Occupier;

  let arrow = '';
  $: arrow = used.dir == Dir.Hor ? '→' : '↓';


</script>
 
  <div class='arrow'>{arrow}</div>
  {#if used.term.isDefImage() }
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="{used.term.def}" class="image"/>
  {:else}
    <pre class="text">  {used.term.def}</pre>
  {/if}


<style>
  .arrow {
    font-size: 20px;
    font-weight: 900;
    color: red;
  }

  .image {
     width: 120px;
     height: 120px;
     object-fit:contain;
     background-color: aliceblue;  
  }

  .text {
      white-space:pre-wrap;
      padding: 0 10px 0 10px;
      width: 100%;
      display: grid;
      place-items: center;
  }


</style>