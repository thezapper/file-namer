<script lang="ts">
  import { onMount } from "svelte";

  let theWindow: any;

  let fileElem: HTMLInputElement | null;
  onMount( () => {
    const fileSelect = document.getElementById("fileSelect");
    fileElem = document.getElementById("fileElem") as HTMLInputElement;
    
    

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

    function openDlg(e: MouseEvent) 
    {
      if (fileElem) 
      {
        fileElem.onchange = () => 
        {
          let files = Array.from(fileElem.files);
          console.log(files);
        }
        fileElem.click();
        console.log(fileElem.files);
      }
    };

    async function getDir() {
      const dirHandle = await window.showDirectoryPicker();
      const relativePaths = await dirHandle.resolve(dirHandle);

      console.log(relativePaths);

      return dirHandle;
      // run code for dirHandle
    }

    let handleClick = () => {
      getDir()
      .then( (val: FileSystemDirectoryHandle) => {
        
        let dirName = val.name;
        val.getDirectoryHandle(dirName)
        .then( (res: FileSystemDirectoryHandle) =>{
          console.log(val, res);
        })
        .catch( (e) => {
          console.log(e);
        })
      })
      .catch( (e) => {
        console.log(e);
      })
    }
      
</script>

<button 
  on:click={ (evt) => openDlg(evt)} > 
  Click to browse for folder
</button>

<input type="file" id="fileElem" class="hidden" />

<style>
  .hidden {
   display: none;
  }

</style>