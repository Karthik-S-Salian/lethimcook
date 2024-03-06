<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    const filters = ["all","veg","non-veg","snacks","diet","lunch","healthy","drinks"]
</script>

<div class="flex gap-2 overflow-x-clip">
    {#each filters as filter}
        <Button>
            {filter}
        </Button>
    {/each}
</div>