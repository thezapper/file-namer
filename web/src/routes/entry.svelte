<script lang="ts">
  export let idx: number;
  export let fileName: string;

  let tokens = fileName.split(/[_. ]/);

</script>

<div class="item-group">
  <div>
    {idx} : {fileName}
  </div>
  <div class="token-group">
    {#each tokens as tk, i}
      <div class="token" id={`${idx}:${i}`}>{tk}</div>    
    {/each}
  </div>
</div>

<style>
  .token {
    border: 1px solid black;
    display: inline;
    padding: 5px;
    margin-right: 2px;
  }
  .token-group {
    /* border: 1px solid purple; */
    /* padding: 2px; */
  }
  .item-group {
    border: 1px dashed red;
    margin-bottom: 10px;

  }

  div {
    font-size: larger;
  }
</style>