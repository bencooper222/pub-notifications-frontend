<template>
    <div id="app">
      <h1>Pub Notifications</h1>
      <p>Enter your order number and phone number and this will text you when your order is ready!</p><!-- figure out form stuff !-->
      <form action="" method="post">
        <div class="field">
          <label>Order #</label> <input maxlength="3" title="Three digit order number." pattern="[1-9][0-9]{2}" id="order">
        </div>
        <div class="field">
          <label>US Phone #</label> <input maxlength="10" pattern="[1-9][0-9]{9}"  title="10 digit number, no dashes, or parentheses." id="phone">
        </div>
        <div class="field">
          <label>Passcode</label> <input maxlength="3" id="passcode">
        </div>
        
        
        <button id="submit" type="submit" value="submit">Submit</button>
      </form>
      <p>Made with <span class="red">❤</span> by Ben Cooper</p>
    </div>
  </template>

<script>
    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
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
    
    ul {
        list-style-type: none;
        padding: 0;
    }
    
    li {
        display: inline-block;
        margin: 0 10px;
    }
    
    a {
        color: #42b983;
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
        padding-left: 44.85%;
        margin-bottom: 0px;
    }
    .field>input{
      padding-top: 0px;
    }
    .field{
      display:block;
      margin-bottom: 7px;
    }

    #submit{
      margin-top: 4px;
    }
</style>