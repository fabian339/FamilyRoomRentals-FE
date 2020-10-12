<template>
  <div id="form-container">
     <!-- <div id="sq-card-number"></div>
     <div id="sq-expiration-date"></div>
     <div id="sq-cvv"></div>
     <div id="sq-postal-code"></div>
     <button id="sq-creditcard" 
           onclick="onGetCardNonce(event)">Pay $1.00</button> -->
           <h1>Payment methods </h1>
   </div> 
</template>
<script>

export default {
    name: 'Checkout',
    components: { },
    data: () => {
        return{
            complete: false,
            number: false,
        }
    },
    methods: {
    },
}
</script>
<style scoped>


</style>