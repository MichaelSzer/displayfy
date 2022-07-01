<script setup>

</script>

<template>
    <div class="style-container">
        <p id="style-title">Style</p>
        <div id="frame-colors">
            <p class="frame-color-option">White</p>
            <p class="frame-color-option">Red</p>
            <p class="frame-color-option">Violet</p>
        </div>
    </div>
</template>

<style>
#style-title {
    font-size: 2em;
    margin-bottom: 1em;
}

#frame-colors {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}

.frame-color-option {
    
}

.style-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: rgb(255, 228, 228);
}
</style>