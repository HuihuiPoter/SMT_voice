<template>
    <div id="ct_container">
        <div class="ct_bar" id="ct_top"></div>
        <div class="ct_bar" id="ct_bottom"></div>
        <div class="ct_bar" id="ct_left"></div>
        <div class="ct_bar" id="ct_right"></div>     
        <div class="ct_circle ct_text" :style="{'font-size': ct_text.font_size}">{{ct_text.text}}</div>
        <!-- 会动的圆环 -->
        <div class="rect-box">
            <div class="rect left">
               <div class="circle"></div>  
            </div>
            <div class="rect right">
               <div class="circle"></div>  
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Countdown',
    props: {
      num: Number
    },
    watch: {
      num(val) {
        // console.log(val)
        this.ct_text = this.text[val]
      }
    },
    data() {
        return {
           text: [
             {
              text: 'go', 
              font_size: '70px'
             },
             {
              text: 'ready', 
              font_size: '70px'
             },
             {
              text: '1', 
              font_size: '200px'
             },
             {
              text: '2', 
              font_size: '200px'
             }
             ],
           ct_text: {
              text: '3', 
              font_size: '200px'
           }
        }
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>

<style>
    #ct_container{
        /* position: relative; */
        /* transform: translate(-50%, 50%); */
        width: 100%;
        height: 100%;
    }
    .ct_circle{
      z-index: 1;
      position: absolute;
      bottom: 20%;
      left: 20%;
        width: 60%;
        height: 60%;
        /* padding-top: 45%; */
        border-radius: 50%;
        background-image: linear-gradient(to bottom right, #98C68F, #80B986, #459971);
        /* background-image: linear-gradient(to bottom right, #98C68F 60%, #459971 40%); */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ct_text{
        font-size: 200px;
        font-weight: bold;
        color: white;
    }
    .ct_bar{
        position: relative;
        width: 2%;
        height: 24%;
        border-radius: 10px;
    }
    /* :root{
      --bar_v: 78%;
      --bar_h: 80%;
    }
    @media only screen and (max-width: 1600px){
      :root{
        --bar_v: 79%;
        --bar_h: 81%;
      }
    } */
    #ct_top{
        background-color: #98C68F;
        top: -2%;
    }
    #ct_left{
        background-color: #98C68F;
        transform: rotate(90deg);
        right: 40%;
        bottom: 8%;
    }
    #ct_right{
        background-color: #459971;
        transform: rotate(90deg);
        left: 40%;
        bottom: 32%;
    }
    #ct_bottom{
        background-color: #459971;
        top: 55%;
    }
    .rect-box{
        z-index: 1;
        width: 450px;
        height: 450px;
        box-sizing: border-box;
        position: absolute;
        left: 24px;
        bottom: 24px;

    }
    .rect{
      width: 50%;
      height: 100%;
      box-sizing: border-box;
      position: absolute;
      overflow:hidden;
      top: 0;
    }
    .left{
      left: 0;
    }
    .right{
      right: 0;
    }
    .rect > div{
      width: 450px;   
      height: 450px;   
      border:30px solid transparent;   
      border-radius: 50%;   
      box-sizing: border-box;
      position: absolute;   
      top:0;  
      z-index: 3;
      transform: rotate(45deg);
    }
    .right .circle{   
      border-left:30px solid transparent;   
      border-bottom:30px solid transparent;    
      right:0;   
      -webkit-animation: right 5s linear;   
    }   
    .left .circle{   
       border-bottom:30px solid transparent;   
       border-left:30px solid transparent;      
       left:0;   
      -webkit-animation: left 5s linear;  
    }   
    @-webkit-keyframes right{   
      0%{   
        border-left:30px solid white;
        border-bottom:30px solid white;
        -webkit-transform: rotate(45deg);   
      }   
      50%{   
      
        border-left:30px solid white;   
        border-bottom:30px solid white;   
        -webkit-transform: rotate(225deg);   
      }   
      100%{   
        border-left:30px solid white;   
        border-bottom:30px solid white;   
        -webkit-transform: rotate(225deg);   
      }   
    }   
    @-webkit-keyframes left{   
      0%{   
        border-top:30px solid white;   
        border-right:30px solid white;  
        -webkit-transform: rotate(45deg);   
      }   
      50%{   

        border-top:30px solid white;   
        border-right:30px solid white;   
        -webkit-transform: rotate(45deg);   
      }   
      100%{   
        border-top:30px solid white;   
        border-right:30px solid white;   
        -webkit-transform: rotate(225deg);   
      }  
    }
    
</style>