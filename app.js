let StartUp = document.querySelector(".StartUp");
let intro = document.querySelector(".intro-header");
let introSpan = document.querySelectorAll(".intro");

window.addEventListener("DOMContentLoaded", ()=>{

  setTimeout(()=>{
    introSpan.forEach((span, idx)=>{

      setTimeout(() => {
        span.classList.add('active');
      }, (idx + 1) * 400);
    });

    setTimeout(() => {
      introSpan.forEach((span, idx)=>{

        setTimeout(() => {
          span.classList.remove('active');
          span.classList.add('fade');
        }, (idx + 1) * 50);
      })
    }, 2000);

    
    setTimeout(() => {
      StartUp.style.top = '-100vh';
    },2300);
    

  })
})