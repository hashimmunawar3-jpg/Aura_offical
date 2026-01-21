// AOS Initializaion
AOS.init({duration:1000,once:true });

//menu togge
function toggleMenu(){
    document.getElementById('menu').classList.toggle('active');
}

function animationCounter(id,target,speed){
    let count = 0;
    const interval = setInterval(()=>{
        if(count < target){
            count++;
            document.getElementById(id).innerText = count;
        }else{
            clearInterval(interval);
        }
    }, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    animationCounter('courseCount', 50, 40);
    animationCounter('studentCount', 210, 10);
    animationCounter('PlacementRate', 95, 20);
});
// testimonial slider

const wrapper = document.getElementById('testimonialwrapper');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
const totalSlides = 2;

function moveToSlide(index){
    currentSlide = index;
    const slideWidth = wrapper.clientWidth;
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}
setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    moveToSlide(currentSlide)
},5000);
 
// Scroll Events
window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const header = document.getElementById("mainHeader");
    const topBtn = document.getElementById("backToTop");

    if (header) {
        header.classList.toggle("fixed", scrollY > 100);
    }

    if (topBtn) {
        topBtn.style.display = scrollY > 300 ? "block" : "none";
    }
});

 

document.querySelectorAll('.scrollLink').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetID = this.getAttribute('href');
        const headerHeight = document.querySelector('#mainHeader').offsetHeight;
        const target = document.querySelector(targetID);

        window.scrollTo({
            top: target.offsetTop - headerHeight,
            behavior: 'smooth'
        });

        // Mobile menu auto close
        document.getElementById('menu').classList.remove('active');
    });
});
 // Get the button
        const backToTopBtn = document.getElementById("backToTop");
        
        // Show/hide the button based on scroll position
        window.addEventListener("scroll", function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });
        
        // Smooth scroll to top when button is clicked
        backToTopBtn.addEventListener("click", function(e) {
            e.preventDefault();
            
            // Using requestAnimationFrame for smooth animation
            const scrollToTop = () => {
                const currentPosition = window.pageYOffset;
                
                if (currentPosition > 0) {
                    // Scroll up by a fraction of the current position
                    window.scrollTo(0, currentPosition - currentPosition / 1);
                    requestAnimationFrame(scrollToTop);
                }
            };
            
            // Alternative: Using scrollTo with behavior smooth (modern browsers)
            // window.scrollTo({
            //     top: 0,
            //     behavior: 'smooth'
            // });
            
            // Using the custom animation
            scrollToTop();
        });
        
        // Alternative simpler implementation with smooth scroll
        // backToTopBtn.addEventListener("click", function() {
        //     window.scrollTo({
        //         top: 0,
        //         behavior: 'smooth'
        //     });
        // });