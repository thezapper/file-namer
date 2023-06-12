<script lang="ts">
  import { onMount } from "svelte";

  let fileElem: HTMLElement | null;
  onMount( () => {
    const fileSelect = document.getElementById("fileSelect");
    fileElem = document.getElementById("fileElem");
    
    fileSelect?.addEventListener(
      "click",
      (e) => {
        if (fileElem) {
          fileElem.click();

        }
        e.preventDefault(); // prevent navigation to "#"
      },
      false
      );
    })

    let openDlg = (e: MouseEvent) => {
      if (fileElem) {
          fileElem.click();
          console.log(fileElem.files);
        }
    }
      
</script>

<div on:click={(e) => openDlg(e)}> Click to browse for folder</div>

<input type="file" id="fileElem" class="hidden">

<style>
  .hidden {
   display: none;
  }

</style>