<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";

    let videogames = [];
    //on mount, get video games already stored on server
    async function getVideogames() {
        const result = await axios.get("http://localhost:3002/videogame");
        return result.data;
    }

    onMount(async function () {
        videogames = await getVideogames();
    });
</script>

<div class="gameCollection">
    {#each videogames as videogame}
        <div class="gameContainer">
            Title: {videogame.name}
            <br />
            Platform: {videogame.platform}
            <br />
            Release Year: {videogame.releaseYear}
            <br />
            Genre: {videogame.genre}
            <br />
            ESRB Rating: {videogame.esrb}
            <br />
            Good: {videogame.isGood}
            <br />
            {#if videogame.image}
                <img src={videogame.image} alt="pandas" />
            {:else}
            "No image"
            {/if}
        </div>
    {/each}
</div>

<style>
    img {
        height: 150px;
        width: 150px;
    }
    .gameContainer {
        border: 1px solid black;
        margin: 10px;
    }

    .gameCollection {
        display: flex;
    }
</style>
