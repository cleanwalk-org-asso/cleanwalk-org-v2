<script setup lang="ts">

defineProps({
    steps: {
        type: Array<String>,
        default: [
            '', '', '', ''
        ]
    },
    currentStep: {
        type: Number,
        default: 1
    },
    validatedStep: {
        type: Number,
        default: 0
    },
});

</script>

<template>

<div class="container">
    <ul class="progressbar">
        <li v-for="(step, index) in steps" :key="index"
            @click="() => {
                index <= validatedStep ? $emit('goToStep', index+1) : ''
            }"
            class="step"
            :class="{'active': index < currentStep, 'validated': index <= validatedStep }"
        >{{step}}</li>
    </ul>
</div>

</template>

<style lang="scss" scoped>
@use 'sass:math';
@import '../assets/main.scss';

.container {
  width: 100%;
}

.progressbar {
    counter-reset: step;

    li {
        list-style: none;
        display: inline-flex;
        flex-direction: column;
        justify-content: stretch;
        align-items: stretch;
        position: relative;
        text-align: center;
        cursor: pointer;
        color: rgba($color: $onBackground, $alpha: .5);
        z-index: 2;
        height: 5rem;
        transition: 0.25s;
        font-size: 0.9rem;
        
        &:before {
            content: counter(step);
            counter-increment: step;
            width: 2rem;
            height: 2rem;
            line-height : 1.8rem;
            border: 1px solid $onBackground-20;
            border-radius: 100%;
            display: block;
            text-align: center;
            font-size: 1rem;
            margin: 0 auto 0.5rem auto;
            background-color: $background;
            z-index: 2;
            transition: 0.25s;
        }
    
        &:after {
            content: "";
            position: absolute;
            width: 100%;
            height: 4px;
            background-color: $onBackground-20;
            top: 15px;
            left: 50%;
            z-index : -1;
            transition: 0.25s;
        }
        &.validated {
            color: $secondary;
        }

        &.validated:before{
            border: 2px solid  $secondary;
            color: $secondary;
        }

        &.validated:after {
            background-color: $secondary;
        }

        &.active {
          color: $primary;

        }
        &.active:before{
            border: 2px solid  $primary;
            color: $primary;
        }

        &.active:after {
            background-color: $primary;
        }

    }

    /* two items */
    li:first-child:nth-last-child(2),
    li:first-child:nth-last-child(2) ~ li {
        width: 50%;
    }

    /* three items */
    li:first-child:nth-last-child(3),
    li:first-child:nth-last-child(3) ~ li {
        width: 33.3333%;
    }

    /* four items */
    li:first-child:nth-last-child(4),
    li:first-child:nth-last-child(4) ~ li {
        width: 25%;
    }

    /* 5 items */
    li:first-child:nth-last-child(5),
    li:first-child:nth-last-child(5) ~ li {
        width: 20%;
    }
}

.progressbar li:last-child:after{
    content: none;
    background-color: transparent;
    width: 0;
    height: 0;
}


</style>