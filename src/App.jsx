import React, { Fragment } from 'react'

import './App.css'

import SaveBtn from './SaveBtn.jsx'

const hours = [
	{
		id: 'hour-9',
		text: '9AM',
	},
	{
		id: 'hour-10',
		text: '10AM',
	},
	{
		id: 'hour-11',
		text: '11AM',
	},
	{
		id: 'hour-12',
		text: '12PM',
	},
	{
		id: 'hour-13',
		text: '1PM',
	},
	{
		id: 'hour-14',
		text: '2PM',
	},
	{
		id: 'hour-15',
		text: '3PM',
	},
	{
		id: 'hour-16',
		text: '4PM',
	},
	{
		id: 'hour-17',
		text: '5PM',
	},
]

export default () => {
	$(document).ready(function () {
		// listen for save button clicks
		$('.save-btn').on('click', function () {
			// get nearby values
			let value = $(this).siblings('.description').text()
			let time = $(this).siblings('.description').attr('id')

			// save in localStorage
			localStorage.setItem(time, value)

			// Show notification that item was saved to localStorage by adding class 'show'
			$('.save-notification').removeClass('hide')

			// Timeout to remove 'show' class after 5 seconds
			setTimeout(function () {
				$('.save-notification').addClass('hide')
			}, 3000)
		})

		function hourUpdater() {
			// get current number of hours
			let currentHour = moment().hours()

			// loop over time blocks
			$('.description').each(function () {
				let blockHour = parseInt($(this).attr('id').split('-')[1])

				// check if we've moved past this time
				if (blockHour < currentHour) {
					$(this).addClass('past')
				} else if (blockHour === currentHour) {
					$(this).removeClass('past')
					$(this).addClass('present')
				} else {
					$(this).removeClass('past')
					$(this).removeClass('present')
					$(this).addClass('future')
				}
			})
		}

		hourUpdater()

		// set up interval to check if current time needs to be updated
		let interval = setInterval(hourUpdater, 15000)

		// load any saved data from localStorage
		$('#hour-9').text(localStorage.getItem('hour-9'))
		$('#hour-10').text(localStorage.getItem('hour-10'))
		$('#hour-11').text(localStorage.getItem('hour-11'))
		$('#hour-12').text(localStorage.getItem('hour-12'))
		$('#hour-13').text(localStorage.getItem('hour-13'))
		$('#hour-14').text(localStorage.getItem('hour-14'))
		$('#hour-15').text(localStorage.getItem('hour-15'))
		$('#hour-16').text(localStorage.getItem('hour-16'))
		$('#hour-17').text(localStorage.getItem('hour-17'))

		// display current day on page
		$('#currentDay').text(moment('7/1/22').format('dddd, MMMM Do'))
	})

	return (
		<Fragment>
			<div className='header'>
				<div className='header-title'>Workday Scheduler</div>
				<div className='header-subtitle'>
					A simple calendar app for scheduling your daily appointments
				</div>
				<div id='currentDay' />
			</div>
			<section id='notify'>
				<div className='save-notification hide'>
					Appointment Added to &nbsp; <code>localStorage</code> &nbsp; ✔️
				</div>
			</section>
			<Fragment>
				<div className='schedule-section'>
					{hours.map((hour, index) => (
						<Fragment key={index}>
							<div className='time-block'>
								<div className='hour'>{hour.text}</div>
								<div
									id={hour.id}
									className='description'
									contentEditable
								/>
								<div className='save-btn'>
									<SaveBtn
										className='save-icon'
										iconSize='clamp(1.5rem, 1.327rem + 0.647vw, 2rem)'
										iconColor='white'
									/>
								</div>
							</div>
						</Fragment>
					))}
				</div>
			</Fragment>
		</Fragment>
	)
}
