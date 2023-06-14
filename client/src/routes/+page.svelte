<script lang="ts">
  import { onMount } from "svelte";
  import FileList from "./file-list.svelte";
  import Delimiters from "./delimiters.svelte";
  import Patterns from "./patterns.svelte";
  import FileSelect from "./file-select.svelte";
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

  let delims = '-. ';

</script>


<h1>File List Renamer</h1>

<FileSelect />

<Delimiters bind:defaultDelims={delims}></Delimiters>

<Patterns></Patterns>

<!-- redraw the list if the delims change -->
{#key delims}
  <FileList delims={delims} fileList={fileList}/>
{/key}