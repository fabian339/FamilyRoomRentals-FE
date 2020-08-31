<template>
    <v-container>
        <v-row class="text-center">
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
                <v-progress-circular
                    v-if="loadingContent"
                    color="green"
                    :size="100"
                    :width="15"
                    indeterminate
                ></v-progress-circular>
                <v-carousel v-if="!loadingContent" class="RoomImages">
                    <v-carousel-item
                        v-for="(image,i) in room.images"
                        :key="i"
                        :src="image"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
            </v-col>
            <v-col
                class="mb-5"
                cols="12"
                style="marginTop: -30px"
            >
            <h2>{{room.title}} - ${{room.price}}/month</h2>
            <div style="width: 80%; margin: auto">{{room.description}}</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

  export default {
    computed: {
        ...mapState([
            'room',
            'loadingContent'
        ]),
    },
    methods:{
        ...mapActions([                  // Add this
            'setRoom'
        ])
    },
    created(){
        this.setRoom(this.$route.params.id)
    }

  }
</script>

<style>
.RoomImages{
    width: 80%;
    margin: auto 10%;
}
</style>v-row>