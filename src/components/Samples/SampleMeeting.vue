<template>
    <div :style="`margin: 10px; ${expanded ? 'width: 100%' : '' }`">
        <v-card
            :class="`mx-auto compressMeetingWrapper ${!expanded ? 'transitionOut' : ''}`"
            max-width="350"
            v-if="!expanded"
            color="#f4ffe9"
        >
            <div class="circle_holder" @click.stop="expanded = !expanded">
                <div class="top_circle"
                    :style="`
                        background-image: url(${meetingData.image});
                        background-size: cover`"
                >
                </div>
                <div>
                    <p
                        class="font text-center" 
                        style="font-size: 20px; margin: 25px"
                    >
                        <strong>
                            {{meetingData.mainText}}
                        </strong>
                    </p>
                </div>
            </div>
        </v-card>
        <v-card
            :class="`mx-auto ${expanded ? 'transitionOut' : ''}`"
            color="#f4ffe9"
            v-else
        >
            <div justify="center" class="extendedMeeting"  @click.stop="expanded = !expanded">
                <div class="meetingInfo">
                    <div style="width: 275px;">
                        <img 
                            :src="meetingData.image" 
                            alt="roomPhoto" 
                            width="150" 
                            height="100"
                            class="roomPhoto"
                        />
                        <p class="font">
                            In this meeting example, person A will meet with person B.
                        </p>
                    </div>
                    <div style="width: 275px;">
                        <h3>When: </h3>
                        <p class="font"> 
                            Meeting date, for example: 12/19/2022 at 11:00 Am
                        </p>
                    </div>
                    <div style="width: 275px;">
                        <h3>Where: </h3>
                        <div>
                            <v-icon 
                                class="openAddress" 
                                style="font-size: 60px;" 
                                large 
                                color="green darken-2"
                            >
                                mdi-map-marker
                            </v-icon>
                        </div>
                        <p class="font openAddress">
                            Meeting address, for example: 1000 5th Ave, New York, NY 10028
                        </p>
                    </div>
                </div>
                <div class="btn-spacing">
                <!-- <div v-if="!meetingData.processCanceled && !meetingData.offerCompleted"> -->
                    <!-- btn is not working yet. Make it cancell the meeting, send email to client, show warning, disable room -->
                    <v-btn 
                        style="margin: 5px 5px; color: #ffffff" 
                        small 
                        rounded
                        :disabled="true"
                        color="#d44d25"
                    >
                        Cancel Meeting
                    </v-btn> 
                    <v-btn 
                        style="margin: 5px 5px;" 
                        small 
                        rounded 
                        color="success"
                        :disabled="true"
                    >
                        Check-in Meeting
                    </v-btn> 
                    <v-btn 
                        style="margin: 5px 5px;" 
                        small 
                        rounded 
                        color="error" 
                        :disabled="true"
                    >
                        Delete Meeting
                    </v-btn>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
  // import store from '../store.js'
  // import axios from 'axios'
  export default {
    name: 'SampleMeeting',
    props: ['meetingData'],
    components: {

    },
    data: () => ({
        expanded: false,
    }),
}
</script>

<style scoped>
    .top_circle {
        border-top-left-radius: 10000px;
        border-top-right-radius: 10000px;
        border-top:1px solid gray;
        border-left:1px solid gray;
        border-right:1px solid gray;
        height:70%;
        /* position:relative; */
    }

    .top_circle div {
        text-align:center;
        vertical-align:bottom;
        position:absolute;
        bottom:-7.5px;
        width:100%;
    }

    .circle_holder {
        position:relative;
        height:350px;
    }

    .compressMeetingWrapper{
        border-top-right-radius: 50%;
        border-top-left-radius: 50%;  
    }

    .circle_holder:hover, .extendedMeeting:hover {
        border: 2px solid;
        border-color: rgb(76, 136, 108) !important;
        cursor: pointer;
    }

    .meetingInfo{
        align-items: center; 
        display: flex;
        padding: 10px;
        justify-content: center;
    }

    .transitionOut{
        transition: all 0.5s;
    }

    .openAddress:hover{
        cursor: pointer;
        color: blue;
        transform: scale(1.1);
    }

    .btn-spacing{
        padding: 15px 0;
    }

    .roomPhoto:hover{
        border: 3px solid;
        border-radius: 10%;
    }

</style>
