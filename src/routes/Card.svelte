<script lang="ts">
    export let width = 128;
    export let suit: Suit;
    export let rank: Rank;

	import CardCorner from './CardCorner.svelte';
	import CardInner from './CardInner.svelte';
    import type { Suit, Rank } from "../modules/cardGame"
	import { getIcon, type IconifyIcon } from '@iconify/svelte';

    function getSuitUI(suit: Suit) {
        switch(suit) {
            case "Spade": return {icon: getIcon("mdi:cards-spade"), color: "black"}
            case "Club": return {icon: getIcon("mdi:cards-club"), color: "black"}
            case "Diamond": return {icon: getIcon("mdi:cards-diamond"), color: "red"}
            case "Heart": return {icon: getIcon("mdi:cards-heart"), color: "red"}
        }
    }

    const suitUI = getSuitUI(suit)
    $: cornerFontSize = (width / 6)
    $: innerFontSize = (width - (width / 4))
</script>

<div class="card" style="width: {width}px; padding: {width/40}px;">
    <div class="card-top-left">
        <CardCorner fontSize={cornerFontSize} color={suitUI.color} icon={suitUI.icon} rank={rank} />
    </div>
    <div class="card-inner"><CardInner fontSize={innerFontSize} color={suitUI.color} icon={suitUI.icon} rank={rank} /></div>
    <div class="card-bottom-right">
        <CardCorner fontSize={cornerFontSize} color={suitUI.color} icon={suitUI.icon} rank={rank} />
    </div>
</div>

<style>
    .card {
        display: grid;
        box-sizing: border-box;
        grid-template-columns: 1fr 6fr 1fr;
        grid-template-rows: repeat(10, 1fr);
        overflow: hidden;
        background-color: #f2eff0;
        aspect-ratio: 2/3;
        border-top-left-radius: 10% 7%;
        border-top-right-radius: 10% 7%;
        border-bottom-left-radius: 10% 7%;
        border-bottom-right-radius: 10% 7%;
        transition: all 0.1s ease-out;
    }

    .card:hover {
        background-color: #fff;
        box-shadow: 0 4px 16px 4px rgba(8, 2, 46, 0.3);
        transform: translateY(-4px);
        cursor: pointer;
    }

    .card-top-left {
        grid-column-start: 1;
        grid-column-end: 2;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .card-bottom-right {
        grid-column-start: 3;
        grid-row-start: 9;
        grid-row-end: 11;
        transform: rotate(180deg);
    }

    .card-inner {
        grid-column-start: 2;
        grid-column-end: 3;
        grid-row-start: 2;
        grid-row-end: 10;
        width: 100%;
        height: 100%;
    }
</style>