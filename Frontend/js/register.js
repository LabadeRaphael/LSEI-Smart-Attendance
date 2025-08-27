document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        // Validation flags
        let isValid = true;

        // Get form elements
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const studentId = document.getElementById('studentId');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');

        // Clear previous error messages and classes
        document.querySelectorAll('.error-message').forEach(error => error.textContent = '');
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('is-valid', 'is-invalid');
        });

        // Regex patterns
        const nameRegex = /^[A-Za-z\s]{2,50}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const studentIdRegex = /^LSEI2025\/[0-9]{4}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Validate Full Name
        if (!fullname.value.trim() || !nameRegex.test(fullname.value.trim())) {
            fullname.nextElementSibling.textContent = 'Please enter a valid name (2-50 characters, letters only)';
            fullname.classList.add('is-invalid');
            isValid = false;
        } else {
            fullname.classList.add('is-valid');
        }

        // Validate Email
        if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
            email.nextElementSibling.textContent = 'Please enter a valid email address';
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.add('is-valid');
        }

        // Validate Student ID
        if (!studentId.value.trim() || !studentIdRegex.test(studentId.value.trim())) {
            studentId.nextElementSibling.textContent = 'Please enter a valid Student ID (e.g., LSEI2025/1234)';
            studentId.classList.add('is-invalid');
            isValid = false;
        } else {
            studentId.classList.add('is-valid');
        }

        // Validate Password
        if (!password.value || !passwordRegex.test(password.value)) {
            password.nextElementSibling.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
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
                fullname: fullname.value,
                email: email.value,
                studentId: studentId.value,
                password: password.value
            });
            
            // for backend data
            
            // const data={
            //     fullname: fullname.value,
            //     email: email.value,
            //     studentId: studentId.value,
            //     password: password.value
            // }
            // console.log(data);
            
            
            // Backend Post Request
            
            // try {
            //     const response = await fetch('/auth/register', {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify(data),
            //     });

            //     if (!response.ok) {
            //         throw new Error("Request failed with status " + response.status);
            //     }

            //     const result = await response.json();
            //     console.log("Success:", result);
            //     return result;
            // } catch (error) {
            //     console.error("Error:", error.message);
            // }
            alert('Registration successful!');
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
    input.addEventListener('input', function () {
        try {
            const errorElement = this.nextElementSibling;
            errorElement.textContent = '';
            this.classList.remove('is-valid', 'is-invalid');

            // Real-time validation patterns
            const nameRegex = /^[A-Za-z\s]{2,50}$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const studentIdRegex = /^LSEI2025\/[0-9]{4}$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

            switch (this.id) {
                case 'fullname':
                    if (this.value.trim() && !nameRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                        errorElement.textContent = 'Please enter a valid name (2-50 characters, letters only)';
                    } else if (this.value.trim()) {
                        this.classList.add('is-valid');
                    }
                    break;
                case 'email':
                    if (this.value.trim() && !emailRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                        errorElement.textContent = 'Please enter a valid email address';
                    } else if (this.value.trim()) {
                        this.classList.add('is-valid');
                    }
                    break;
                case 'studentId':
                    if (this.value.trim() && !studentIdRegex.test(this.value.trim())) {
                        this.classList.add('is-invalid');
                        errorElement.textContent = 'Please enter a valid Student ID (e.g., LSEI2025/1234)';
                    } else if (this.value.trim()) {
                        this.classList.add('is-valid');
                    }
                    break;
                case 'password':
                    if (this.value && !passwordRegex.test(this.value)) {
                        this.classList.add('is-invalid');
                        // use to retify the password-goggle-icon
                        document.getElementById('passwordToggle').style.top = "38%"
                        errorElement.textContent = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
                    } else if (this.value) {
                        // use to retify the password-goggle-icon
                        document.getElementById('passwordToggle').style.top = "50%"
                        this.classList.add('is-valid');
                    } else {
                        // use to retify the password-goggle-icon
                        document.getElementById('passwordToggle').style.top = "50%"
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
document.getElementById('passwordToggle').addEventListener('click', function () {
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