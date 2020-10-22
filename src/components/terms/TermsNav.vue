<template>
    <div id="navContainer">
        <div id="items">
            <v-btn class="termsBtn" text>
                <span>Our Service</span>
            </v-btn>

            <v-btn class="termsBtn" to="/signup" text>
                <span>The Commitments</span>
            </v-btn>

            <v-btn class="termsBtn" to="/login" text>
                <span>Type of User</span>
            </v-btn>
            
            <v-btn class="termsBtn" to="/about" text>
                <span>Agreements</span>
            </v-btn>
            <v-btn class="termsBtn" to="/about" text>
                <span>Privacy Basics</span>
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
    #navContainer{
        background-color: #c2d29c;
        /* margin: -12px; */
        height: 450px;
        padding: 50px; 
    }
    #items{
        display: grid;
    }
    .termsBtn{
        color: #447273;
        margin: 5px 0px;
    }

</style>