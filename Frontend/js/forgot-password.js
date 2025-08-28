document.getElementById('forgotPasswordForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        // Validation flags
        let isValid = true;

        // Get form elements
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Clear previous error messages and classes
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });

        // Regex patterns
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate Email
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            email.nextElementSibling.textContent = 'Please enter a valid email address';
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }

        // Validate Password
        if (!password.value || !passwordRegex.test(password.value)) {
            password.nextElementSibling.nextElementSibling.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.add('is-valid');
        }

        // Validate Confirm Password
        if (!confirmPassword.value || confirmPassword.value !== password.value) {
            confirmPassword.nextElementSibling.textContent = 'Passwords do not match';
            confirmPassword.classList.add('is-invalid');
            isValid = false;
        } else {
            confirmPassword.classList.add('is-valid');
        }

        // If all validations pass, proceed with form submission
        if (isValid) {
            console.log('Form validation successful:', {
                email: email.value,
                password: password.value
            });

            // Prepare data for backend
            const data = {
                email: email.value,
                password: password.value
            };
            console.log(data);

            // Backend Post Request
            // try {
            //     const response = await fetch('/auth/reset-password', {
            //         method: 'POST',
            //         headers: {
            //             'Content-Type': 'application/json',
            //             // 'Authorization': `Bearer ${localStorage.getItem('token')}` // Uncomment if token is required
            //         },
            //         body: JSON.stringify(data),
            //     });

            //     if (!response.ok) {
            //         throw new Error(response.message || 'Password reset failed.');
            //     }

            //     const result = await response.json();
            //     console.log('Success:', result);
              
            // } catch (error) {
            //     console.error('Error:', error.message);
            //     alert('An error occurred during password reset.');
            // }
              alert('Password reset successful! Please log in.');
                this.reset();
                document.querySelectorAll('input').forEach(input => input.classList.remove('is-valid'));
                window.location.href = 'index.html';
        }

    } catch (error) {
        console.error('An error occurred during form validation:', error);
        alert('An unexpected error occurred. Please try again.');
    }
});

// Real-time validation for better user experience
const inputs = document.querySelectorAll('input');

inputs.forEach(input => {
    input.addEventListener('input', function() {
        try {
            const errorElement = this.id === 'password' 
                ? this.nextElementSibling.nextElementSibling 
                : this.nextElementSibling;
            errorElement.textContent = '';
            this.classList.remove('is-valid', 'is-invalid');

            // Real-time validation patterns
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            switch (this.id) {
                case 'email':
                    if (this.value.trim() && !emailRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                        errorElement.textContent = 'Please enter a valid email address';
                    } else if (this.value.trim()) {
                        this.classList.add('is-valid');
                    }
                    break;
                case 'password':
                    if (this.value && !passwordRegex.test(this.value)) {
                        this.classList.add('is-invalid');
                        document.getElementById('passwordToggle').style.top = '38%';
                        errorElement.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
                    } else if (this.value) {
                        this.classList.add('is-valid');
                        document.getElementById('passwordToggle').style.top = '50%';
                    } else {
                        document.getElementById('passwordToggle').style.top = '50%';
                    }
                    break;
                case 'confirmPassword':
                    if (this.value && this.value !== document.getElementById('password').value) {
                        this.classList.add('is-invalid');
                        errorElement.textContent = 'Passwords do not match';
                    } else if (this.value && document.getElementById('password').value) {
                        this.classList.add('is-valid');
                    }
                    break;
            }
        } catch (error) {
            console.error('Error in real-time validation:', error);
        }
    });
});

// Password visibility toggle
document.getElementById('passwordToggle').addEventListener('click', function() {
    try {
        const passwordInput = document.getElementById('password');
        const icon = this;

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    } catch (error) {
        console.error('Error in password visibility toggle:', error);
    }
});