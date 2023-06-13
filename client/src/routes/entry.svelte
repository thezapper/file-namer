<script lang="ts">
  import axios from "axios"

  export let idx: number;
  export let fileName: string;
  export let delims: string;

  console.log(" entry update" , delims);

  let regex = new RegExp('[' + delims + ']');

  let extentionDot = fileName.lastIndexOf(".");
  let extention = fileName.substring(extentionDot, fileName.length);
  let tokens = fileName.substring(0,extentionDot).split(regex).filter(word => word.length > 0);

  let splitWord = tokens[0].split('');

  //tokens = tokens.concat(splitWord);
  let finalName = tokens.join(' ') + extention;
  let chosenTokens: boolean[] = new Array(tokens.length).fill(true);

  let tokenClick = (i: number, evt?: MouseEvent) =>
  {
    // console.log(tokens[i]);
    if (evt?.ctrlKey === true) // remove token
      chosenTokens[i] = false;
    // else
    //   chosenTokens[i] = true;

    chosenTokens[i] = !chosenTokens[i];

    finalName = tokens.filter( (value, index) => chosenTokens[index] === true ).join(' ');
    
    finalName += extention;
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
  <div>
    {idx+1}
  </div>

  <div class="token-group">
    Input: 
  
    {#each tokens as tk, i}      
      <div  
            class={(chosenTokens[i]) ? "token" : "token token-rem"} 
            id={`${idx}:${i}`}
            on:click={(evt) => tokenClick(i, evt)}
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
    transition: background-color 1.0s ease;
  }

  .token-rem {
    background-color: rgb(137, 137, 137);
    /* color: rgb(129, 114, 114); */
    transition: background-color 1.0s ease;
  }
  .token-group {
    margin: 10px;
  }
  .item-group {
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