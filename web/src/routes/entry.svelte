<script lang="ts">
  export let idx: number;
  export let fileName: string;

  let extentionDot = fileName.lastIndexOf(".");

  let tokens = fileName.substring(0,extentionDot).split(/[_. ]/);

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
    /* border: 1px solid black; */
    display: inline;
    padding: 0px;
    background-color: rgb(181, 223, 241);
    margin-right: 5px;
    cursor: pointer;
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