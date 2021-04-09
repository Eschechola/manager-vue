<template>
  <h1>Olá, {{ user.name.capitalize() }}</h1>
</template>

<script>
    export default{
        name: 'Dashboard',
        metaInfo: {
            title: 'Dashboard',
        },
        data: function () {
        return {
            user: JSON.parse(localStorage.getItem("user"))
        }
    },
    }
</script>