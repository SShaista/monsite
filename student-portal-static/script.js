// ===== Data =====
const scheduleData = [
    { id: '1', courseName: 'Mathématiques Appliquées', teacher: 'Dr. Martin', room: 'Amphi A', startTime: '08:00', endTime: '10:00', day: 'Lundi', color: '#007bff' },
    { id: '2', courseName: 'Physique Générale', teacher: 'Dr. Bernard', room: 'Labo 1', startTime: '10:30', endTime: '12:30', day: 'Lundi', color: '#17a2b8' },
    { id: '3', courseName: 'Informatique', teacher: 'Dr. Petit', room: 'Salle Info 2', startTime: '14:00', endTime: '16:00', day: 'Lundi', color: '#28a745' },
    { id: '4', courseName: 'Mécanique des Solides', teacher: 'Dr. Robert', room: 'Amphi B', startTime: '08:00', endTime: '10:00', day: 'Mardi', color: '#ffc107' },
    { id: '5', courseName: 'Thermodynamique', teacher: 'Dr. Richard', room: 'Labo 3', startTime: '10:30', endTime: '12:30', day: 'Mardi', color: '#dc3545' },
    { id: '6', courseName: 'Projet Intégrateur', teacher: 'Dr. Simon', room: 'Salle Projet', startTime: '14:00', endTime: '17:00', day: 'Mardi', color: '#6f42c1' },
    { id: '7', courseName: 'Electronique', teacher: 'Dr. Laurent', room: 'Labo Elec', startTime: '08:00', endTime: '10:00', day: 'Mercredi', color: '#fd7e14' },
    { id: '8', courseName: 'Statistiques', teacher: 'Dr. Michel', room: 'Amphi C', startTime: '10:30', endTime: '12:30', day: 'Mercredi', color: '#e83e8c' },
    { id: '9', courseName: 'Réseaux Informatiques', teacher: 'Dr. Garcia', room: 'Salle Réseau', startTime: '08:00', endTime: '10:00', day: 'Jeudi', color: '#20c997' },
    { id: '10', courseName: 'Base de Données', teacher: 'Dr. Martinez', room: 'Salle Info 1', startTime: '10:30', endTime: '12:30', day: 'Jeudi', color: '#6610f2' },
    { id: '11', courseName: 'Anglais Technique', teacher: 'Dr. Rodriguez', room: 'Salle Langues', startTime: '14:00', endTime: '16:00', day: 'Jeudi', color: '#0dcaf0' },
    { id: '12', courseName: 'Gestion de Projet', teacher: 'Dr. Wilson', room: 'Amphi D', startTime: '08:00', endTime: '10:00', day: 'Vendredi', color: '#adb5bd' },
    { id: '13', courseName: 'Communication', teacher: 'Dr. Anderson', room: 'Salle C', startTime: '10:30', endTime: '12:30', day: 'Vendredi', color: '#6c757d' }
];

const ecueData = [
    { id: 'ecue1', name: 'Analyse Numérique', code: 'MAT-101', description: 'Méthodes numériques pour la résolution d\'équations différentielles et l\'optimisation.', teacher: 'Dr. Martin', credits: 3, semester: 1, color: '#007bff' },
    { id: 'ecue2', name: 'Mécanique des Fluides', code: 'PHY-201', description: 'Étude des fluides en mouvement, équations de Navier-Stokes et applications.', teacher: 'Dr. Bernard', credits: 4, semester: 2, color: '#17a2b8' },
    { id: 'ecue3', name: 'Programmation Orientée Objet', code: 'INFO-301', description: 'Concepts avancés de POO, design patterns et développement d\'applications.', teacher: 'Dr. Petit', credits: 5, semester: 3, color: '#28a745' },
    { id: 'ecue4', name: 'Résistance des Matériaux', code: 'MEC-102', description: 'Analyse des contraintes et déformations dans les structures mécaniques.', teacher: 'Dr. Robert', credits: 4, semester: 1, color: '#ffc107' },
    { id: 'ecue5', name: 'Thermodynamique Appliquée', code: 'PHY-202', description: 'Principes thermodynamiques et leurs applications en ingénierie.', teacher: 'Dr. Richard', credits: 3, semester: 2, color: '#dc3545' },
    { id: 'ecue6', name: 'Développement Web Full Stack', code: 'INFO-302', description: 'Création d\'applications web modernes avec React, Node.js et bases de données.', teacher: 'Dr. Simon', credits: 6, semester: 3, color: '#6f42c1' },
    { id: 'ecue7', name: 'Circuits Électroniques', code: 'ELE-201', description: 'Conception et analyse de circuits électroniques analogiques et numériques.', teacher: 'Dr. Laurent', credits: 4, semester: 2, color: '#fd7e14' },
    { id: 'ecue8', name: 'Probabilités et Statistiques', code: 'MAT-103', description: 'Théorie des probabilités et méthodes statistiques pour l\'ingénieur.', teacher: 'Dr. Michel', credits: 3, semester: 1, color: '#e83e8c' }
];

const examsData = [
    { id: 'exam1', courseName: 'Analyse Numérique', date: '2026-01-25', time: '09:00', room: 'Amphi A', type: 'Examen' },
    { id: 'exam2', courseName: 'Mécanique des Fluides', date: '2026-01-28', time: '14:00', room: 'Amphi B', type: 'Contrôle' },
    { id: 'exam3', courseName: 'Programmation Orientée Objet', date: '2026-02-05', time: '10:00', room: 'Salle Info 1', type: 'Examen' },
    { id: 'exam4', courseName: 'Thermodynamique Appliquée', date: '2026-02-10', time: '08:30', room: 'Amphi C', type: 'Devoir' }
];

let tasksData = [
    { id: 'task1', title: 'Devoir de Mathématiques', courseName: 'Analyse Numérique', dueDate: '2026-01-20', completed: false, priority: 'high' },
    { id: 'task2', title: 'Projet de Programmation', courseName: 'Programmation Orientée Objet', dueDate: '2026-01-22', completed: false, priority: 'high' },
    { id: 'task3', title: 'Lecture de cours', courseName: 'Mécanique des Fluides', dueDate: '2026-01-19', completed: true, priority: 'medium' },
    { id: 'task4', title: 'Préparation laboratoire', courseName: 'Circuits Électroniques', dueDate: '2026-01-24', completed: false, priority: 'medium' },
    { id: 'task5', title: 'Rapport de TP', courseName: 'Thermodynamique Appliquée', dueDate: '2026-01-26', completed: false, priority: 'low' }
];

// ===== State =====
let currentView = 'schedule';
let selectedDay = 'Lundi';
let selectedSemester = 'all';

// ===== DOM Elements =====
const app = document.getElementById('app');
const loadingScreen = document.getElementById('loading-screen');
const pageTitle = document.getElementById('page-title');
const currentDateEl = document.getElementById('current-date');

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Set current date
    const now = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    currentDateEl.textContent = now.toLocaleDateString('fr-FR', options);
    
    // Hide loading after 800ms
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        app.classList.remove('hidden');
    }, 800);
    
    // Initialize views
    renderSchedule();
    renderCourses();
    renderExams();
    renderTasks();
    
    // Setup navigation
    setupNavigation();
    setupDaySelector();
    setupFilterSelector();
    setupTaskInput();
});

// ===== Navigation =====
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const views = document.querySelectorAll('.view');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const viewName = item.dataset.view;
            
            // Update nav active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Update view
            views.forEach(view => view.classList.remove('active'));
            document.getElementById(`view-${viewName}`).classList.add('active');
            
            // Update title
            const titles = {
                schedule: 'Emploi du temps',
                courses: 'Mes cours',
                exams: 'Examens & Tâches',
                settings: 'Paramètres'
            };
            pageTitle.textContent = titles[viewName];
            
            currentView = viewName;
        });
    });
}

// ===== Schedule View =====
function setupDaySelector() {
    const dayButtons = document.querySelectorAll('.day-btn');
    
    dayButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            dayButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedDay = btn.dataset.day;
            renderSchedule();
        });
    });
}

function renderSchedule() {
    const container = document.getElementById('schedule-list');
    const courses = scheduleData.filter(c => c.day === selectedDay);
    
    if (courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <p>Aucun cours prévu ce jour</p>
            </div>
        `;
        return;
    }
    
    const currentTime = getCurrentTime();
    
    container.innerHTML = courses.map((course, index) => {
        const isCurrent = course.startTime <= currentTime && course.endTime >= currentTime;
        
        return `
            <div class="schedule-card ${isCurrent ? 'current' : ''}" style="animation-delay: ${index * 0.1}s">
                ${isCurrent ? '<span class="current-badge">En cours</span>' : ''}
                <span class="time-badge" style="background: ${course.color}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${course.startTime} - ${course.endTime}
                </span>
                <h3>${course.courseName}</h3>
                <div class="schedule-info">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        ${course.teacher}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${course.room}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function getCurrentTime() {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

// ===== Courses View =====
function setupFilterSelector() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSemester = btn.dataset.semester;
            renderCourses();
        });
    });
}

function renderCourses() {
    const container = document.getElementById('courses-list');
    const courses = selectedSemester === 'all' 
        ? ecueData 
        : ecueData.filter(c => c.semester === parseInt(selectedSemester));
    
    if (courses.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                </div>
                <p>Aucun cours trouvé</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = courses.map((course, index) => `
        <div class="course-card" style="animation-delay: ${index * 0.1}s">
            <div class="course-header" style="background: ${course.color}"></div>
            <div class="course-meta">
                <span class="course-code">${course.code}</span>
                <span class="course-credits">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                    ${course.credits} ECTS
                </span>
            </div>
            <h3>${course.name}</h3>
            <p class="course-description">${course.description}</p>
            <div class="course-footer">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    ${course.teacher}
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    S${course.semester}
                </span>
            </div>
            <button class="course-btn">
                Accéder au cours
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
        </div>
    `).join('');
}

// ===== Exams View =====
function renderExams() {
    const container = document.getElementById('exams-list');
    
    container.innerHTML = examsData.map((exam, index) => {
        const typeClass = exam.type.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        const countdown = formatCountdown(exam.date);
        
        return `
            <div class="exam-card" style="animation-delay: ${index * 0.1}s">
                <div class="exam-header">
                    <span class="exam-type ${typeClass}">${exam.type}</span>
                    <span class="exam-countdown">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                        ${countdown}
                    </span>
                </div>
                <h3>${exam.courseName}</h3>
                <div class="exam-info">
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        ${formatDate(exam.date)}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                        ${exam.time}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        ${exam.room}
                    </span>
                </div>
            </div>
        `;
    }).join('');
}

function formatCountdown(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Demain";
    if (diffDays > 0 && diffDays <= 7) return `Dans ${diffDays} jours`;
    return formatDate(dateStr);
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
}

// ===== Tasks =====
function setupTaskInput() {
    const input = document.getElementById('new-task-input');
    const btn = document.getElementById('add-task-btn');
    
    btn.addEventListener('click', addTask);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
}

function addTask() {
    const input = document.getElementById('new-task-input');
    const title = input.value.trim();
    
    if (title) {
        const newTask = {
            id: 'task' + Date.now(),
            title: title,
            courseName: 'Général',
            dueDate: new Date().toISOString().split('T')[0],
            completed: false,
            priority: 'medium'
        };
        tasksData.unshift(newTask);
        input.value = '';
        renderTasks();
    }
}

function toggleTask(taskId) {
    const task = tasksData.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

function deleteTask(taskId) {
    tasksData = tasksData.filter(t => t.id !== taskId);
    renderTasks();
}

function renderTasks() {
    const container = document.getElementById('tasks-list');
    
    if (tasksData.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>
                <p>Aucune tâche pour le moment</p>
            </div>
        `;
        updateTaskSummary();
        return;
    }
    
    container.innerHTML = tasksData.map((task, index) => `
        <div class="task-item ${task.completed ? 'completed' : ''}" style="animation-delay: ${index * 0.05}s">
            <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask('${task.id}')">
                ${task.completed ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
            </div>
            <div class="task-content">
                <p class="task-title">${task.title}</p>
                <div class="task-meta">
                    <span>${task.courseName}</span>
                    <span>•</span>
                    <span>${formatCountdown(task.dueDate)}</span>
                </div>
            </div>
            <span class="task-priority ${task.priority}">
                ${task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
            </span>
            <button class="task-delete" onclick="deleteTask('${task.id}')">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        </div>
    `).join('');
    
    updateTaskSummary();
}

function updateTaskSummary() {
    const completed = tasksData.filter(t => t.completed).length;
    const total = tasksData.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    document.getElementById('task-count').textContent = `${completed} / ${total} complétées`;
    document.getElementById('task-percent').textContent = `${percent}% terminé`;
}

// ===== Settings =====
function toggleSection(section) {
    const content = document.getElementById(section + '-content');
    const chevron = document.getElementById(section + '-chevron');
    
    content.classList.toggle('open');
    chevron.classList.toggle('rotated');
}
