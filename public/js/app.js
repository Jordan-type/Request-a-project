const request_modal = document.querySelector('.new-request');
const request_link = document.querySelector('.add-request');
const request_form = document.querySelector('.new-request form')

// click event for modal open
request_link.addEventListener('click', () => {
    request_modal.classList.add('open');
});

// click request close modal
request_modal.addEventListener('click', (e) => {
    //to check new-request first before closing/remove modal
    if (e.target.classList.contains('new-request')) {
        request_modal.classList.remove('open');
    }
});

// add a new request 
request_form.addEventListener('submit', (e) => {
    e.preventDefault();
    const add_request = firebase.functions().httpsCallable('add_project_request');
    add_request({
        text: request_form.request.value
    }).then(() => {
        request_form.reset();
        request_form.querySelector('.error').textContent = '';
        request_modal.classList.remove('open');
    }).catch((error) => {
        request_form.querySelector('.error').textContent = error.message;
    });
});

// notification
const notification = document.querySelector('.notification');

const show_notification = (message) => {
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(() => {
        notification.classList.remove('active');
        notification.textContent = '';
    }, 5000); // 5 seconds
};