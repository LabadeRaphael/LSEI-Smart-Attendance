document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    try {
        // Validation flags
        let isValid = true;
        
        // Get form elements
        const email = document.getElementById('email');
        const password = document.getElementById('password');

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
            password.nextElementSibling.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.add('is-valid');
        }

        // If all validations pass, proceed with form submission
        if (isValid) {
            console.log('Login validation successful:', {
                email: email.value,
                password: password.value
            });
            alert('Login successful!');
            this.reset();
            document.querySelectorAll('input').forEach(input => input.classList.remove('is-valid'));
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
            const errorElement = this.nextElementSibling;
            errorElement.textContent = '';
            this.classList.remove('is-valid', 'is-invalid');

            // Real-time validation patterns
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            switch(this.id) {
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
                        errorElement.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
                    } else if (this.value) {
                        this.classList.add('is-valid');
                    }
                    break;
            }
        } catch (error) {
            console.error('Error in real-time validation:', error);
        }
    });
});