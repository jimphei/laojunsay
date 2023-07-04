<script setup>
const props = defineProps({
    user: Object
});
</script>

<template>
    <h1>你好, {{ user.name }}，欢迎光临</h1>
</template>