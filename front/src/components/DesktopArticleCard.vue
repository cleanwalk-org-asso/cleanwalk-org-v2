<template>
    <div class="card">
        <div class="prewiew-picture">
            <img src="../../assets/img/mainArticle.png" alt="article.title">
        </div>
        <div class="text-container">
            <h3>Cleanterview #5 - "Osez agir à votre échelle", Justine, fondatrice de Jusedda</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti accusamus recusandae autem quos, omnis reprehenderit ab officia! Deleniti nesciunt facilis autem repellendus adipisci dicta, iusto velit animi laudantium quasi dolorum?</p>
        </div>
    </div>

</template>

<style  lang="scss" scoped>
.card {
    margin: 15rem 0;
    border-radius: 2rem;
    background-color: #E1F4F8 ;
    display: flex;
    width: 50vw;

    .prewiew-picture {
        img {
            position: relative;
            top: -10rem;
            left: -10rem;
            border-radius: 99999rem;
            width: 20rem;
            height: 20rem;
            object-fit: cover;
        }
    }

    .text-container {
        position: relative;
        left: -10rem;
        padding: 2rem 0;
        h3 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        p {
            font-size: 1.5rem;
            font-weight: 400;
        }
    }


}
</style>