<template>
    <div id="app">
        <h1>Pub Notifications</h1>
        <transition name="fade">
            <div v-if="submitted === 'no'">
                <p>Enter your order number and phone number and this will text you when your order is ready!</p>
                <!-- figure out form stuff !-->
             
                    <div class="field">
                        <label>Order #</label>
                        <input v-model="order" maxlength="3" title="Three digit order number." id="order" name="order">
                    </div>
                    <br>
                    <div class="field">
                        <label>US Phone #</label>
                        <input v-model="phone" maxlength="10" title="10 digit number, no dashes, or parentheses." id="phone" name="phone">
                    </div>
                    <br>
                    <div class="field">
                        <label>Passcode</label>
                        
                        <input v-model="passcode" maxlength="3" id="passcode" name="passcode">
                    </div>

                    <br>
                    <button v-on:click="submitForm" :disabled="disabled" id="submit" type="submit" value="submit">Submit</button>
                
            </div>
            <div v-else-if="submitted === 'success'">
                <span id="check">✔️ Submitted</span>
                <br>
                <b>Keep an eye on your phone for a text!</b>
                </br>
            </div>
            <div v-else-if="submitted === 'failure'">
                <span id="cross"> ❌ Failure</span>
                <br>
                <b>It didn't work. Pretend there's a helpful error message here.</b>
                </br>
            </div>
        </transition>
        <br>
        <br>
        <p class="extra-info"><a href="https://github.com/bencooper222/pub-notifications/blob/master/disclaimers.md">Disclaimers</a></p>
        <p class="extra-info">|</p>
        <p class="extra-info">  <a href="https://github.com/bencooper222/pub-notifications">Code</a>&nbsp;|</p>
        <p class="extra-info"><a href="http://campusdining.vanderbilt.edu/?action=cmi_yoir&request=screen&location_id=752">  API</a>
        </p>
        <p id="love">Made with <span class="red">❤</span> by Ben Cooper</p>

    </div>
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                order: "",
                phone: "",
                passcode: "",
                submitted: "no"

            }
        },
        mounted: function() {
            this.phone = localStorage.getItem("phone");
        },
        computed: {
            disabled: function() {

                if (!this.order.match(/[1-9][0-9]{0,2}/)) { // order number is three digits                    
                    return true;
                }
                if (!this.phone.match(/[1-9][0-9]{9}/)) { //phone number is 10 digits             
                    return true;
                }
                if (this.passcode.length != 3 || this.passcode == "") { //passcode is three chars                   
                    return true;
                }
                return false;
            }
        },
        methods: {
            submitForm: function() {
                localStorage.setItem("phone", this.phone);
                let data = {};
                data.order = this.order;
                data.phone = this.phone;
                data.passcode = this.passcode;

                let _this = this;
                fetch('https://pb.benc.io', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'order=' + this.order + "&phone=" + this.phone + "&passcode=" + this.passcode
                }).then(function() {
                    _this.submitted = "success";
                }).catch(function(error){
                    _this.submitted = "failure";   
                });


            }

        }

    }
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    
    h1,
    h2 {
        font-weight: normal;
    }
    
    #check {
        color: green;
    }

    #cross{
        font-size: 128px;

        color: red;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
    }
    
    #love {
        margin-top: 3px;
        margin-bottom: 0px;
    }
    
    .extra-info {
        display: inline-block;
        margin-top: 0px;
        margin-bottom: 0px;
    }
    
    .red {
        color: red;
    }
    
    .field>label {
        display: block;
        margin: 0 0 .28571429rem 0;
        color: rgba(0, 0, 0, .87);
        font-size: .782857143em;
        font-weight: 700;
        text-transform: none;
        text-align: left;
        //  padding-left: 44.85%;
        margin-bottom: 0px;
    }
    
    .field>input {
        padding-top: 0px;
    }
    
    .field {
        display: inline-block;
        margin-bottom: 7px;
    }
    
    #submit {
        margin-top: 4px;
    }
    
    #passcode {
        -webkit-text-security: disc;
        -moz-text-security: disc;
        text-security: disc;
    }
    
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 1s
    }
    
    .fade-enter,
    .fade-leave-to
    /* .fade-leave-active below version 2.1.8 */
    
    {
        opacity: 0
    }
</style>