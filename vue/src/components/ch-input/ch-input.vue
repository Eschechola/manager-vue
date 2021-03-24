<template>
    <input 
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
        :placeholder=placeholder
        :type=type />
</template>

<style src="./ch-input.css" />

<script>

export default {
    name: 'ChInput',
    props: {
        value: String,
        placeholder: String,
        type: String
    },
}

</script>