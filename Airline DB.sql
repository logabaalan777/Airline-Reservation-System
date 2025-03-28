create database Airline_Reservation_System;
show databases;
use Airline_Reservation_System;

show tables;

desc admin;  

select * from admin;

desc airplane;

-- desc airplane_flight;

-- select * from airplane_flight;

select * from airplane;

SET FOREIGN_KEY_CHECKS = 0;

DELETE FROM flight WHERE id = 1;

SET FOREIGN_KEY_CHECKS = 1;

desc airport;

select * from airport;

desc booking;

select * from booking;

ALTER TABLE booking MODIFY total_amount DECIMAL(15,2);

desc flight;

select * from flight;

desc passenger;

select * from passenger;

SELECT * FROM passenger WHERE id = 2;

SELECT * FROM seat WHERE flight_id = 1;

desc payment;

select * from payment;

desc seat;

select * from seat;

truncate table seat;

desc users;

select * from users;

desc wallet;

select * from wallet;