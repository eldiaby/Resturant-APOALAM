import { ReservationsService } from './../../services/reservations.service';
import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular'; // FullCalendar's Angular wrapper
import dayGridPlugin from '@fullcalendar/daygrid'; // For day view
import timeGridPlugin from '@fullcalendar/timegrid'; // For time view
import interactionPlugin from '@fullcalendar/interaction'; // For interaction (e.g., clicking)

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css',
})
export class ReservationsComponent implements OnInit {
  reservationsLength: any = 0;
  reservations: any = [];
  calendarOptions: any = {
    initialView: 'timeGridWeek',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    },
    selectable: true,
    editable: true,
    events: [
      // {
      //   title: 'Ahmed mohamed',
      //   start: '2024-09-24T12:00:00',
      //   end: '2024-09-24T13:00:00',
      // },
      // {
      //   title: 'sayed ali',
      //   start: '2024-09-23T14:00:00',
      //   end: '2024-09-23T15:00:00',
      // },
      // {
      //   title: 'omar ahmed',
      //   start: '2024-09-23T20:00:00',
      //   end: '2024-09-23T22:00:00',
      // },
    ],
    dateClick: this.handleDateClick.bind(this),
    slotMinTime: '10:00:00',
    slotMaxTime: '27:00:00',
  };

  constructor(private _reservationsService: ReservationsService) {}
  ngOnInit(): void {
    this.loadReservations();
  }
  handleDateClick(info: any) {
    const newEvent = {
      title: 'Table Reserved',
      start: info.dateStr,
      end: new Date(info.date.getTime() + 60 * 60 * 1000),
      allDay: false,
    };
    this.calendarOptions.events = [...this.calendarOptions.events, newEvent];
  }

  loadReservations() {
    this._reservationsService.getAllReservations().subscribe(
      (res: any) => {
        this.reservations = res.reservations;
        // console.log(res.reservations);
        this.reservationsLength = res.reservations.length;

        const sortedReservations = res.reservations.sort((a: any, b: any) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

        const calendarEvents = res.reservations.map((reservation: any) => {
          const startDateTime = new Date(
            `${reservation.date.slice(0, 11)}${reservation.time}`
          );
          const endDateTime = new Date(
            startDateTime.getTime() + 60 * 60 * 1000
          );

          return {
            title: reservation?.userId?.userName || 'Guest',
            start: startDateTime.toISOString(),
            end: endDateTime.toISOString(),
          };
        });

        // console.log(calendarEvents);
        this.calendarOptions.events = calendarEvents;
      },
      (error) => {
        // console.error('Error fetching reservations:', error);
      }
    );
  }

  updateReservatio(orderId: any, status: any) {
    this._reservationsService.updateReservations(orderId, status).subscribe({
      next: (res) => {
        console.log(res);
        this.loadReservations();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
