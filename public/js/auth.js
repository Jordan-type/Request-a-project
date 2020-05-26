const auth_switch_links = document.querySelectorAll('.switch');
const auth_modals = document.querySelectorAll('.auth .modal');
const auth_wrapper = document.querySelector('.auth');

const signup_form = document.querySelector('.register');
const signin_form = document.querySelector('.login');
const signout = document.querySelector('.sign-out');

// toggle auth modals
auth_switch_links.forEach(link => {
    link.addEventListener('click', () => {
        auth_modals.forEach(modal => modal.classList.toggle('active'));
    });
});

// signup form
signup_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signup_form.email.value;
    const password = signin_form.password.value;

    // console.log(email, password);

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log('successffuly registered', user);
            signup_form.reset();
        })
        .catch(error => {
            signup_form.querySelector('.error').textContent = error.message;
        });
});

//signin form
signin_form.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = signin_form.email.value;
    const password = signin_form.password.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
            console.log('successffuly logged in', user);
            signin_form.reset();
        })
        .catch(error => {
            signin_form.querySelector('.error').textContent = error.message;
        });
});

// signout link
signout.addEventListener('click', () => {
    firebase.auth().signOut()
        .then(() => console.log('Signed out'));
});

// auth listener
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        auth_wrapper.classList.remove('open');
        auth_modals.forEach(modal => modal.classList.remove('active'));

    } else {
        auth_wrapper.classList.add('open');
        auth_modals[0].classList.add('active');
    }
});