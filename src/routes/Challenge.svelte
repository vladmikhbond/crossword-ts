
<script lang="ts">
	import { Dir, Used } from "$lib/classes";

  export let used: Used;

</script>
 
<div>
  <span class='dir'>{used.dir == Dir.Hor ? '→' : '↓'}</span> 

  {#if (used.term.def.startsWith('Http'))}
    <!-- svelte-ignore a11y-missing-attribute -->
    <img src="{used.term.def}"/>
  {:else}
    <pre>{used.term.def}</pre>
  {/if}
</div>

<style>
  img {
     width: 100px;
     height: 100px;
     object-fit:contain;
     border: thin solid gray;
     margin-top: 10px;
     background-color: gainsboro;
  }
  .dir {
    font-size: 20px;
    font-weight: 900;
  }


</style>