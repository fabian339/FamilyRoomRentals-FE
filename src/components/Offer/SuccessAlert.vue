<template>
    <v-expand-x-transition>
        <v-alert 
            type="success"
            dark
            border="top"
            transition="scale-transition"
        >
        {{msg}}
        </v-alert>
    </v-expand-x-transition>
</template>

<script>
  export default {
    name: 'SuccessAlert',
    props: ['msg'] 
}
</script>