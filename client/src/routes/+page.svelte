<script lang="ts">
  import "../styles.css";
  import { onMount } from "svelte";
  import FileList from "./file-list.svelte";
  import Delimiters from "./delimiters.svelte";
  import Patterns from "./patterns.svelte";
  import FileSelect from "./file-select.svelte";
  import axios from "axios";

  import { invoke } from '@tauri-apps/api/tauri';

  async function getData() {
    // const params = {
    //   mode: "cors",
    //   headers: { "Content-Type": "application/json" },
    // };

    // return axios
    //   .get("http://127.0.0.1:3000/list", params)
    //   .then((response) => {
    //       console.log("Promise resolved:");
    //       fileList = response.data.files;
    //     // console.dir(data);
    //   })
    //   .catch((err) => {
    //       console.log("Error:", err);
    //     })
    //     .finally(() => {
    //         console.log("And finally...");
    //       });
      }
      
    onMount(() => 
    {
      console.log("Page mounted:");

      if (window.__TAURI__ !== undefined)
      {
        invoke('my_custom_command', { msg: 'Hello!!!' })
      }
      else
      {
        getData();
      }
  });

  let delims = "-. ";
</script>

<div>
  <FileSelect />
</div>

<div class="comp-cont">
  <Delimiters bind:defaultDelims={delims} />
  <Patterns />
</div>

<!-- redraw the list if the delims change -->
{#key delims}
  <FileList {delims} />
{/key}
