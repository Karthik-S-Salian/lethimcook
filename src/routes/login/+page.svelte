<script lang="ts">
    export let data;
    export let form;

    console.log("form", form);

    if (form?.isLogin) data.login = true;
</script>

{#if form?.incorrect}
    <p class="error">Invalid credentials!</p>
{/if}
{#if form?.exists}
    <p class="error">User already exists login instead</p>
{/if}
<form action={data.login ? "?/signin" : "?/signup"} method="POST">
    {#if !data.login}
        <div>
            <label for="name">name</label>
            <input type="text" id="name" name="name" required />
        </div>
    {/if}

    <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required />
    </div>

    <div>
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            name="password"
            minlength="2"
            required
        />
    </div>

    <button>Submit</button>
</form>

{#if data.login}
<p>Dont have an account <a href="/login">sign in</a></p>
{:else}
<p>Already have an account <a href="?login=true">login</a></p>
{/if}

<style>
    :global(main) {
        display: grid;
        place-items: center;
        width: max-content;
    }

    form {
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
        padding: 2rem 0;
    }

    input {
        aspect-ratio: 12;
        border: none;
        border-radius: 5px;
    }

    form div {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap:.5rem;
    }

    form button {
        margin-top: 1.5rem;
        width: 100%;
        padding: 0.5rem;
    }
</style>
