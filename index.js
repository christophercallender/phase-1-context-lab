function createEmployeeRecord(employee) {
   return {
      firstName: employee[0],
      familyName: employee[1],
      title: employee[2],
      payPerHour: employee[3],
      timeInEvents: [],
      timeOutEvents: [],
   };
}

function createEmployeeRecords(employees) {
   return employees.map((employee) => createEmployeeRecord(employee));
}

function createTimeInEvent(stamp) {
   let [date, hour] = stamp.split(' ');
   this.timeInEvents.push({
      type: 'TimeIn',
      hour: parseInt(hour),
      date: date,
   });
   return this;
}

function createTimeOutEvent(stamp) {
   let [date, hour] = stamp.split(' ');
   this.timeOutEvents.push({
      type: 'TimeOut',
      hour: parseInt(hour),
      date: date,
   });
   return this;
}

function hoursWorkedOnDate(stamp) {
   let clockIn = this.timeInEvents.find((timeIn) => timeIn.date == stamp);
   let clockOut = this.timeOutEvents.find((timeOut) => timeOut.date == stamp);
   return (clockOut.hour - clockIn.hour) / 100;
}

function wagesEarnedOnDate(stamp) {
   return hoursWorkedOnDate.call(this, stamp) * this.payPerHour;
}

function allWagesFor() {
   let eligibleDates = this.timeInEvents.map((e) => e.date);
   return eligibleDates.reduce(
      function (memo, d) {
         return memo + wagesEarnedOnDate.call(this, d);
      }.bind(this),
      0
   );
}

function findEmployeeByFirstName(employees, employeeName) {
   return employees.find((employee) => employee.firstName == employeeName);
}

function calculatePayroll(employees) {
   return employees.reduce((total, employee) => {
      return total + allWagesFor.call(employee);
   }, 0);
}
