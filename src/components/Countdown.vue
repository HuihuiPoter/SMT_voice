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
              font_size: '4vw'
             },
             {
              text: 'ready', 
              font_size: '4vw'
             },
             {
              text: '1', 
              font_size: '12vw'
             },
             {
              text: '2', 
              font_size: '12vw'
             }
             ],
           ct_text: {
              text: '3', 
              font_size: '12vw'
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
        width: 100%;
        height: 100%;
        /* display: flex;
        justify-content: center;
        align-items: center; */
    }
    .ct_circle{
      z-index: 1;
      position: relative;
      bottom: 70%;
      /* right: 10%; */
        width: 50%;
        height: 50%;
        /* padding-top: 45%; */
        border-radius: 50%;
        background-image: linear-gradient(to bottom right, #98C68F, #80B986, #459971);
        /* background-image: linear-gradient(to bottom right, #98C68F 60%, #459971 40%); */
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ct_text{
        font-size: 12vw;
        font-weight: bold;
        color: white;
    }
    .ct_bar{
        position: relative;
        width: 2%;
        height: 24%;
        border-radius: 10vw;
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
        top: 4%;
        /* left: 32%; */
    }
    #ct_left{
        background-color: #98C68F;
        transform: rotate(90deg);
        right: 35%;
        bottom: 8%;
    }
    #ct_right{
        background-color: #459971;
        transform: rotate(90deg);
        left: 35%;
        bottom: 32%;
    }
    #ct_bottom{
        background-color: #459971;
        top: 50%;
        /* left: 30%; */
    }
      :root{
        --border: 2vw;
        --ct_width: 45rem;
        --ct_height: 45rem;
      }
    /* @media only screen and (max-width: 1900px){
      :root{
        --border: 3rem;
        --ct_width: 40rem;
        --ct_height: 40rem;
      }
    }
    @media only screen and (max-width: 1500px){
      :root{
        --border: 2.5rem;
        --ct_width: 35rem;
        --ct_height: 35rem;
      }
    }
    @media only screen and (max-width: 1024px){
      :root{
        --border: 2rem;
        --ct_width: 27rem;
        --ct_height: 27rem;
      }
    }
    @media only screen and (max-width: 768px){
      :root{
        --border: 1.6rem;
        --ct_width: 20rem;
        --ct_height: 20rem;
      }
    }
    @media only screen and (max-width: 820px){
      :root{
        --border: 1.3rem;
        --ct_width: 20rem;
        --ct_height: 20rem;
      }
    }
    @media only screen and (max-width: 400px){
      :root{
        --border: 0.8rem;
        --ct_width: 10rem;
        --ct_height: 10rem;
      }
    } */
    
    .rect-box{
        z-index: 1;
        width: 28vw;
        height: 28vw;
        box-sizing: border-box;
        position: relative;
        bottom: 136%;

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
      width: 28vw;   
      height: 28vw;   
      border:var(--border) solid transparent;   
      border-radius: 50%;   
      box-sizing: border-box;
      position: absolute;   
      top:0;  
      z-index: 3;
      transform: rotate(45deg);
    }
    .right .circle{   
      /* border-top:30px solid transparent;   
      border-right:30px solid transparent;   */
      border-left:var(--border) solid transparent;   
      border-bottom:var(--border) solid transparent;    
      right:0;   
      -webkit-animation: right 5s linear;   
    }   
    .left .circle{   
       border-bottom:var(--border) solid transparent;   
       border-left:var(--border) solid transparent;      
       left:0;   
      -webkit-animation: left 5s linear;  
    }   
    @-webkit-keyframes right{   
      0%{   
        border-left:var(--border) solid white;
        border-bottom:var(--border) solid white;
        -webkit-transform: rotate(45deg);   
      }   
      50%{   
      
        border-left:var(--border) solid white;   
        border-bottom:var(--border) solid white;   
        -webkit-transform: rotate(225deg);   
      }   
      100%{   
        border-left:var(--border) solid white;   
        border-bottom:var(--border) solid white;   
        -webkit-transform: rotate(225deg);   
      }   
    }   
    @-webkit-keyframes left{   
      0%{   
        border-top:var(--border) solid white;   
        border-right:var(--border) solid white;  
        -webkit-transform: rotate(45deg);   
      }   
      50%{   

        border-top:var(--border) solid white;   
        border-right:var(--border) solid white;   
        -webkit-transform: rotate(45deg);   
      }   
      100%{   
        border-top:var(--border) solid white;   
        border-right:var(--border) solid white;   
        -webkit-transform: rotate(225deg);   
      }  
    }
    
</style>