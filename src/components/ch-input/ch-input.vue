<template>
    <input :placeholder=placeholder :type=type />
</template>

<style src="./ch-input.css" />

<script>

export default {
    name: 'ChInput',
    props: ['placeholder', 'type']
}

</script>