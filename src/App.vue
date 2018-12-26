<template>
   
</template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                order: "",
                phone: "",
                passcode: "",
                submitted: "no",
                status: ""

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
                fetch('https://pubback.benc.io', {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'order=' + this.order + "&phone=" + this.phone + "&passcode=" + this.passcode
                }).then(function(response) {
                    console.log('response',response);
                    if (!response.ok) {
                        _this.submitted = "failure";
                        _this.status = response.status;
                        throw Error(response.statusText);
                    } else {
                        _this.submitted = "success";
                    }
                    // improve error handling later

                }).catch(function(error) {

                    console.log('Error',error);
                    _this.status = 404;
                    _this.submitted = "failure";

                });


            }

        }

    }
</script>

<style lang="scss">
   
</style>