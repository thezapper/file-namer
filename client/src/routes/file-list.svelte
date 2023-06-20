<script lang="ts">
    import Entry from "./entry.svelte";

    export let delims: string;
    export let fileList: string[];
    export let addMode: boolean;

    $:
    console.log("addMode:", addMode);
</script>

<div>
  {#each fileList as  name, i}
    
    <Entry idx={i} fileName={name} delims={delims} />
    
	{/each}
</div>