const sideNav = document.getElementById('side-nav');
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

sideNav.style.right = '-250px';

menuBtn.onclick = function () {
  if (sideNav.style.right == '-250px') {
    sideNav.style.right = '0';
    menu.src = 'img/close.png';
  } else {
    sideNav.style.right = '-250px';
    menu.src = 'img/menu.png';
  }
};

const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
});

// Video reel
function videoUrl(video) {
  document.getElementById('slider').src = video;
}

let videoCount = 2;
let videoPlayer = document.getElementById('slider');

function nextVideo() {
  videoCount++;
  if (videoCount === 7) videoCount = 2;
  let nextVideo = 'vid/video' + videoCount + '.m4v';
  videoPlayer.src = nextVideo;
  videoPlayer.play();
}

// Trigger modal
const suModal = new bootstrap.Modal(document.getElementById('signupModal'), {});
const odModal = document.getElementById('openDayModal');

function onClassChange(element, callback) {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        callback(mutation.target);
      }
    });
  });
  observer.observe(element, { attributes: true });
  return observer.disconnect;
}

onClassChange(odModal, (node) => {
  node.classList.contains('show')
    ? ''
    : setTimeout(() => {
        suModal.show();
      }, 1000);
});

document.onreadystatechange = function () {
  setTimeout(() => {
    if (!odModal.classList.contains('show')) {
      suModal.show();
    }
  }, 30000);
};

// Form validation
function validateForm() {
  var name = document.getElementById('name').value;
  if (name == '') {
    document.querySelector('#status').innerHTML = 'Please enter your name';
    return false;
  }
  var email = document.getElementById('email').value;
  if (email == '') {
    document.querySelector('#status').innerHTML = 'Please enter your email';
    return false;
  } else {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<i>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      document.querySelector('#status').innerHTML =
        'This email format is invalid';
      return false;
    }
  }
  var subject = document.getElementById('subject').value;
  if (subject == '') {
    document.querySelector('#status').innerHTML = 'Please include a subject';
    return false;
  }
  var message = document.getElementById('message').value;
  if (message == '') {
    document.querySelector('#status').innerHTML = 'Please write your message';
    return false;
  }

  document.getElementById('status').innerHTML = 'Sending...';
  formData = {
    name: $('input[name=name]').val(),
    email: $('input[name=email]').val(),
    subject: $('input[name=subject]').val(),
    message: $('textarea[name=message]').val(),
  };

  $.ajax({
    url: 'mail.php',
    type: 'POST',
    data: formData,
    success: function (data, textStatus, jqXHR) {
      $('#status').text(data.message);
      if (data.code)
        $('#contact-form')
          .closest('form')
          .find('input[type=text], textarea')
          .val('');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#status').text(jqXHR);
    },
  });
}

// Signup validation
function validateSignup() {
  var signup = document.getElementById('signup').value;
  if (signup == '') {
    document.querySelector('#signupStatus').innerHTML =
      'Please enter your email';
    return false;
  } else {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<i>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(signup)) {
      document.querySelector('#signupStatus').innerHTML =
        'This email format is invalid';
      return false;
    }
  }
  document.getElementById('signupStatus').innerHTML = 'Sending...';
  signupData = {
    signup: $('input[name=signup]').val(),
  };

  $.ajax({
    url: 'signup.php',
    type: 'POST',
    data: signupData,
    success: function (data, textStatus, jqXHR) {
      $('#signupStatus').text(data.message);
      if (data.code)
        $('#signup-form').closest('form').find('input[type=text]').val('');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#signupStatus').text(jqXHR);
    },
  });
}

// Open day validation
function validateOpenDay() {
  var openday = document.getElementById('openday').value;
  if (openday == '') {
    document.querySelector('#opendayStatus').innerHTML =
      'Please enter your full name';
    return false;
  }
  document.getElementById('opendayStatus').innerHTML = 'Sending...';
  opendayData = {
    openday: $('input[name=openday]').val(),
  };

  $.ajax({
    url: 'openday.php',
    type: 'POST',
    data: opendayData,
    success: function (data, textStatus, jqXHR) {
      $('#opendayStatus').text(data.message);
      if (data.code)
        $('#openday-form').closest('form').find('input[type=text]').val('');
    },
    error: function (jqXHR, textStatus, errorThrown) {
      $('#opendayStatus').text(jqXHR);
    },
  });
}
