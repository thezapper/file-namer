<script lang="ts">
    import Entry from "./entry.svelte";
    import { fileNames } from './stores';

    export let delims: string;
    let fileList: string[];
    // export let addMode: boolean;

    // $:
    // console.log("addMode:", addMode);

    fileNames.subscribe( (newNames) => {
      fileList = newNames;
    })
</script>

{#key fileList}
<div>
  {#each fileList as  name, i}
    
    <Entry idx={i} fileName={name} {delims} />
    
	{/each}
</div>
{/key}