<template>
    <v-dialog
        v-model="show"
        max-width="600px"
        >
            <v-card>
                <v-card-title>
                <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                <v-container class="text-center">
                        <input
                            name="title"
                            placeholder="Room Title"
                            :value="contentRoom.title"
                            @input="handleChange"
                            type="text"
                            class="input"
                        >
                        <label> Location </label>
                        <input
                            placeholder="Street1"
                            name="street1"
                            :value="contentRoom.location.street1"
                            type="text"
                            @input="handleChange"
                            class="input"
                        >
                        <input
                            name="street2"
                            placeholder="Street2"
                            :value="contentRoom.location.street2"
                            type="text"
                            @input="handleChange"
                            class="input"
                        >
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            :value="contentRoom.location.city"
                            @input="handleChange"
                            class="input"
                        >
                        <input
                            name="state"
                            placeholder="State/Province/Region"
                            :value="contentRoom.location.state"
                            type="text"
                            @input="handleChange"
                            class="input"
                        >
                        <input
                            name="zipCode"
                            type="text"
                            :value="contentRoom.location.zipCode"
                            @input="handleChange"
                            class="input"
                        >
                        <v-autocomplete
                            :value="contentRoom.location.country"
                            :items="countries"
                            label="Country"
                            outlined
                            @input="handleCountryChange"
                        ></v-autocomplete>
                        
                        <label> Description </label>
                        <v-spacer></v-spacer>

                        <v-textarea
                            filled
                            :value="contentRoom.description"
                            :error-messages="errors.description"  
                            @input="handleTextAreaChange" 
                        ></v-textarea>   

                        <label> Property Rules </label>
                        <v-row justify="center">
                            <v-col cols="6" style="display: inline-flex;" >
                                <input
                                    name="rules"
                                    placeholder="Example: No Pets"
                                    outlined
                                    v-model="tempRule"
                                    type="text"
                                    class="input"
                                >
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
                        <v-row style="margin-top: -15px; margin-bottom: 15px;" justify="center">
                            <div v-for="(item, index) in propertyRules" :key="index +10">
                                <v-chip
                                    class="ma-2"
                                    close
                                    @click:close="removeRule(index)"
                                >
                                    {{item}}
                                </v-chip>                
                            </div>
                        </v-row>

                        <label> Property Price </label>

                        <v-row justify="center">
                            <v-col cols="4">
                                <input
                                    name="price"
                                    type="number"
                                    placeholder="Price"
                                    :value="contentRoom.price"
                                    class="input"
                                    @input="handleChange"
                                >
                                 <span class="month">/month</span>
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
                                    @change="uploadImage"
                                >
                            </div>
                            <div id="imgContainer">
                                <small>({{6 - images.length}} images reminding)</small>
                                <v-row no-gutters>
                                    <v-col v-for="(image, index) in images" :key="image.street1">
                                        <div>
                                            <img :src="image" alt="img" width="150" height="100">
                                            <div class="my-2" @click="removeImage(index)">
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
// import {validateCreateRoom} from '../../store/validators'
import {mapActions, mapGetters} from 'vuex'
export default {
    name: "EditRoomForm",
    props: {
        value: Boolean
    },
    computed: {
        ...mapGetters([
            'contentRoom',
        ]),
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
            title: '',
            street1: '',
            street2: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
            price: '',
            // propertyOwner: false,
            description: '',
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
        handleChange(event){
            this[event.target.name]= event.target.value
            this.changes.push(event.target.name);
        },
        handleTextAreaChange(e){
            this.description = e;
            this.changes.push('description');
        },
        handleCountryChange(e){
            this.country = e
            this.changes.push('country');
        },
        saveUpdatedRoomData(e) {
            e.preventDefault();
            const data = {
                location: {}
            };
            let properties = [...new Set(this.changes)]
            properties.forEach(item => {
                console.log(item)
                if(item === 'zipCode' || item === 'street2' || item === 'street1' || 
                item === 'state' || item === 'country' || item === 'city') {
                    data.location[item] = this[item]
                } else {
                    data[item] = this[item];
                }
            });
            if(Object.keys(data.location).length === 0){
                delete data.location
            }
            // const {valid, errors} = validateCreateRoom(room);
            // if(!valid) console.log(errors)
            console.log(data)
            // else {
                this.updateRoom(data)
            // }
        },
    }
    
}
</script>
<style scoped>
    #imgContainer{
        margin-top: 20px;
        border: 2px solid gainsboro;
    }
    .input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
     }
     .month {
        position: absolute;
        margin: 20px 10px;
        font-size: 20px;
    }
        
</style>