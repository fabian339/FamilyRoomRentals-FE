<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        @click:outside="outsideClick"
        >
            <v-card>
                <v-card-title>
                <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                <v-container class="text-center">
                        <v-text-field
                            label="Room Title"
                            v-model="room.title"
                            :error-messages="errors.title"
                        ></v-text-field>
                        <label> Location </label>
                        <v-text-field
                            label="Street1"
                            v-model="room.location.street1"
                            :error-messages="errors.street1"
                        ></v-text-field>
                        <v-text-field
                            ref="street2"
                            label="Street2"
                            v-model="room.location.street2"
                            :error-messages="errors.street2"
                        ></v-text-field>
                        <v-text-field
                            ref="city"
                            label="City"
                            v-model="room.location.city"
                            :error-messages="errors.city"
                        ></v-text-field>
                        <v-text-field
                            ref="state"
                            label="State/Province/Region"
                            v-model="room.location.state"
                            :error-messages="errors.state"
                        ></v-text-field>
                        <v-text-field
                            ref="zipCode"
                            type="number"
                            v-model="room.location.zipCode"
                            :error-messages="errors.zipCode"
                        ></v-text-field>
                        <v-autocomplete
                            ref="country"
                            v-model="room.location.country"
                            :items="countries"
                            label="Country"
                            :error-messages="errors.country"
                        ></v-autocomplete>
                        
                        <label> Description </label>
                        <v-spacer></v-spacer>

                        <v-textarea
                            name="input-7-1"
                            filled
                            v-model="room.description"
                            :error-messages="errors.description"   
                        ></v-textarea>   

                        <label> Property Rules </label>
                        <v-row justify="center">
                            <v-col cols="6" style="display: inline-flex;" >
                                <v-text-field
                                    ref="rule"
                                    label="Example: No Pets"
                                    outlined
                                    v-model="tempRule"
                                ></v-text-field>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn 
                                            fab 
                                            color="primary"
                                            dark
                                            @click="addRule"
                                            v-bind="attrs"
                                            v-on="on">
                                                <v-icon dark>mdi-plus</v-icon>
                                        </v-btn>
                                    </template>
                                        <span>Add Rule</span>
                                    </v-tooltip>
                            </v-col>
                        </v-row>
                        <v-row style="margin-top: -35px; margin-bottom: 30px;" justify="center">
                            <div v-for="(item, index) in room.propertyRules" :key="index +10">
                                <v-chip
                                    class="ma-2"
                                    close
                                    @click:close="room.propertyRules.splice(index, 1)"
                                >
                                    {{item}}
                                </v-chip>                
                            </div>
                        </v-row>

                        <label> Property Price </label>

                        <v-row justify="center">
                            <v-col cols="4">
                                <v-text-field
                                    ref="price"
                                    type="number"
                                    label="Price"
                                    full-width
                                    prefix="$"
                                    v-model="room.price"
                                    suffix="/month"
                                    :error-messages="errors.price"   
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <label> Property Images </label>
                        <div>
                            <div style="margin-top: 20px">
                                    <v-icon large color="green darken-2">mdi-camera</v-icon>
                                <input 
                                    type="file" 
                                    prepend-icon="mdi-camera" 
                                    accept="image/*" 
                                    :disabled="(6 - room.images.length) === 0" 
                                    @change="uploadImage"
                                >
                            </div>
                            <div id="imgContainer">
                                <small>({{6 - room.images.length}} images reminding)</small>
                                <v-row no-gutters>
                                    <v-col v-for="(image, index) in room.images" :key="image.street1">
                                        <div>
                                            <img :src="image" alt="img" width="150" height="100">
                                            <div class="my-2" @click="room.images.splice(index, 1)">
                                                <v-btn small color="warning">Remove</v-btn>
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.stop="show=false">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="saveUpdatedRoomData">Save</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
import {validateCreateRoom} from '../../store/validators'
import {mapActions} from 'vuex'
export default {
    name: "EditRoomForm",
    props: {
        value: Boolean
    },
    computed: {
        show: {
            get () {
                return this.value
            },
            set (value) {
                if (!value) {
                    this.$emit('input', value)
                }
            }
        }
    },
    data(){
        return{
            countries: ['Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua &amp; Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia', 'Bosnia &amp; Herzegovina', 'Botswana', 'Brazil', 'British Virgin Islands', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Cape Verde', 'Cayman Islands', 'Chad', 'Chile', 'China', 'Colombia', 'Congo', 'Cook Islands', 'Costa Rica', 'Cote D Ivoire', 'Croatia', 'Cruise Ship', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Estonia', 'Ethiopia', 'Falkland Islands', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Polynesia', 'French West Indies', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyz Republic', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macau', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Mauritania', 'Mauritius', 'Mexico', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Namibia', 'Nepal', 'Netherlands', 'Netherlands Antilles', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Reunion', 'Romania', 'Russia', 'Rwanda', 'Saint Pierre &amp; Miquelon', 'Samoa', 'San Marino', 'Satellite', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'St Kitts &amp; Nevis', 'St Lucia', 'St Vincent', 'St. Lucia', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', "Timor L'Este", 'Togo', 'Tonga', 'Trinidad &amp; Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks &amp; Caicos', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Venezuela', 'Vietnam', 'Virgin Islands (US)', 'Yemen', 'Zambia', 'Zimbabwe'],
            room: {...this.$store.getters.contentRoom},
            tempRule: '',
            errors: {}
        }
    },
    created(){
        // const myRoom = this.contentRoom;
        // this.room = this.contentState.room;
    },
    methods: {
        ...mapActions([                  // Add this
            'updateRoom'
        ]),
        uploadImage(e){
            // console.log("Calling1..", e);
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => this.room.images.push(e.target.result);
        },
        addRule(){
            this.room.propertyRules.push(this.tempRule);
            this.tempRule = '';
        },
        saveUpdatedRoomData(e) {
            e.preventDefault();
            const {valid, errors} = validateCreateRoom(this.room);
            if(!valid) this.errors = errors;
            else this.updateRoom(this.room)
        },
        outsideClick(){
            this.room = this.contentRoom;
            // console.log("clickedOutsidesss")
        }

    },
    
}
</script>
<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
    }
</style>