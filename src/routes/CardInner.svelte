<script lang="ts">
    export let rank: Rank;
    export let icon: string | Required<IconifyIcon> | null;
    export let color: string;
    export let fontSize: number;

    import Icon, { type IconifyIcon } from '@iconify/svelte';
    import type { Rank } from '../modules/cardGame';

    function getInnerUI() {
        switch(rank) {
            case "Ace": return {n: 1}
            case "Two": return {n: 2}
            case "Three": return {n: 3}
            case "Four": return {n: 4}
            case "Five": return {n: 5}
            case "Six": return {n: 6}
            case "Seven": return {n: 7}
            case "Eight": return {n: 8}
            case "Nine": return {n: 9}
            case "Ten": return {n: 10}
            default: return {n: 0}
        }
    }
    const {n} = getInnerUI()
</script>

<div style={`color: ${color};`} class="container">
    {#if rank === "Jack"}
    <p style={`font-size: ${fontSize}px`}>J</p>
    {:else if rank === "Queen"}
    <p style={`font-size: ${fontSize}px`}>Q</p>
    {:else if rank === "King"}
    <p style={`font-size: ${fontSize}px`}>K</p>
    {:else}
        {#each {length: n} as _, i}
            <div class="icon-container" data-n={n}>
                <Icon icon={icon} color={color} width="100%" height="100%"  />
            </div>
        {/each}
    {/if}
</div>

<style>
    p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        grid-column: 1 / span 3;
        grid-row: 1 / span 12;
        place-self: center;
        margin: 0;
    }

    .container {
        display: grid;
        font-size: 100%;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(12, 1fr);
        width: 100%;
        height: 100%;
    }

    .icon-container[data-n="1"]:nth-child(1) {
        grid-column: 2 / 3;
        grid-row: 5 / 9;
    }

    .icon-container:is([data-n="2"], [data-n="3"]):nth-child(1) {
        grid-column: 2 / 3;
        grid-row: 1 / 4;
    }

    .icon-container:is([data-n="2"], [data-n="3"]):nth-child(2) {
        grid-column: 2 / 3;
        grid-row: -4 / -1;
        transform: rotate(180deg);
    }

    .icon-container[data-n="3"]:nth-child(3) {
        grid-column: 2 / 3;
        grid-row: 5 / 9;
    }

    .icon-container:is([data-n="4"], [data-n="5"], [data-n="6"], [data-n="7"]):nth-child(1) {
        grid-column: 1 / span 1;
        grid-row: 1 / span 3;
    }

    .icon-container:is([data-n="4"], [data-n="5"], [data-n="6"], [data-n="7"]):nth-child(2) {
        grid-column: 3 / span 1;
        grid-row: 1 / span 3;
    }

    .icon-container:is([data-n="4"], [data-n="5"], [data-n="6"], [data-n="7"]):nth-child(3) {
        grid-column: 1 / span 1;
        grid-row: -4 / span 3;
        transform: rotate(180deg);
    }

    .icon-container:is([data-n="4"], [data-n="5"], [data-n="6"], [data-n="7"]):nth-child(4) {
        grid-column: 3 / span 1;
        grid-row: -4 / span 3;
        transform: rotate(180deg);
    }

    .icon-container[data-n="5"]:nth-child(5) {
        grid-column: 2 / span 1;
        grid-row: 5 / span 4;
    }

    .icon-container:is([data-n="6"], [data-n="7"]):nth-child(5) {
        grid-column: 1 / span 1;
        grid-row: 5 / span 4;
    }

    .icon-container:is([data-n="6"], [data-n="7"]):nth-child(6) {
        grid-column: 3 / span 1;
        grid-row: 5 / span 4;
    }

    .icon-container:is([data-n="6"], [data-n="7"]):nth-child(7) {
        grid-column: 2 / span 1;
        grid-row: 3 / span 4;
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(1) {
        grid-column: 1 / span 1;
        grid-row: 1 / span 3;
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(2) {
        grid-column: 3 / span 1;
        grid-row: 1 / span 3;
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(3) {
        grid-column: 1 / span 1;
        grid-row: 4 / span 3;
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(4) {
        grid-column: 3 / span 1;
        grid-row: 4 / span 3;
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(5) {
        grid-column: 1 / span 1;
        grid-row: 7 / span 3;
        transform: rotate(180deg);
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(6) {
        grid-column: 3 / span 1;
        grid-row: 7 / span 3;
        transform: rotate(180deg);
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(7) {
        grid-column: 1 / span 1;
        grid-row: 10 / span 3;
        transform: rotate(180deg);
    }

    .icon-container:is([data-n="8"], [data-n="9"], [data-n="10"]):nth-child(8) {
        grid-column: 3 / span 1;
        grid-row: 10 / span 3;
        transform: rotate(180deg);
    }

    .icon-container:is([data-n="9"], [data-n="10"]):nth-child(9) {
        grid-column: 2 / span 1;
        grid-row: 3 / span 3;
    }

    .icon-container:is([data-n="10"]):nth-child(10) {
        grid-column: 2 / span 1;
        grid-row: -6 / span 3;
        transform: rotate(180deg);
    }


</style>