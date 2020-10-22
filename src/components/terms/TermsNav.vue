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
                <span>Communications</span>
            </v-btn>

            <v-btn class="termsBtn" to="/about" text>
                <span>Privacy Basics</span>
            </v-btn>
        </div>
    </div>
</template>

<style scoped>
    #navContainer{
        /* background-color: #c2d29c; */
        /* margin: -12px 0px -38px 0px; */
        /* height: 100%; */
        padding: 50px;
        /* top: 0; */
        /* border: 0; */
        /* position: absolute; */
        /* left: 0; */
        /* width: 25%; */
    }
    #items{
        display: grid;
    }
    .termsBtn{
        color: #447273;
        margin: 5px 0px;
    }

</style>