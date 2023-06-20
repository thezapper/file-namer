<script lang="ts">
  import axios from "axios"
  // import { createEventDispatcher } from 'svelte';
  import { repeatedWords } from './stores'
  import { beforeUpdate } from "svelte";
  import { tokenList } from "./token-list";

  export let idx: number;
  export let fileName: string;
  export let delims: string;
  
  // const dispatch = createEventDispatcher();

  let regex = new RegExp('[' + delims + ']');
  let extentionDot = fileName.lastIndexOf(".");
  let extention = fileName.substring(extentionDot, fileName.length);
  let tokens = fileName.substring(0,extentionDot).split(regex).filter(word => word.length > 0);

  let finalName = tokens.join(' ') + extention;
  let chosenTokens:  boolean[] = new Array(tokens.length).fill(null);
  let patternTokens: boolean[] | null[] = new Array(tokens.length).fill(null);
  let visibleTokens: boolean[] | null[] = new Array(tokens.length).fill(true);

  let ignoreTokens: Set<string>;

  let tokenRtClick = (i: number, evt?: MouseEvent) =>
  {
    let updateSet= (theSet: Set<string>) => {
      let tok = tokens[i];
      if (theSet.has(tok))
      {
        theSet.delete(tok);

        tokens.forEach( (token, idx) => {
        if (tok === token)
          chosenTokens[idx] = true;
      })
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

  let rebuild = () =>
  {
    // regenerate the selected token list before render
    // loop through each ignore token
    tokens.forEach( (token, idx) => 
    {
      // visible toke to whatever the pattern says
      if (patternTokens[idx] != null)
        visibleTokens[idx] = patternTokens[idx];

      if (chosenTokens[idx] != null)
        visibleTokens[idx] = chosenTokens[idx];
  
      // but if the pattern and individual selection differ,
      // use the individual
      if (patternTokens[idx] != chosenTokens[idx])
      {
      }

    })
    
    finalName = tokens.filter( (value, index) => visibleTokens[index] === true ).join(' ') + extention;
  }
  
  // Update the repeated word list when it's changed from the patterns component
  // This will be for removing an item
  let theOldSet: Set<string>;
  repeatedWords.subscribe( (theNewSet) =>  
  {
      // loop through each ignore token
    // theNewSet.forEach( (ignore) => {
    //   // and set corresponding name token to ignore
    //   tokens.forEach( (token, idx) => {
    //     if (ignore === token)
    //       patternTokens[idx] = false;
    //     else
    //       patternTokens[idx] = null;

    //   })
    // })

    tokens.forEach( (token, idx) => {
      if (theNewSet.has(token))
        patternTokens[idx] = false;
      else
        patternTokens[idx] = null;
    })

    theOldSet = new Set(theNewSet);

    rebuild();
    visibleTokens = visibleTokens;


    //finalName = tokens.filter( (value, index) => chosenTokens[index] === true ).join(' ') + extention;
  })

  let tokenClick = (i: number, evt?: MouseEvent) =>
  {
    if (evt?.ctrlKey === true) // remove token
      chosenTokens[i] = false;

    // not clicked or set by pattern - hide it
    if (chosenTokens[i] === null && patternTokens[i] === null)
      chosenTokens[i] = false;
    // not clicked, but has been set by pattern - show it
    else if (chosenTokens[i] === null && patternTokens[i] === false)  
      chosenTokens[i] = true;
    else
      chosenTokens[i] = !chosenTokens[i];

    rebuild();
    visibleTokens = visibleTokens;
    //finalName = tokens.filter( (value, index) => chosenTokens[index] === true ).join(' ') + extention;
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

  // build the visible list
  // beforeUpdate ( ()=>
  // {
  //   rebuild();
  // })

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
  
    <span>{extention}</span>

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
    background-color: rgb(174, 60, 240);
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
    background-color: rgb(56, 219, 61);
    border-radius: 6px;
    color: black;
  }

  div {
    font-size: larger;
  }
</style>