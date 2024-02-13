<template>
    <nav class="nav">
        <ul class="container">
            <li>
                <a href="/">Home</a>
            </li>
            <li>
                <a href="/about">About</a>
            </li>
            <li>
                <a href="/contact">Contact</a>
            </li>
            <li>
                <a href="/login">Login</a>
            </li>
        </ul>
    </nav>

</template>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .nav {
        position: fixed;
        bottom: 0;
        width: 100%;

        .container {
            display: flex;
            justify-content: space-around;
            padding: 1rem;

            li {
                list-style: none;
                a {
                    text-decoration: none;
                    color: var(--text-secondary);
                    
                }
            }
        }

        
    }
</style>