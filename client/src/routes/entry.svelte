<script lang="ts">
  import axios from "axios"

  export let idx: number;
  export let fileName: string;

  let extentionDot = fileName.lastIndexOf(".");
  let extention = fileName.substring(extentionDot, fileName.length);
  let tokens = fileName.substring(0,extentionDot).split(/[_. ]/).filter(word => word.length > 0);

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
  
  <div class="token save-btn" on:click={() => rename(fileName, finalName) }>
    save
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
    color: black;
  }
  .save-btn {
    padding: 10px;
    margin: 5px;
  }
  .token-rem {
    background-color: rgb(238, 50, 44);
  }
  .token-group {
    margin: 10px;
  }
  .item-group {
    border: 2px solid black;
    margin: 10px;
    margin-bottom: 15px;
    box-shadow: 3px 3px 2px 0px rgba(0, 0, 0, 0.8);
    background-color: rgb(237, 237, 100);
    color: black;
  }

  div {
    font-size: larger;
  }
</style>