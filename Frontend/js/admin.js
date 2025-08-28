// Sidebar toggle for mobile
document.querySelector('.sidebar-toggle').addEventListener('click', function() {
  try {
    document.querySelector('.sidebar').classList.toggle('expanded');
  } catch (error) {
    console.error('Error toggling sidebar:', error);
  }
});

// Navigation handling
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    try {
      // Update active link
      document.querySelector('.sidebar').classList.toggle('expanded'); 
      document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');

      // Show corresponding section
      const targetId = this.getAttribute('href').substring(1);
      document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(targetId).classList.add('active');

      // Load data for the section
      loadSectionData(targetId);
    } catch (error) {
      console.error('Error handling navigation:', error);
    }
  });
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', function() {
  try {
    // Simulate API call to logout endpoint
    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add auth token if needed: 'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Logged out successfully!');
        // Redirect to login page
        window.location.href = 'index.html';
      } else {
        throw new Error('Logout failed');
      }
    })
    .catch(error => {
      console.error('Logout error:', error);
      alert('An error occurred during logout.');
    });
  } catch (error) {
    console.error('Error in logout:', error);
  }
});

// Function to load section data dynamically (using mock API calls)
function loadSectionData(sectionId) {
  try {
    switch (sectionId) {
      case 'dashboard':
        // Load dashboard metrics
        fetchDashboardMetrics();
        break;
      case 'users':
        // Load users table
        fetchUsers();
        break;
      case 'attendance':
        // Load attendance table
        fetchAttendance();
        break;
      case 'reports':
        // Load reports (placeholder)
        console.log('Loading reports from /api/reports');
        // Example: fetch('/api/reports').then(...) 
        break;
      case 'settings':
        // Load settings (placeholder)
        console.log('Loading settings from /api/settings');
        // Example: fetch('/api/settings').then(...)
        break;
    }
  } catch (error) {
    console.error('Error loading section data:', error);
  }
}

// Fetch dashboard metrics (mock)
function fetchDashboardMetrics() {
  // Simulate API response
  const mockData = {
    totalUsers: 1234,
    todayAttendance: 892,
    activeSessions: 45
  };

  // Update UI
  document.getElementById('totalUsers').textContent = mockData.totalUsers;
  document.getElementById('todayAttendance').textContent = mockData.todayAttendance;
  document.getElementById('activeSessions').textContent = mockData.activeSessions;

  // Real API call example:
  // fetch('/api/dashboard/metrics')
  //   .then(response => response.json())
  //   .then(data => {
  //     document.getElementById('totalUsers').textContent = data.totalUsers;
  //     // etc.
  //   })
  //   .catch(error => console.error('Error fetching metrics:', error));
}

// Fetch users (mock)
function fetchUsers() {
  const tableBody = document.querySelector('#usersTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  // Simulate API response
  const mockUsers = [
    { studentId: 'LSEI2025/1234', name: 'John Doe', email: 'john@example.com', role: 'Student' },
    { studentId: 'LSEI2025/1235', name: 'Jane Smith', email: 'jane@example.com', role: 'Student' }
  ];

  mockUsers.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.studentId}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <button class="action-btn edit" data-id="${user.studentId}"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" data-id="${user.studentId}"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  // Add event listeners for edit/delete
  addActionListeners();

  // Real API call example:
  // fetch('/api/users')
  //   .then(response => response.json())
  //   .then(users => {
  //     // Populate table
  //   })
  //   .catch(error => console.error('Error fetching users:', error));
}

// Fetch attendance (mock)
function fetchAttendance() {
  const tableBody = document.querySelector('#attendanceTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  // Simulate API response
  const mockAttendance = [
    { studentId: 'LSEI2025/1234', name: 'John Doe', date: '2025-08-28', time: '09:00 AM', status: 'Present' },
    { studentId: 'LSEI2025/1235', name: 'Jane Smith', date: '2025-08-28', time: '09:15 AM', status: 'Absent' }
  ];

  mockAttendance.forEach(record => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${record.studentId}</td>
      <td>${record.name}</td>
      <td>${record.date}</td>
      <td>${record.time}</td>
      <td><span class="status ${record.status.toLowerCase()}">${record.status}</span></td>
    `;
    tableBody.appendChild(row);
  });

  // Real API call example:
  // fetch('/api/attendance/recent')
  //   .then(response => response.json())
  //   .then(records => {
  //     // Populate table
  //   })
  //   .catch(error => console.error('Error fetching attendance:', error));
}

// Add listeners for edit/delete buttons
function addActionListeners() {
  // Edit button
  document.querySelectorAll('.action-btn.edit').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      try {
        // Simulate edit API call
        console.log(`Editing user ${id}`);
        // Real: fetch(`/api/users/${id}/edit`, { method: 'PUT', body: JSON.stringify(updatedData) })
        alert(`Edit user ${id}`);
      } catch (error) {
        console.error('Error editing user:', error);
      }
    });
  });

  // Delete button
  document.querySelectorAll('.action-btn.delete').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      if (confirm(`Are you sure you want to delete user ${id}?`)) {
        try {
          // Simulate delete API call
          fetch(`/api/users/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => {
            if (response.ok) {
              alert(`User ${id} deleted`);
              fetchUsers(); // Reload users
            } else {
              throw new Error('Delete failed');
            }
          })
          .catch(error => {
            console.error('Delete error:', error);
            alert('An error occurred during deletion.');
          });
        } catch (error) {
          console.error('Error in delete:', error);
        }
      }
    });
  });
}

// Initial load
loadSectionData('dashboard');