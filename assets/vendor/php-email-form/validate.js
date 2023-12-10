/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;

      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      if( ! action ) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = new FormData( thisForm );

      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error);
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });
  
  function php_email_form_submit(thisForm, action, formData) {
      (function() {
            // https://dashboard.emailjs.com/admin/account
            emailjs.init('sylqplU_VXqi3dDtC');
      })();
      const serviceID = 'service_vas284i';
      const templateID = 'template_dftqs66';

      //on sending 
      thisForm.querySelector('.loading').classList.add('d-block');
      let form_v = document.getElementById('cont_form_8')
      emailjs.sendForm(serviceID, templateID, form_v)
        .then(() => {
            thisForm.querySelector('.sent-message').classList.add('d-block');
            thisForm.reset(); 
            thisForm.querySelector('.loading').classList.remove('d-block');
          }, (err) => {
            //if not sent
            let error = (JSON.stringify(err['text']) + ': Form submission failed'); 
            displayError(thisForm, error);
            thisForm.querySelector('.loading').classList.remove('d-block');
          });
      
        
    
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
