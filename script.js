var tl = gsap.timeline();
tl.from(".line>h1 ,.line>h4git init",{
    y:"100%",
    // opacity:0,
    duration:.85,
    delay:.3,
    stagger:.1,
    ease: "elastic.out(1.2,0.75)"
})
tl.from("#timer",{
    opacity:0,
    y:"50%",
    // delay:.2,
    // duration:.1,
    onStart:function(){
        var timer = document.querySelector("#counter")
        var grow = 0
        setTimeout(function () {
            setInterval(function () {
                if (grow < 100) {
                    timer.innerHTML = grow++;
                    console.log(grow);
                } else {
                    timer.innerHTML = grow;
                }
            }, 35);
        }, 100);
    }
})
tl.to(".line h1>span",{
    animationName:"changing",
    opacity:1,
    delay:.4,
})
tl.to("#loader",{
    opacity:0,
    delay:4.1,
    duration:0.3,
})
tl.from("#page1",{
    y:1200,
    opacity:0,
    ease: "expo.out",
    duration:.5,
})
tl.to("#loader",{
    display:"none",
})