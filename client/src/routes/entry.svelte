<script lang="ts">
  import axios from "axios"
  // import { createEventDispatcher } from 'svelte';
  import { repeatedWords } from './stores'
  import { tokenList } from "./token-list";

  export let idx: number;
  export let fileName: string;
  export let delims: string;
  
  let visibleTokens: boolean[];
  
  let filePhrase = new tokenList(fileName, delims);
  let finalName = filePhrase.generateFilename();
  let tokens = filePhrase.tokens;

  let tokenRtClick = (i: number, evt?: MouseEvent) =>
  {
    let updateSet= (theSet: Set<string>) => {
      let tok = tokens[i];
      if (theSet.has(tok))
      {
        theSet.delete(tok);
      }
      else
      {
        theSet.add(tok);
      }

      return theSet;
    }

    repeatedWords.update( updateSet );

    evt?.preventDefault();
  }

  // Update the repeated word list when it's changed from the patterns component
  repeatedWords.subscribe( (theNewSet) =>  
  {
    visibleTokens = filePhrase.generateBoolList();
    finalName = filePhrase.generateFilename();
  })

  let tokenClick = (i: number, evt?: MouseEvent) =>
  {
    visibleTokens = filePhrase.loneToken(i);
    finalName = filePhrase.generateFilename();
  }

  let rename = (orgName: string, newName: string) =>
  {
    axios.post('http://127.0.0.1:3000/rename', {
      orgName: orgName,
      newName: newName
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

</script>


<div class="item-group">
  <div class="offset-title">
    {idx+1}
  </div>

  <div class="token-group">
    Input: 
    {#each tokens as tk, i}      
      <div  
            class={ (visibleTokens[i] ) ? "token" : "token token-rem" } 
            id={`${idx}:${i}`}
            on:click={(evt) => tokenClick(i, evt)}
            on:contextmenu={(evt) => tokenRtClick(i, evt)}
            on:keydown={() => tokenClick(i, undefined)}>
        {tk}
      </div>    
    {/each}
  
    <span>{filePhrase.extension}</span>

  </div>

  <div class="token-group">
    Output: {finalName}
  </div>
  
  <button  on:click={() => rename(fileName, finalName) }>
    save
  </button>

</div>

<style src="../../styles.css">
  .token {
    font-family: "Code", sans-serif;
    border: 1px solid black;
    display: inline-block;
    padding: 0px 5px 0px 5px;
    background-color: rgb(60, 234, 240);
    margin-right: 3px;
    cursor: pointer;
    /* border-radius: 5px; */
    color: black;
    transition: background-color 1.0s ease, color 1.0s ease;
  }

  .token-rem {
    background-color: rgb(101, 148, 96);
    color: rgb(96, 96, 96);
    transition: all 1.0s ease;
  }
  .token-group {
    margin: 10px;
  }
  .item-group {
    position: relative;
    border: 2px solid black;
    margin: 10px;
    margin-bottom: 15px;
    box-shadow: 3px 3px 1px 0px rgba(0, 0, 0, 0.8);
    background-color: rgb(56, 127, 219);
    border-radius: 6px;
    color: black;
  }

  div {
    font-size: larger;
  }
</style>