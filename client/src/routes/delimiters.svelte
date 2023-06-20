<script lang="ts">

  export let defaultDelims = ""
  let delims = defaultDelims.split('');

  let textChanged = (evt: Event) =>
  {
    let text = (evt.currentTarget as HTMLInputElement )?.value;

    delims = text.split('');
    // If one of the delimimiters is the space character, swap it for ' '
    // let idx = delims.findIndex((v:string) => v === ' ')
    // if (idx > -1)
    // {
    //   delims[idx] = `' '`
    // }
    // console.log(idx);
  }

  let buttonClick = (evt: MouseEvent) =>
  {
    let btn = evt.target as HTMLButtonElement;
    let idx: number = Number(btn.name);
    let char = delims[idx];
    
    defaultDelims = defaultDelims.replace(char, '');
    delims = defaultDelims.split('');
    console.log(defaultDelims);
  }

</script>

<div class="comp-group">

  <div class="offset-title" >Tokeniser Characters</div>
  
  <input type="text" bind:value={defaultDelims} on:input={(evt) => textChanged(evt)}/>
  
  <div>Quick Access - click to remove</div>

  <div class="button-group">
    {#each delims as d,idx}
      <button on:click={(evt) => buttonClick(evt)} name={idx.toString()}>{d === ' ' ? `' '` : d}</button>
    {/each}
  </div>

</div>

<style>
  

  .button-group {
    position: relative;
    margin-top: 15px;
  }

  input[type=text] {
    font-family: "Code", sans-serif;
    font-size: x-large;
  }

  button {
    /* position: relative; */
    font-family: "Code", sans-serif;
    font-size: x-large;
    display: inline-block;
    width: 60px;
    /* height:60px; */
    text-align: center;
    padding: 5px;
    margin: 5px;
    aspect-ratio: 1;
  }

</style>