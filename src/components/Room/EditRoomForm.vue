<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        @click:outside="closeDialog"
        >
            <v-card>
                <v-card-title>
                <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-container class="text-center" style="margin-bottom: -110px;">
                        <form>
                            <v-text-field
                                name="title"
                                v-model="title"
                                label="Room Title"
                                placeholder="Special Room Available in the NYC Area"
                                :error-messages="errors.title"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <label> Location </label>
                            <v-text-field
                                name="street1"
                                v-model="location.street1"
                                label="Street1"
                                placeholder="76 Columbus St"
                                :error-messages="errors.street1"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="street2"
                                v-model="location.street2"
                                label="Street2"
                                placeholder="Apt: 3b"
                                :error-messages="errors.street2"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="city"
                                v-model="location.city"
                                label="City"
                                placeholder="Brooklyn"
                                :error-messages="errors.city"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="state"
                                v-model="location.state"
                                label="State/Province/Region"
                                placeholder="NY"
                                :error-messages="errors.state"   
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-text-field
                                name="zipCode"
                                v-model="location.zipCode"
                                label="ZIP / Postal Code"
                                type="number"
                                placeholder="75155"
                                :error-messages="errors.zipCode"
                                @keydown="onKeyboardPressed"
                            ></v-text-field>
                            <v-autocomplete
                                name="country"
                                v-model="location.country"
                                :items="countries"
                                label="Country"
                                placeholder="Select..."
                                :error-messages="errors.country"   
                                @click="onKeyboardPressed"
                                @keydown="onKeyboardPressed"
                            ></v-autocomplete>
                            
                            <label> Description </label>
                            <v-spacer></v-spacer>

                            <v-textarea
                                name="description"
                                filled
                                label="Details of Property: (include rules)"
                                v-model="description"
                                :error-messages="errors.description"   
                                @keydown="onKeyboardPressed"
                            ></v-textarea>   

                            <label> Property Rules </label>
                            <v-row justify="center">
                                <v-col cols="6" style="display: inline-flex;" >
                                    <v-text-field
                                        ref="rule"
                                        v-model="tempRule"
                                        label="Example: No Pets"
                                        outlined
                                    ></v-text-field>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn 
                                                fab 
                                                color="#008080"
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
                                <div v-for="(item, index) in propertyRules" :key="index +10">
                                    <v-chip
                                        class="ma-2"
                                        close
                                        @click:close="propertyRules.splice(index, 1)"
                                    >
                                        {{item}}
                                    </v-chip>                
                                </div>
                            </v-row>

                            <label> Property Price </label>

                            <v-row justify="center">
                                <v-col cols="4">
                                    <v-text-field
                                        name="price"
                                        v-model="price"
                                        type="number"
                                        label="Price"
                                        full-width
                                        prefix="$"
                                        suffix="/month"
                                        :error-messages="errors.price"   
                                        @keydown="onKeyboardPressed"
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
                                        :disabled="(6 - images.length) === 0" 
                                        @change="uploadImage">
                                </div>
                                <div id="imgContainer">
                                    <small>({{6 - images.length}} images reminding)</small>
                                    <v-row no-gutters>
                                        <v-col v-for="(image, index) in images" :key="image.street1">
                                            <div>
                                                <img :src="image" alt="img" width="150" height="100">
                                                <div class="my-2" @click="images.splice(index, 1)">
                                                    <v-btn small color="warning">Remove</v-btn>
                                                </div>
                                            </div>
                                        </v-col>
                                    </v-row>
                                </div>
                            </div>
                            <v-col
                                class="mb-12"
                                cols="12"
                            >
                            </v-col>
                        </form>
                    </v-container>
                </v-card-text>
                <p class="errorMsg">{{errors.message}}</p>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click.stop="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" type="submit" text @click="saveUpdatedRoomData">Save</v-btn>
                </v-card-actions>
            </v-card>
    </v-dialog>
</template>

<script>
import {validateUpdateRoom} from '../../store/validators'
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
            title: this.$store.getters.contentRoom.title,
            location: {
                street1: this.$store.getters.contentRoom.location.street1,
                street2: this.$store.getters.contentRoom.location.street2,
                city: this.$store.getters.contentRoom.location.city,
                state: this.$store.getters.contentRoom.location.state,
                zipCode: this.$store.getters.contentRoom.location.zipCode,
                country: this.$store.getters.contentRoom.location.country,
            },
            price: this.$store.getters.contentRoom.price,
            // propertyOwner: false,
            description: this.$store.getters.contentRoom.description,
            propertyRules: [...this.$store.getters.contentRoom.propertyRules],
            images: [...this.$store.getters.contentRoom.images],
            tempRule: '',
            changes: [],
            errors: {}
        }
    },
    created(){
        // const myRoom = this.contentRoom;
        // this.room = this.contentState.room;
    },
    methods: {
        ...mapActions([
            'updateRoom'
        ]),
        removeImage(index){
            this.images.splice(index, 1)
            this.changes.push('images');
        },
        uploadImage(e){
            const image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = e => this.images.push(e.target.result);
            this.changes.push('images');
        },
        removeRule(index){
            this.propertyRules.splice(index, 1)
            this.changes.push('propertyRules');
        },
        addRule(){
            this.propertyRules.push(this.tempRule);
            this.changes.push('propertyRules');
            this.tempRule = '';
        },
        saveUpdatedRoomData(e) {
            e.preventDefault();
            const data = {
                location: {},
            };
            let locationBeingUpdated = false;
            let properties = [...new Set(this.changes)]
            properties.forEach(item => {
                // console.log(item)
                if(item === 'zipCode' || item === 'street2' || item === 'street1' || 
                item === 'state' || item === 'country' || item === 'city') {
                    data.location = this.location;
                    locationBeingUpdated = true;
                } else {
                    data[item] = this[item];
                }
            });
            if(locationBeingUpdated === false){
                delete data.location
            }

            if(properties.length === 0 || Object.keys(data).length === 0){
                let errors = {
                    message: 'Nothing to update!'
                }
                this.errors = errors;
            } else {
                const {valid, errors} = validateUpdateRoom(data);
                if(!valid) this.errors = errors;
                else{
                    data.objectId = this.$store.getters.contentRoom.objectId;
                    this.updateRoom(data)
                    // console.log(this.errors, data);
                }
            }
        },
        closeDialog(){
            this.show = false;
            this.errors = {};
        },
        onKeyboardPressed(e){
            this.changes.push(e.target.name);
            console.log('focus' ,e.target.name)
        }
    }
}
</script>
<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
    }
    /* .input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
     } */
     .month {
        position: absolute;
        margin: 20px 10px;
        font-size: 20px;
    }
    .errorMsg{
        color: red;
        text-align: center;
        margin: 10px;
    }
</style>