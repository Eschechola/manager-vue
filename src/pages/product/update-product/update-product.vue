<template>
  <h1>UpdateProduct</h1>
</template>

<script>
    export default{
        created() {
            alert(this.$props.id);
        },

        name: 'UpdateProduct',
        props: ['id'],
    }
</script>