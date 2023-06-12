<script lang="ts">
  import { onMount } from "svelte";
  import Entry from "./entry.svelte";
  import Delimiters from "./delimiters.svelte";
  import Patterns from "./patterns.svelte";
  import axios from "axios"

  let fileList: string[] = [];

  async function getData()
  {
    try 
    {
      const params = {
        mode:"cors", 
        headers: { "Content-Type": "application/json" } 
      }
      const response = await axios.get('http://127.0.0.1:3000/list', params);
      fileList = response.data.files;

      fileList.forEach( (value: string) => console.log(value) );
    } 
    catch (error) 
    {
      console.error(error);
    }
    
    // let response = await fetch( "http://127.0.0.1:3000/list", {mode:"cors", headers: { "Content-Type": "application/json" } } );
    // try
    // {
    //   let info = await response.json();
    //   fileList = info.files;
    //   console.log(info);
    // } catch(e)
    // {
    //   console.log(e);
    // }
  }

  onMount(async() => {
    getData();
  })

</script>

<h1>File List Renamer</h1>

<Delimiters></Delimiters>

<Patterns></Patterns>

<div>
  {#each fileList as  name, i}
    
  <Entry idx={i} fileName={name} />
    
	{/each}
</div>