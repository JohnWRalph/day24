<script lang="ts">
    import axios from "axios";
    let avatar, fileinput;

    // image uploader
    const onFileSelected = (e) => {
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e) => {
            avatar = e.target.result;
            console.log(avatar)
            
        };
    };

    //intiliaze properties
    let name: string = "";
    let platform: string = "";
    let releaseYear: number;
    let genre: string = "";
    let esrb: string = "";
    let isGood: boolean = false;
    let imageURL: File;

    //submit form button function
    async function submitForm() {
        const result = await axios.post("http://localhost:3002/videogame", {
            name: name,
            platform: platform,
            releaseYear: releaseYear,
            genre: genre,
            esrb: esrb,
            isGood: isGood,
            imageURL: avatar,
        });
        console.log(result);
    }
</script>

<input bind:value={name} type="text" placeholder="Name" />
<input bind:value={platform} type="text" placeholder="Platform" />
<input bind:value={releaseYear} type="number" placeholder="ReleaseYear" />
<input bind:value={genre} type="text" placeholder="Genre" />
<input bind:value={esrb} type="text" placeholder="ESRB Rating" />
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

    <img
        class="upload"
        src="https://static.thenounproject.com/png/625182-200.png"
        alt=""
        on:click={() => {
            fileinput.click();
        }}
    />
    <div
        class="chan"
        on:click={() => {
            fileinput.click();
        }}
    >
      
    </div>
    <input
        style="display:none"
        type="file"
        accept=".jpg, .jpeg, .png"
        on:change={(e) => onFileSelected(e)}
        bind:this={fileinput}
    />
</div>

<button on:click={async () => await submitForm()}> submit</button>

<style>
    .imageUploadContainer{
        display:flex;
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
