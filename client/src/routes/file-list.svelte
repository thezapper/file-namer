<script lang="ts">
    import Entry from "./entry.svelte";

    export let delims: string;
    export let fileList: string[];
</script>

<div>
  {#each fileList as  name, i}
    
    <Entry idx={i} fileName={name} delims={delims}/>
    
	{/each}
</div>