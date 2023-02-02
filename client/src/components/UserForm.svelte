<script lang="ts">
    import axios from "axios";

    // image uploader
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
        };
    };

    //intiliaze properties
    let name: string = "";
    let platform: string = "";
    let releaseYear: number;
    let genre: string = "";
    let esrb: string = "";
    let isGood: boolean = false;
    let image: File;
    let errorMessage: string;
    let avatar, fileinput;

    //submit form button function
    async function submitForm() {
        const result = await axios.post("http://localhost:3002/videogame", {
            name: name,
            platform: platform,
            releaseYear: releaseYear,
            genre: genre,
            esrb: esrb,
            isGood: isGood,
            image: avatar,
        });
        errorMessage = result.data.error;
        console.log("Error Message:", errorMessage);
    }
</script>

<!-- display error message if wrong input was made  -->
<!-- svelte-ignore empty-block -->
{#if errorMessage}
    <h1>{errorMessage}</h1>
{:else}{/if}

<!-- Input form -->
Title: <input bind:value={name} type="text" placeholder="Title" /><br />

Platform(s):
<label
    ><input type="checkbox" bind:group={platform} value={"Xbox"} /> Xbox</label
>
<label
    ><input type="checkbox" bind:group={platform} value={"Playstation"} /> Playstation</label
>
<label
    ><input type="checkbox" bind:group={platform} value={"Switch"} /> Switch</label
>
<label><input type="checkbox" bind:group={platform} value={"PC"} /> PC</label>
<label
    ><input type="checkbox" bind:group={platform} value={"Other"} /> Other</label
><br />
Release Year:
<input bind:value={releaseYear} type="number" placeholder="ReleaseYear" /><br />
Genre(s):
<label
    ><input type="checkbox" bind:group={genre} value={"Action"} /> Action</label
>
<label
    ><input type="checkbox" bind:group={genre} value={"Adventure"} /> Adventure</label
>
<label><input type="checkbox" bind:group={genre} value={"FPS"} /> FPS</label>
<label><input type="checkbox" bind:group={genre} value={"Other"} /> Other</label
><br />
<!-- <input bind:value={genre} type="text" placeholder="Genre" /> -->

ESRB Rating:
<label>
    <input type="radio" bind:group={esrb} name="E" value={"E: Everyone"} />
    E: Everyone
</label>
<label>
    <input type="radio" bind:group={esrb} name="M" value={"M: Mature"} />
    M: Mature
</label>

<br />
Is Good?:<input bind:checked={isGood} type="checkbox" />
<div class="imageUploadContainer">
    <h1>Upload Image:</h1>

    {#if avatar}
        <img class="avatar" src={avatar} alt="d" />
    {:else}
        <img
            class="avatar"
            src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-512.png"
            alt=""
        />
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <img
        class="upload"
        src="https://static.thenounproject.com/png/625182-200.png"
        alt=""
        on:click={() => {
            fileinput.click();
        }}
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        class="chan"
        on:click={() => {
            fileinput.click();
        }}
    />
    <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
    />
</div>

<button on:click={async () => await submitForm()}> Submit</button>

<style>
    .imageUploadContainer {
        display: flex;
        align-items: center;
    }
    .upload {
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        height: 51px;
        width: 51px;
        cursor: pointer;
    }
    .avatar {
        display: flex;
        height: 200px;
        width: 200px;
    }
</style>
