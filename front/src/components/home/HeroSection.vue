<template>
    <section class="hero">
        <h1>
            <div>   
                La plateforme française
            </div>
            <div>
                qui centralise les ramassages citoyens de déchets !
            </div>
        </h1>
    </section>
</template>

<style lang="scss" scoped>
    .hero {
        margin-top: 88px;
        background-image: url('../../assets/home-banner.webp');
        height: 694px;
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-primary);
        display: flex;
        gap: 1rem;
        
    }

    h1 {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 6.8rem;

        div {
            text-shadow: 0px 4px 5.3px rgba(0, 0, 0, 0.08);
            font-family: "DM Sans";
            font-size: 48px;
            font-style: normal;
            font-weight: 900;
            background-color: var(--color-secondary);
            border-radius: 8px;
            line-height: 38px;
            padding: 10px;
            width: fit-content;
        }
    }
</style>