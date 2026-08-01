
// Send Message Button
const btnMsg = document.querySelector('.message-btn');
if (btnMsg) {
  btnMsg.addEventListener('click', function () {
    alert('Please login to send a message to the owner.');
  });
}

const amenityTags = document.querySelectorAll('.amenities span');
amenityTags.forEach(tag => {
  tag.addEventListener('mouseenter', function () {
    this.style.background = '#dbeafe';
    this.style.color = '#2563eb';
  });
  tag.addEventListener('mouseleave', function () {
    this.style.background = '#eef2ff';
    this.style.color = '#4338ca';
  });
});

// Highlight active nav link
const navLinks = document.querySelectorAll('nav ul li a:not(.login-btn)');
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    navLinks.forEach(l => l.style.color = '');
    this.style.color = '#2563eb';
  });
});

/* Like */
const likeButtons = document.querySelectorAll('.like-btn');

likeButtons.forEach(btn=>{

    btn.addEventListener('click',()=>{

        btn.classList.toggle('active');

        let icon = btn.querySelector("i");
        let count = btn.querySelector("span");

        let number = parseInt(count.textContent);

        if(btn.classList.contains('active')){

            icon.classList.remove("fa-regular");
            icon.classList.add("fa-solid");

            count.textContent = number + 1;

        }else{

            icon.classList.remove("fa-solid");
            icon.classList.add("fa-regular");

            count.textContent = number - 1;

        }

    });

});