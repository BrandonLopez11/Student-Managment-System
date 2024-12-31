document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('studentForm');
    const tableBody = document.querySelector('#studentTable tbody');

    // Fetch and display students
    const fetchStudents = async () => {
        const res = await fetch('/api/students');
        const students = await res.json();
        tableBody.innerHTML = '';
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.email}</td>
                <td>${student.course}</td>
                <td>
                    <button onclick="deleteStudent(${student.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    };

    // Add student
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const course = document.getElementById('course').value;

        await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age, email, course })
        });

        form.reset();
        fetchStudents();
    });

    // Delete student
    window.deleteStudent = async (id) => {
        await fetch(`/api/students/${id}`, { method: 'DELETE' });
        fetchStudents();
    };

    fetchStudents();
});
