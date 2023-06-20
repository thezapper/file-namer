<!-- Patterns lets you select some tokens from an entry and find and remove them from
all the other entries -->
<script lang="ts">
  import { repeatedWords } from './stores';

  let tokens: Set<string>;

  let buttonClick = (evt: MouseEvent) =>
  {
    let btn = evt.target as HTMLButtonElement;
    
    let updateSet= (theSet: Set<string>) => {
      let tok = btn.innerText;
      if (theSet.has(tok))
      {
        theSet.delete(tok);
      }

      return theSet;
    }

    repeatedWords.update( updateSet );
  }
  repeatedWords.subscribe( (theSet) =>  {
    tokens = theSet;
  })

</script>
<div class="comp-group">

  <div class="offset-title">Repeated Words</div>

  <div>Right click elements to add them to the removal list</div>
  
  <div>
    {#each (Array.from(tokens)) as tk, i}
    <button on:click={(evt) => buttonClick(evt)} name={i.toString()}>{tk}</button>
    {/each} 
  </div>
</div>

<style>
  

</style>