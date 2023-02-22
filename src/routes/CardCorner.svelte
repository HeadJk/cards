<script lang="ts">
    export let rank: Rank;
    export let icon: string | Required<IconifyIcon> | null;
    export let color: string;
    export let fontSize: number;

    import Icon, { type IconifyIcon } from '@iconify/svelte';
    import type { Rank } from '../modules/cardGame';

    function getRankUI(rank: Rank) {
        switch(rank) {
            case "Ace": return {label: "A"}
            case "Two": return {label: "2"}
            case "Three": return {label: "3"}
            case "Four": return {label: "4"}
            case "Five": return {label: "5"}
            case "Six": return {label: "6"}
            case "Seven": return {label: "7"}
            case "Eight": return {label: "8"}
            case "Nine": return {label: "9"}
            case "Ten": return {label: "10"}
            case "Jack": return {label: "J"}
            case "Queen": return {label: "Q"}
            case "King": return {label: "K"}
        }
    }

    const rankUI = getRankUI(rank)
</script>

<div>
    <div class="card-number-container"><span style={`font-size: ${fontSize}px; color: ${color}`}>{rankUI.label}</span></div>
    <Icon icon={icon} color={color} width="100%" height="25%"  />
</div>

<style>
    .card-number-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 100%;
        height: 75%;
    }
</style>