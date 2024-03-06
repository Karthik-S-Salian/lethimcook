<script lang="ts">
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema } from "./types";
    import {
        type SuperValidated,
        type Infer,
        superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";

    export let data: SuperValidated<Infer<FormSchema>>;

    const form = superForm(data, {
        validators: zodClient(formSchema),
        dataType:'json'
    });

    const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance class="max-w-[450px] m-auto">
    <Form.Field {form} name="title">
        <Form.Control let:attrs>
            <Form.Label>title</Form.Label>
            <Input {...attrs} bind:value={$formData.title} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="shortDescription">
        <Form.Control let:attrs>
            <Form.Label>Short Description</Form.Label>
            <Input {...attrs} bind:value={$formData.shortDescription} />
        </Form.Control>
        <Form.Description>used to show in main page</Form.Description>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="description">
        <Form.Control let:attrs>
            <Form.Label>description</Form.Label>
            <Input {...attrs} bind:value={$formData.description} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="ingredients">
        <Form.Control let:attrs>
            <Form.Label>ingredients</Form.Label>
            <Input {...attrs} bind:value={$formData.ingredients} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <Form.Field {form} name="instructions">
        <Form.Control let:attrs>
            <Form.Label>instructions</Form.Label>
            <Input {...attrs} bind:value={$formData.instructions} />
        </Form.Control>
        <Form.FieldErrors />
    </Form.Field>

    <input type="hidden" bind:value={$formData.id}>

    <Form.Button>Submit</Form.Button>
</form>
