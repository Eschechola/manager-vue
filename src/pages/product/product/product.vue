<template>
  <h1>Product</h1>
</template>

<script>
    export default{
        created() {
            alert(this.$props.id);
        },

        name: 'Product',
        props: ['id'],
    }
</script>