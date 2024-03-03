<script>
    import ThemeToggler from "$lib/components/custom/ThemeToggler.svelte";
    import { CookieIcon, SearchIcon } from "lucide-svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import Button from "$lib/components/ui/button/button.svelte";
</script>

<header class="flex align-middle justify-between px-[5%] py-4 bg-accent/60">
    <span class="flex gap-2 align-middle">
        <CookieIcon />
        <h1 class="text-xl font-bold">LetHimCook</h1>
    </span>

    <div class="flex align-middle w-full justify-center">
        <Input type="text" class="max-w-[45%] rounded-xl" />
        <Button class="p-2">
            <SearchIcon />
        </Button>
    </div>

    <div>
        <ThemeToggler />
    </div>
</header>


<main class="px-[5%] py-4">

    <slot/>
</main>

