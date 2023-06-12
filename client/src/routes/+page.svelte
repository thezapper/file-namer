<script lang="ts">
  import { onMount } from "svelte";
  import Entry from "./entry.svelte";
  import Delimiters from "./delimiters.svelte";
  import Patterns from "./patterns.svelte";
  import axios from "axios"

  let fileList: string[] = [];

  async function getData()
  {
    const params = {
        mode:"cors", 
        headers: { "Content-Type": "application/json" } 
      }

    return axios.get('http://127.0.0.1:3000/list', params)
    .then( (response) => {
      console.log("Promise resolved:");
      fileList = response.data.files;
      // console.dir(data);
    })
    .catch( (err) => {
      console.log("Error:", err);

    })
    .finally( () => {
      console.log("And finally...");
    })
    
  }

  onMount( () => {
    console.log("Pre getData");
    getData();
    console.log("Post getData");

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