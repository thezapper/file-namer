<script lang="ts">
  export let idx: number;
  export let fileName: string;

  let extentionDot = fileName.lastIndexOf(".");
  let extention = fileName.substring(extentionDot, fileName.length);
  let tokens = fileName.substring(0,extentionDot).split(/[_. ]/).filter(word => word.length > 0);

  let finalName = tokens.join(' ') + extention;
  let chosenTokens: boolean[] = new Array(tokens.length).fill(true);

  let tokenClick = (i: number, evt?: MouseEvent) =>
  {
    console.log(tokens[i]);
    if (evt?.ctrlKey === true) // remove token
      chosenTokens[i] = false;
    else
      chosenTokens[i] = true;

    finalName = tokens.filter( (value, index) => chosenTokens[index] === true ).join(' ');
    
    finalName += extention;
  }

  let tokenClass = "token";
</script>

<div class="item-group">
  <div>
    {idx} : {fileName}
  </div>

  <div class="token-group">
    {#each tokens as tk, i}      
      <div  
            class={(chosenTokens[i]) ? "token" : "token token-rem"} 
            id={`${idx}:${i}`}
            on:click={(evt) => tokenClick(i, evt)}
            on:keydown={() => tokenClick(i, undefined)}>
        {tk}
      </div>    
    {/each}
  </div>

  <div>
    {finalName}
  </div>

</div>

<style>
  .token {
    /* border: 1px solid black; */
    display: inline-block;
    padding: 5px;
    background-color: rgb(181, 223, 241);
    margin-right: 5px;
    cursor: pointer;
    border-radius: 5px;
  }
  .token-rem {
    background-color: rgb(238, 50, 44);
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