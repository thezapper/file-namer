<script lang="ts">
  import { onMount } from "svelte";
  import Entry from "./entry.svelte";

  let fileList: string[] = [];

  async function getData()
  {
    let response = await fetch( "http://127.0.0.1:3000/hello", {mode:"cors", headers: { "Content-Type": "application/json" } } );
    try
    {
      let info = await response.json();
      fileList = info.files;
      console.log(info);
    } catch(e)
    {
      console.log(e);
    }
  }

  onMount(async() => {
    getData();
  })

</script>

<h1>File List Renamer</h1>

<div>Tokeniser Characters</div>
<div>' ' . _</div>

<div>
  {#each fileList as  name, i}
    
  <Entry idx={i+1} fileName={name} />
    
	{/each}
</div>