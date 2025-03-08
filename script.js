function locomotivescroll(){
gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
function loadingAnimation() {
    var tl = gsap.timeline();
    tl.from(".line>h1 ,.line>h4", {
        y: "100%",
        // opacity:0,
        duration: .6,
        delay: .3,
        stagger: .1,
        ease: "elastic.out(1.2,0.75)"
    })
    tl.from("#timer", {
        opacity: 0,
        y: "50%",
        // delay:.2,
        duration: .4,
        onStart: function () {
            var timer = document.querySelector("#counter")
            var grow = 0
            setTimeout(function () {
                setInterval(function () {
                    if (grow < 100) {
                        timer.innerHTML = grow++;
                        // console.log(grow);
                    } else {
                        timer.innerHTML = grow;
                    }
                }, 35);
            }, 100);
        }
    })
    tl.to(".line h1>span", {
        animationName: "changing",
        opacity: 1,
        // delay:.4,
    })
    tl.to("#loader", {
        opacity: 0,
        // delay:3.5,
        delay: 0,
        // duration: 0.3,
    })
    tl.from("#page1", {
        y: 1200,
        opacity: 0,
        ease: "expo.out",
        duration: .5,
    })
    tl.to("#loader", {
        display: "none",
    })
    tl.from("#nav-left,#nav-right", {
        opacity: 0,
        y: "-50%",
        ease: "elastic.out(1.2,0.75)",
        duration: .5,
        stagger: .1,
    })
    tl.from(".hero h1", {
        y: 250,
        stagger: .2,
    })
    tl.from(".hero", {
        overflow: "clip",
    })
    tl.from(".fking-extra", {
        // width:"100%",
        x: "-50%",
        opacity: 0,
        ease: "elastic.out(1.2,0.75)",
        duration: .5,
    })
    tl.from(".hero1 , #page2",{
        opacity:0,
    },"-=1") // This line helps to manipulate the gsap timeline so it can alter it's timing when to run in gsap timeline
}
function cursorAnimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            left: dets.x,
            top: dets.y,
            // speed: 5,
            duration:.1,
            transform: "translate(-50%,-50%)",
            // ease: "elastic.out(1.2,0.5)",
            cursor: "none",
            // transition: "cubic-bezier(.24,.25,0,.96)",
        })
    })

    // Shery.makeMagnet(".magnet", {
    //     ease: "cubic-bezier(.52,.02,.32,1)",
    //     duration: 1,
    // });
    document.querySelectorAll('.magnet').forEach((button) => {
        button.addEventListener('mousemove', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
    
            gsap.to(button, {
                x: x * 1.3,
                y: y * 2.3,
                // duration: 0.3,
                ease: "power2.out", // Smooth easing to reduce jitter
                scale: 1.5,
            });
        });
    
        button.addEventListener('mouseleave', function () {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.4)",
                scale:1, // Subtle bounce-back effect
            });
        });
    });
    
    var cuc = document.querySelector("#cursor");
    var cursor2 = document.querySelector("#cursor2");
    var video = document.querySelector("#video-container");
    var vid = document.querySelector("#video");
    var videoIMG = document.querySelector("#video-container img")

    video.addEventListener("mouseenter", function (e) {
        cuc.style.display = "none"; // Hide default cursor
    });

    video.addEventListener("mousemove", function (e) {
        let rect = video.getBoundingClientRect(); // Get div's position
        let x = e.clientX - rect.left; // Mouse X relative to div
        let y = e.clientY - rect.top;  // Mouse Y relative to div

        gsap.to(cursor2, {
            left: x + 518,
            top: y - 50,
            duration: 1, // Smooth follow effect
            ease: "expo.out",
            delay: .1,
        });
    });

    video.addEventListener("mouseleave", function () {
        cuc.style.display = "block"; // Show default cursor when leaving
        gsap.to("#cursor2", {
            left: "87%",
            top: "-9%",
            ease: "elastic.out(1,1)",
            duration: 3,
        })
    });
    flags = 0
    vid.addEventListener("click",function(){
        if(flag == 0){
        videoIMG.style.opacity = 0;
        videoIMG.style.display = "none";
        vid.play();
        cursor2.innerHTML = `<i class="ri-pause-fill" style="font-size: 2vw;"></i>`;
        gsap.to("#cursor2",{
            ease: "expo.out",
            transform: "translate(-50%,-50%)",
            scale: .5
        })
        flags = 1;
        }else{
            videoIMG.style.opacity = 1;
            videoIMG.style.display = "block";
            vid.pause();
            cursor2.innerHTML = `<i class="ri-triangle-fill triangle"></i>`;
            gsap.to("#cursor2",{
                ease: "expo.out",
                scale: 1,
            })
            flags = 0;
        }

    })

    
}
function hoverChange() {
    var flags = document.querySelectorAll(".flag"); // Select all .flag elements

    for (var i = 0; i < flags.length; i++) {
        flags[i].addEventListener("mouseenter", function(event) {
            var extra = event.currentTarget.querySelector(".fking-extra");
            if (extra) {
                extra.style.opacity = "0"; // Hide only that specific one
            }
        });
    
        flags[i].addEventListener("mouseleave", function(event) {
            var extra = event.currentTarget.querySelector(".fking-extra");
            if (extra) {
                extra.style.opacity = "1"; // Show only that specific one
            }
        });
    }
}
function crawling(){
    // Select all .elem elements
const elems = document.querySelectorAll('.elem');

elems.forEach((elem) => {
    const h1Elements = elem.querySelectorAll('h1');
    const totalWidth = h1Elements[0].offsetWidth; // Width of one h1 element

    if (elem.classList.contains('ltr')) {
        // Left to Right Scroll Animation for .ltr elements
        gsap.to(h1Elements, {
            x: -totalWidth, // Move the content to the left by its width
            duration: 35, // Duration of the animation
            ease: "none", // Linear easing for smooth scrolling
            repeat: -1, // Infinite loop
        });
    } else if (elem.classList.contains('rtl')) {
        // Right to Left Scroll Animation for .rtl elements
        gsap.fromTo(h1Elements, {
            x: -totalWidth, // Start from the left (fully scrolled out)
        }, {
            x: 0, // Move the content to the right (fully scrolled in)
            duration: 35, // Duration of the animation
            ease: "none", // Linear easing for smooth scrolling
            repeat: -1, // Infinite loop
        });
    }
});
}
function awwardWinner() {
    let boards = document.querySelectorAll(".img-div"); // Select all img-divs

    boards.forEach(board => {
        let fir = board.querySelector(".fir"); // Get only the fir inside this board
        let sec = board.querySelector(".sec"); // Get only the sec inside this board

        board.addEventListener("mouseover", () => {
            gsap.to(fir, { y: "-150%", duration: 0.5 });
            gsap.to(sec, { y: "-150%", duration: 0.5 });
        });

        board.addEventListener("mouseout", () => {
            gsap.to(fir, { y: "0%", duration: 0.5 });
            gsap.to(sec, { y: "0%", duration: 0.5 });
        });
    });
}
function wavy() {
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".img-div").forEach((container) => {
            const image = container.querySelector("img");
            if (!image) return;

            let scene, camera, renderer, planeMesh;
            let isAnimating = false;
            let isInitialized = false;
            let currentState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0 };
            let targetState = { mousePosition: { x: 0, y: 0 }, waveIntensity: 0.05 };

            const ANIMATION_CONFIG = {
                transitionSpeed: 0.03,
                baseIntensity: 0,
                hoverIntensity: 0.05
            };

            const vertexShader = `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `;

            const fragmentShader = `
                uniform float u_time;
                uniform vec2 u_mouse;
                uniform float u_intensity;
                uniform sampler2D u_texture;
                varying vec2 vUv;

                void main() {
                    vec2 uv = vUv;
                    float wave1 = sin(uv.x * 10.0 + u_time * 0.5 + u_mouse.x * 5.0) * u_intensity;
                    float wave2 = sin(uv.y * 12.0 + u_time * 0.8 + u_mouse.y * 4.0) * u_intensity;
                    float wave3 = cos(uv.x * 8.0 + u_time * 0.5 + u_mouse.x * 3.0) * u_intensity;
                    float wave4 = cos(uv.y * 9.0 + u_time * 0.7 + u_mouse.y * 3.5) * u_intensity;

                    uv.y += wave1 + wave2;
                    uv.x += wave3 + wave4;
                    
                    gl_FragColor = texture2D(u_texture, uv);
                }
            `;

            function initializeScene(texture) {
                if (isInitialized) return;
                isInitialized = true;

                camera = new THREE.PerspectiveCamera(80, container.offsetWidth / container.offsetHeight, 0.01, 10);
                camera.position.z = 1;

                scene = new THREE.Scene();

                const shaderUniforms = {
                    u_time: { type: "f", value: 1.0 },
                    u_mouse: { type: "v2", value: new THREE.Vector2() },
                    u_intensity: { type: "f", value: currentState.waveIntensity },
                    u_texture: { type: "t", value: texture }
                };

                planeMesh = new THREE.Mesh(
                    new THREE.PlaneGeometry(2, 2),
                    new THREE.ShaderMaterial({
                        uniforms: shaderUniforms,
                        vertexShader,
                        fragmentShader,
                        transparent: true
                    })
                );

                scene.add(planeMesh);

                renderer = new THREE.WebGLRenderer({ alpha: true });
                const imgRect = image.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const width = imgRect.width;
                const height = imgRect.height;
                const left = imgRect.left - containerRect.left;
                const top = imgRect.top - containerRect.top;

                renderer.setSize(width, height);
                renderer.domElement.style.width = `${width}px`;
                renderer.domElement.style.height = `${height}px`;
                renderer.domElement.style.left = `${left}px`;
                renderer.domElement.style.top = `${top}px`;
                renderer.domElement.style.position = "absolute";
                renderer.domElement.style.top = "0";
                renderer.domElement.style.left = "0";
                renderer.domElement.style.pointerEvents = "none"; // Ensures clicks pass through

                container.style.position = "relative";
                container.appendChild(renderer.domElement);

                renderer.render(scene, camera);
            }

            function animateScene() {
                if (!isAnimating) return;
                requestAnimationFrame(animateScene);

                currentState.mousePosition.x = updateValue(
                    targetState.mousePosition.x,
                    currentState.mousePosition.x,
                    ANIMATION_CONFIG.transitionSpeed
                );

                currentState.mousePosition.y = updateValue(
                    targetState.mousePosition.y,
                    currentState.mousePosition.y,
                    ANIMATION_CONFIG.transitionSpeed
                );

                currentState.waveIntensity = updateValue(
                    targetState.waveIntensity,
                    currentState.waveIntensity,
                    ANIMATION_CONFIG.transitionSpeed
                );

                const uniforms = planeMesh.material.uniforms;
                uniforms.u_intensity.value = currentState.waveIntensity;
                uniforms.u_time.value += 0.005;
                uniforms.u_mouse.value.set(currentState.mousePosition.x, currentState.mousePosition.y);

                renderer.render(scene, camera);
            }

            function updateValue(target, current, speed) {
                return current + (target - current) * speed;
            }

            function handleMouseMove(event) {
                const rect = container.getBoundingClientRect();
                targetState.mousePosition.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                targetState.mousePosition.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
            }

            function handleMouseOver() {
                if (!isAnimating) {
                    isAnimating = true;
                    animateScene();
                }
                targetState.waveIntensity = ANIMATION_CONFIG.hoverIntensity;
            }

            function handleMouseOut() {
                targetState.waveIntensity = ANIMATION_CONFIG.baseIntensity;
                targetState.mousePosition = { x: 0, y: 0 };

                setTimeout(() => {
                    if (targetState.waveIntensity === ANIMATION_CONFIG.baseIntensity) {
                        isAnimating = false;
                    }
                }, 500);
            }

            const textureLoader = new THREE.TextureLoader();
            textureLoader.load(image.src, (texture) => {
                initializeScene(texture);

                container.addEventListener("mousemove", handleMouseMove, false);
                container.addEventListener("mouseenter", handleMouseOver, false);
                container.addEventListener("mouseleave", handleMouseOut, false);
            });
        });
    });
}
function specialEffect(){
    let pro = document.querySelector(".special");

    pro.addEventListener("mouseover", ()=>{
        gsap.to(".special",{
            height:"18vw",
            width:"18vw",
            ease: "elastic.out(1,1)",
        })
    });
    pro.addEventListener("mouseout", ()=>{
        gsap.to(".special",{
            height:"21vw",
            width:"21vw",
            ease: "expo.out",
        })
    });
}
function stupidShit(){
    const overlay = document.querySelector(".overlay");
const imgContainer = document.querySelector(".img-div");
const cursor = document.querySelector("#cursor");

let lastX = "50%";
let lastY = "50%";
const noise = new SimplexNoise(); // Initialize Perlin Noise
let time = 0; // Noise Time Variable

// Function to generate a wobbly blob using Perlin noise
function generatePerlinBlob(x, y) {
    let points = 40; // More points = smoother blob
    let baseRadius = 50; // Base size of the circle
    let noiseScale = 10; // Noise influence for wobble
    let shape = "polygon(";

    for (let i = 0; i < points; i++) {
        let angle = (i / points) * Math.PI * 2;
        let noiseValue = noise.noise2D(Math.cos(angle) + time, Math.sin(angle) + time); // Noise value
        let radius = baseRadius + noiseValue * noiseScale; // Apply noise

        let px = x + radius * Math.cos(angle);
        let py = y + radius * Math.sin(angle);

        shape += `${px}px ${py}px, `;
    }

    return shape.slice(0, -2) + ")"; // Remove last comma and close the shape
}

// Function to animate the wobble effect
function animateBlob() {
    time += 0.1; // Increment time for noise animation

    // Update the clip-path with the wobble effect
    overlay.style.clipPath = generatePerlinBlob(lastX, lastY);

    requestAnimationFrame(animateBlob); // Continue the animation loop
}

// Start the wobble animation
animateBlob();

imgContainer.addEventListener("mousemove", (e) => {
    let rect = imgContainer.getBoundingClientRect();
    let x = e.clientX - rect.left; // Centering fix
    let y = e.clientY - rect.top; // Centering fix

    lastX = x; // Store last known position
    lastY = y; // Store last known position

    overlay.style.transition = "clip-path 0.2s ease-out";
    overlay.style.clipPath = generatePerlinBlob(x, y);

    // Hide previous cursor
    cursor.style.opacity = "0";
    cursor.style.pointerEvents = "none";
});

imgContainer.addEventListener("mouseleave", () => {
    overlay.style.transition = "clip-path 0.5s ease-out";
    overlay.style.clipPath = `circle(0vw at ${lastX}px ${lastY}px)`; // Shrinks at last position

    // Show previous cursor after a slight delay for smooth transition
    setTimeout(() => {
        cursor.style.opacity = "1";
        cursor.style.pointerEvents = "auto";
    }, 300); // Adjust delay as needed
});



}
function flag(){
    document.addEventListener("mousemove",function(e){
        gsap.to("#flagimg",{
            x:e.x,
            y:e.y,
        })
    })
    document.querySelector(".hero-3").addEventListener("mouseenter",function(){
        gsap.to("#flagimg",{
            opacity:1,
        })
    })
    document.querySelector(".hero-3").addEventListener("mouseleave",function(){
        gsap.to("#flagimg",{
            opacity:0,
        })
    })
}

locomotivescroll()
loadingAnimation()
cursorAnimation()
hoverChange()
crawling()
awwardWinner();
wavy();
specialEffect();
// stupidShit();
flag();





// var ct = document.querySelector(".cooltext");
// var theText = document.querySelector("#THETEXT");
// var flag = 0; // Track hover state
// Split text into spans for animation
// Function to split text into spans for animation
// Splitting text into individual spans for animation
var arr = document.querySelector(".fancyA")
function splitTextIntoSpans(selector) {
    let element = document.querySelector(selector);
    let text = element.textContent;
    let newHtml = "";
    text.split("").forEach(char => {
        newHtml += `<span>${char}</span>`;
    });
    element.innerHTML = newHtml;
}

// Apply text splitting to #THETEXT
splitTextIntoSpans("#THETEXT");

// Selecting the text element
const textElement = document.querySelector("#THETEXT");

// Hover Effect: Fade out and animate in
textElement.addEventListener("mouseenter", function () {
    gsap.to("#THETEXT span", {
        opacity: 0,
        stagger: 0.05,
        duration: 0.5,
        fontFamily: "5",
        
        onComplete: function () {
            gsap.to("#THETEXT span", {
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.inOut",
                fontFamily: "5",
            });
        }
    });
    gsap.to(".fancyA",{
        left:"2vw",
    });
});

// Mouse Leave Effect: Fade out and reset
textElement.addEventListener("mouseleave", function () {
    gsap.to("#THETEXT span", {
        opacity: 0,
        stagger: 0.05,
        duration: 0.1,
        fontFamily: "5",
        onComplete: function () {
            gsap.to("#THETEXT span", {
                opacity: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: "power2.inOut",
                fontFamily: "5",
            });
        }
    });
    gsap.to(".fancyA",{
        left:"0",
    });
});
