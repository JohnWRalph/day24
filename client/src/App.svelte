<script lang="ts">
    import UserForm from "./components/UserForm.svelte";
    import UserList from "./components/UserList.svelte";

    //toggles to display either the input form or the list of games
    let displayForm: boolean = true;
    function changeDisplay() {
        console.log(displayForm)
        displayForm = !displayForm;
    }
</script>

<main>
    <button on:click={changeDisplay}>Change display</button><br>
    {#if displayForm}
        <UserForm />
    {:else}
        <UserList />
    {/if}
</main>

<style>
</style>
