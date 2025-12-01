let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function changeTestimonial(index) {
    testimonials[currentTestimonial].classList.remove('active');
    dots[currentTestimonial].classList.remove('active');

    currentTestimonial = index;

    testimonials[currentTestimonial].classList.add('active');
    dots[currentTestimonial].classList.add('active');
}

// Auto-slide every 5 seconds
setInterval(() => {
    let next = (currentTestimonial + 1) % testimonials.length;
    changeTestimonial(next);
}, 5000);

document.addEventListener("DOMContentLoaded", function () {
    const getStartedButtons = document.querySelectorAll(".get-started-btn");

    getStartedButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();
            console.log("Get Started button clicked!");
            openChatPopup();
        });
    });

    function openChatPopup() {
		document.body.classList.add("blur-background");

        console.log("openChatPopup function triggered!");
        
        // Remove existing popup if any
        const existingPopup = document.querySelector(".chat-popup");
        if (existingPopup) {
            existingPopup.remove();
        }

        // Create chat popup
        const chatContainer = document.createElement("div");
        chatContainer.classList.add("chat-popup");
        chatContainer.innerHTML = `
            <div class="chat-box">
                <h3>Let's Get Started!</h3>
                <label>First Name:</label>
                <input type="text" id="first-name" placeholder="Enter your first name">
                
                <label>Last Name:</label>
                <input type="text" id="last-name" placeholder="Enter your last name">
                
                <label>Contact Number:</label>
                <input type="tel" id="contact-number" placeholder="Enter your contact number">
                
                <label>What do you want?</label>
                <select id="service-type">
                    <option value="portfolio">Professional Portfolio</option>
                    <option value="business-website">Business Website</option>
                    <option value="ui-ux">UI/UX Interface</option>
                </select>

                <button id="continue-btn">Continue</button>
                <button id="close-chat">Close</button>
            </div>
        `;

        document.body.appendChild(chatContainer);
        console.log("Chat popup added to DOM!");

        // Close button functionality
        document.getElementById("close-chat").addEventListener("click", function () {
    chatContainer.remove();
    document.body.classList.remove("blur-background"); // Remove blur effect
});


        // Continue button functionality
        document.getElementById("continue-btn").addEventListener("click", function () {
            const firstName = document.getElementById("first-name").value;
            const lastName = document.getElementById("last-name").value;
            const contactNumber = document.getElementById("contact-number").value;
            const serviceType = document.getElementById("service-type").value;

            if (firstName && lastName && contactNumber) {
                openPaymentGateway(firstName, lastName, contactNumber, serviceType);
            } else {
                alert("Please enter your first name, last name, and contact number.");
            }
        });
    }

    function openPaymentGateway(firstName, lastName, contactNumber, serviceType) {
        const options = {
            key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay Key
            amount: 5000, // Example amount (₹50.00)
            currency: "INR",
            name: "Your Business Name",
            description: `Payment for ${serviceType}`,
            handler: function (response) {
                alert("Payment Successful! Order placed.");
                const message = `Hello, my name is ${firstName} ${lastName}. My contact number is ${contactNumber}. I want a ${serviceType}.`;
                const whatsappLink = `https://wa.me/9027949762?text=${encodeURIComponent(message)}`;
                window.open(whatsappLink, "_blank");
				document.body.classList.remove("blur-background");
            },
            prefill: {
                name: `${firstName} ${lastName}`,
                contact: contactNumber
            },
            theme: {
                color: "#F37254"
            }
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
    }
});



document.querySelectorAll('.quick-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump
        const targetId = this.getAttribute('href'); 
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 50, // Adjust 50px if needed
                behavior: 'smooth'
            });
        }
    });
});



function toggleMenu() {
    document.querySelector("nav ul").classList.toggle("active");
}





