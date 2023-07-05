<script lang="ts">
  import { onMount } from "svelte";
  import { open } from '@tauri-apps/api/dialog';
  import { fileNames } from './stores';

  // let theWindow: any;
  // let fileElem: HTMLInputElement | null;

  //let fileNames: string[];
  onMount( () => {

    })

    function extractFileName(path: string) : string
    {
      let lastSlash = path.lastIndexOf('\\');
      if (lastSlash > -1)
        return path.substring(lastSlash + 1);

      return "ERROR";
    }

    async function openDlg(e: MouseEvent) 
    {
      const selected = await open({
        directory:false,
        multiple: true
      });

      let onlyNames = new Array<string>();

      if (Array.isArray(selected))
      {
        selected.forEach( (val) => {
          onlyNames.push(extractFileName(val))
        })
      }

      fileNames.set(onlyNames);
      
      console.log(fileNames);
    };

      
</script>

<button 
  on:click={ (evt) => openDlg(evt)} > 
  Select files
</button>


<style>
 

</style>