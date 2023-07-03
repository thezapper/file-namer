<script lang="ts">
  import { onMount } from "svelte";
  import { open } from '@tauri-apps/api/dialog';

  let theWindow: any;

  let fileElem: HTMLInputElement | null;
  onMount( () => {

    })

     
    async function openDlg(e: MouseEvent) 
    {
      const selected = await open({
        directory:false,
        multiple: true
      });

      console.log(selected);
    };

      
</script>

<button 
  on:click={ (evt) => openDlg(evt)} > 
  Click to browse for files
</button>

<input type="file" id="fileElem" class="hidden" />

<style>
  .hidden {
   display: none;
  }

</style>