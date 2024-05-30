// script.js
document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const prevMonth = document.getElementById('prev-month');
    const nextMonth = document.getElementById('next-month');
    const eventModal = document.getElementById('event-modal');
    const closeButton = document.querySelector('.close-button');
    const eventForm = document.getElementById('event-form');
    const eventTitle = document.getElementById('event-title');
    const eventDate = document.getElementById('event-date');
    const eventDescription = document.getElementById('event-description');
    const tiempo= document.getElementById('time');
    let events = {};
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function renderCalendar(month, year) {
        calendar.innerHTML = '';
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.textContent = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

        for (let i = 0; i < firstDay; i++) {
            calendar.appendChild(document.createElement('div'));
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.textContent = day;
            dayDiv.dataset.date = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (events[dayDiv.dataset.date]) {
                events[dayDiv.dataset.date].forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = 'event';
                    eventDiv.textContent = event.title;
                    dayDiv.appendChild(eventDiv);
                });
            }

            dayDiv.addEventListener('click', () => openModal(dayDiv.dataset.date));
            calendar.appendChild(dayDiv);
        }
    }

    function openModal(date) {
        eventModal.style.display = 'flex';
        eventDate.value = date;
        eventTitle.value = '';
        eventDescription.value = '';
    }

    function closeModal() {
        eventModal.style.display = 'none';
    }

    function saveEvent(e) {
        e.preventDefault();
        const date = eventDate.value;
        const title = eventTitle.value;
        const description = eventDescription.value;

        if (!events[date]) {
            events[date] = [];
        }

        events[date].push({ title, description });
        closeModal();
        renderCalendar(currentMonth, currentYear);
    }

    prevMonth.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        renderCalendar(currentMonth, currentYear);
    });

    nextMonth.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        renderCalendar(currentMonth, currentYear);
    });

    closeButton.addEventListener('click', closeModal);
    eventForm.addEventListener('submit', saveEvent);

    renderCalendar(currentMonth, currentYear);
});
