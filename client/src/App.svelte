<script lang="ts">
    import UserForm from "./components/UserForm.svelte";
    import VideogameList from "./components/VideogameList.svelte";
  

    //toggles to display either the input form or the list of games
    let displayForm: boolean = true;
    function changeDisplay() {
        displayForm = !displayForm;
    }
</script>



<main>
  
    <button on:click={changeDisplay}>Change display</button><br>
    {#if displayForm}
        <UserForm />
    {:else}
        <VideogameList />
    {/if}
</main>

<style>
 
</style>
