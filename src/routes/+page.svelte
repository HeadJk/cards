<script lang="ts">
    import { loadIcons } from "@iconify/svelte"
    import { onMount } from "svelte";
	import CardGame from "../modules/cardGame";
	import Card from "./Card.svelte";
    import { quintOut } from 'svelte/easing';
	import { crossfade, fade } from 'svelte/transition';

    loadIcons(["mdi:cards-spade", "mdi:cards-heart", "mdi:cards-club", "mdi:cards-diamond"])
    let playerNames = ["Jake Head", "Jenna Reid"]
    let zoom = 5;
    $: cardGame = new CardGame(playerNames.length)
    $: players = playerNames.map((name, i) => ({name, cards: cardGame.players[i].cards}))

	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

    let readyPromise: Promise<boolean>;
    onMount(() => {
        handleShuffle();
    });

    async function handleShuffle() {
        readyPromise = new Promise<boolean>((resolve) => {
            setTimeout(() => {
                cardGame.dealer.shuffle(cardGame.deck)
                cardGame = cardGame
                resolve(true)
            }, 1000)
        })
    }

    async function handleDeal() {
        const ready = await readyPromise;
        if(ready) {
            cardGame.deal(cardGame.players, 1)
            cardGame = cardGame;
        }
    }

    async function handleRestart() {
        cardGame = new CardGame(playerNames.length)
        players = playerNames.map((name, i) => ({name, cards: cardGame.players[i].cards}))
    }

    $: cardWidth = 18 * zoom;

</script>

<button on:click={handleShuffle}>Shuffle</button>
<button on:click={handleDeal}>Deal</button>
<button on:click={handleRestart}>Restart</button>
<label>
	<input type="range" bind:value={zoom} min=2 max=10>
</label>
<main>
    {#each players as player (player.name)}
    <div style={`min-width: ${cardWidth}px;`}>
        <p style="white-space: nowrap;">{player.name}</p>
        <section class="player-hand">
            {#each player.cards as card (card.suit + card.rank)}
                <div in:receive="{{key: (card.suit + card.rank)}}" out:send="{{key: (card.suit + card.rank)}}">
                    <Card width={cardWidth} suit={card.suit} rank={card.rank} />
                </div>
            {/each}
        </section>
    </div>
    {/each}
    <div>
        <p>Deck</p>
        <section class="deck">
            {#await readyPromise then ready}
                {#if ready}
                    {#each cardGame.deck.cards as card (card.suit + card.rank)}
                    <div in:receive="{{key: (card.suit + card.rank)}}" out:send="{{key: (card.suit + card.rank)}}">
                        <Card width={cardWidth} suit={card.suit} rank={card.rank} />
                    </div>
                    {/each}
                {/if}
            {/await}
        </section>
    </div>
</main>

<style>
    main {
        display: flex;
        flex-direction: row;
        gap: 16px;
        width: 100%;
    }

    .deck {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px;
        width: 100%;
    }

    .player-hand {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 16px;
    }

    :global(body) {
        background-color: rgb(0, 104, 0);
    }
</style>