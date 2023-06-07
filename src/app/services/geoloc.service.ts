import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})

/*
export class GeolocService {
  getCurrentPosition(): Promise<Coordinates> {
    return new Promise<Coordinates>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve(position.coords);
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject('doesnt work, geoloc might not be set');
      }
    });
  }
} 
*/

export class GeolocService {
  getCurrentPosition(): Observable<Coordinates> {
    return interval(5000).pipe(
      startWith(0),
      switchMap(() =>
        new Observable<Coordinates>((observer) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => observer.next(position.coords),
              (error) => observer.error(error)
            );
          } else {
            observer.error('Geolocation is not supported by this browser.');
          }
        })
      )
    );
  }
}