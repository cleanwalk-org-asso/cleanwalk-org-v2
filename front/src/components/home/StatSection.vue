<template>
    <section class="container">
        <div class="left">
            <div class="nb-cleanwalks">
                <strong>2091</strong>
                <span>Cleanwalks organisées</span>
            </div>
            <svg width="315" height="315" viewBox="0 0 315 315" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M16.8036 120.751C-6.83617 147.767 -4.09919 188.832 22.9168 212.472C49.9332 236.112 90.9974 233.374 114.637 206.358C90.9974 233.374 93.734 274.439 120.75 298.079C147.767 321.719 188.831 318.982 212.471 291.966C236.111 264.949 233.374 223.885 206.358 200.245C233.374 223.885 274.438 221.148 298.078 194.132C321.718 167.116 318.981 126.052 291.965 102.412C264.948 78.7714 223.884 81.5083 200.244 108.525C223.884 81.5083 221.148 40.4445 194.131 16.8044C167.115 -6.8354 126.051 -4.09884 102.411 22.9176C78.7706 49.934 81.508 90.9982 108.524 114.638C81.508 90.9982 40.4437 93.7348 16.8036 120.751Z"
                    fill="#E1F4F8" />
            </svg>
            <img src="../../assets/megots.webp" alt="mégots">
            <div class="nb-persons">
                <strong>62 730</strong>
                <span>citoyens mobilisés</span>
            </div>
        </div>
        <div class="right">
    
        </div>
    </section>
</template>

<style lang="scss" scoped>

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10rem;
    margin-bottom: 5rem;

}

.left {
    max-width: 602px;
    position: relative;

    svg {
        position: absolute;
        top: -27%;
        left: -25%;
    }

    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 1;

        strong {
            font-size: 2.5rem;
            color: var(--color-primary);
            font-size: 3rem;
            font-weight: 900;
            line-height: 2.375rem;
        }

        span {
            color: var( --text-color-secondary);
            font-size: 1.25rem;
            font-style: normal;
            font-weight: 500;
            line-height: 3rem;
        }
    }

    .nb-cleanwalks {
        top: -2%;
        left: -15%;
    }

    .nb-persons {
        bottom: -15%;
        right: -15%;
        width: 16.25rem;
        height: 16.25rem;
        background-color: #E1F4F8;
        border-radius: 999px;
    }

}
</style>